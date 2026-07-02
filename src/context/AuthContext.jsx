import {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  saveUserToFirestore,
  getAllUsersFromFirestore,
  getUserFromFirestore,
  updateUserInFirestore,
} from "@/services/userService";
import { syncFarmerProducts } from "@/services/productService";
import { initializeOrders } from "@/services/orderService";

import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle as firebaseGoogleLogin,
  logoutUser,
  onAuthStateChanged,
} from "@/services/firebaseAuth";

import { auth } from "@/config/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        const firestoreUsers = await getAllUsersFromFirestore();
        if (mounted) {
          setUsers(firestoreUsers);
          setUsersError(null);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
        // Keep whatever users we already have (don't wipe a good cache on a
        // transient failure) and surface the error so pages like Farmers can
        // tell "no data" apart from "the fetch failed".
        if (mounted) {
          setUsersError(error);
        }
      } finally {
        if (mounted) setUsersLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);

        // The public Farmers directory (and admin farmer/user tooling) reads
        // from this same list, so we still need it even when nobody is
        // logged in. If your Firestore rules require auth to read /users,
        // this will fail for signed-out visitors — see the note in
        // firestore.rules about enabling Anonymous Authentication.
        loadUsers();
        return;
      }

      try {
        const firestoreUser = await getUserFromFirestore(firebaseUser.uid);

        if (firestoreUser) {
          setUser(firestoreUser);

          await loadUsers();

          initializeOrders(firestoreUser.id, firestoreUser.role).catch(
            (error) => {
              console.error("Failed to initialize orders:", error);
            },
          );
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load Firebase user profile:", error);

        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  /* ── Login ── */
  const login = async (email, password) => {
    try {
      const credentials = await loginWithEmail(email, password);
      const foundUser = await getUserFromFirestore(credentials.user.uid);

      if (!foundUser) {
        return {
          success: false,
          error: "User profile not found.",
        };
      }

      if (foundUser.banned) {
        return {
          success: false,
          error: "Your account has been suspended. Contact support.",
        };
      }

      if (
        foundUser.role === "farmer" &&
        foundUser.verificationStatus === "rejected"
      ) {
        return {
          success: false,
          error:
            "Your farmer application was rejected. Please contact support.",
        };
      }

      setUser(foundUser);
      setUsers((prevUsers) => [
        ...prevUsers.filter((u) => u.id !== foundUser.id),
        foundUser,
      ]);

      return {
        success: true,
        role: foundUser.role,
        verificationStatus: foundUser.verificationStatus || "pending",
      };
    } catch (error) {
      console.log("Firebase Login Error:", error);
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await firebaseGoogleLogin();

      const firebaseUser = result.user;

      let existingUser = await getUserFromFirestore(firebaseUser.uid);

      // New user
      if (!existingUser) {
        existingUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || "",
          role: "consumer",
          createdAt: new Date().toISOString(),
          verificationStatus: "approved",
          verified: true,
          banned: false,
        };

        await saveUserToFirestore(existingUser);
      }

      setUser(existingUser);

      return {
        success: true,
        role: existingUser.role,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  /* ── Register ── */
  const register = async (newUser) => {
    const credentials = await registerWithEmail(
      newUser.email,
      newUser.password,
    );

    const userToSave = {
      ...newUser,
      id: credentials.user.uid,
      createdAt: new Date().toISOString(),

      verificationStatus: newUser.role === "farmer" ? "pending" : "approved",

      verified: newUser.role !== "farmer",

      verificationDocuments: newUser.verificationDocuments || {},

      banned: false,
    };

    await saveUserToFirestore(userToSave);
    setUsers((prev) => [...prev, userToSave]);

    if (newUser.role === "consumer") {
      setUser(userToSave);
    }

    return userToSave;
  };

  /* ── Update logged-in user ── */
  const updateUser = async (updatedData) => {
    if (!user) return null;

    const updatedUser = {
      ...user,
      ...updatedData,
      profile: {
        ...(user.profile || {}),
        ...(updatedData.profile || {}),
      },
      farmerProfile: {
        ...(user.farmerProfile || {}),
        ...(updatedData.farmerProfile || {}),
      },
    };

    try {
      await updateUserInFirestore(updatedUser.id, updatedUser);
    } catch (error) {
      console.error("Failed to update user in Firestore:", error);
    }

    setUser(updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((existingUser) =>
        existingUser.id === updatedUser.id ? updatedUser : existingUser,
      ),
    );

    if (updatedUser.role === "farmer") {
      const productUpdates = {
        farmer: updatedUser.name,
        farmerName: updatedUser.name,
        farmerAvatar: updatedUser.avatar || "",
        farmName: updatedUser.farmerProfile?.farmName || "",
        farmLocation: updatedUser.farmerProfile?.location || null,
        location:
          updatedUser.farmerProfile?.location?.city ||
          updatedUser.profile?.location ||
          "",
      };

      try {
        await syncFarmerProducts(updatedUser.id, productUpdates);
      } catch (error) {
        console.error("Failed to sync farmer product profile updates:", error);
      }
    }

    return updatedUser;
  };

  /* ── Logout ── */
  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  /* ── Admin helpers ── */
  const getAllUsers = useCallback(() => users, [users]);

  const refreshUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const firestoreUsers = await getAllUsersFromFirestore();
      setUsers(firestoreUsers);
      setUsersError(null);
    } catch (error) {
      console.error("Failed to refresh users:", error);
      setUsersError(error);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const updateUserInList = useCallback(
    (updated) =>
      setUsers((prev) =>
        prev.map((existingUser) =>
          existingUser.id === updated.id
            ? { ...existingUser, ...updated }
            : existingUser,
        ),
      ),
    [],
  );

  const value = useMemo(
    () => ({
      user,
      users,
      loading,
      usersLoading,
      usersError,
      isAuthenticated,
      login,
      register,
      signInWithGoogle,
      updateUser,
      logout,
      getAllUsers,
      updateUserInList,
      refreshUsers,
    }),
    [
      user,
      users,
      loading,
      usersLoading,
      usersError,
      isAuthenticated,
      updateUser,
      logout,
      getAllUsers,
      updateUserInList,
      refreshUsers,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
