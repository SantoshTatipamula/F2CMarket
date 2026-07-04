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
  signInAsGuest,
  onAuthStateChanged,
} from "@/services/firebaseAuth";

import { auth } from "@/config/firebase";

const AuthContext = createContext();

/**
 * Shared banned/rejected checks. Used by every path that can establish a
 * session (email login, Google login, and session-restore on page load) so
 * a banned/rejected account can't slip through one path just because it
 * wasn't re-checked there.
 */
function checkAccountStatus(firestoreUser) {
  if (!firestoreUser) {
    return { ok: false, error: "User profile not found." };
  }

  if (firestoreUser.banned) {
    return {
      ok: false,
      error: "Your account has been suspended. Contact support.",
    };
  }

  if (
    firestoreUser.role === "farmer" &&
    firestoreUser.verificationStatus === "rejected"
  ) {
    return {
      ok: false,
      error: "Your farmer application was rejected. Please contact support.",
    };
  }

  return { ok: true };
}

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

        // The public Farmers/Products/Reviews pages read collections whose
        // Firestore rules require `request.auth != null` (see
        // firestore.rules). Signing in anonymously satisfies that without
        // creating an app-level "logged in" user — it just gives visitors
        // a UID so public reads succeed. Requires Anonymous Authentication
        // to be enabled in the Firebase console; if it isn't, this fails
        // and we fall back to attempting the read anyway (it'll surface as
        // usersError, same degraded behavior as before).
        signInAsGuest().catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          loadUsers();
        });

        return;
      }

      if (firebaseUser.isAnonymous) {
        // Authenticated enough for public-read rules, but not a real
        // app user — don't treat this as "logged in".
        setUser(null);
        setLoading(false);
        await loadUsers();
        return;
      }

      try {
        const firestoreUser = await getUserFromFirestore(firebaseUser.uid);

        if (firestoreUser) {
          const status = checkAccountStatus(firestoreUser);

          if (!status.ok) {
            // A previously-fine session can end up here if the account was
            // banned/rejected after they last signed in — e.g. an admin
            // action while this tab was still open. Terminate it rather
            // than silently letting them stay logged in.
            console.warn("Blocking restored session:", status.error);
            await logoutUser();
            setUser(null);
            return;
          }

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

      const status = checkAccountStatus(foundUser);

      if (!status.ok) {
        // Firebase Auth already has a live session for this account at
        // this point (loginWithEmail succeeded) — sign it back out so a
        // banned/rejected account can't just refresh the page to bypass
        // this check via the session-restore path.
        await logoutUser();
        return { success: false, error: status.error };
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

      const status = checkAccountStatus(existingUser);

      if (!status.ok) {
        await logoutUser();
        return { success: false, error: status.error };
      }

      setUser(existingUser);
      setUsers((prevUsers) => [
        ...prevUsers.filter((u) => u.id !== existingUser.id),
        existingUser,
      ]);

      // Parity with email login: keep the shared directory fresh and make
      // sure this user's orders are pulled into the local cache.
      refreshUsers();
      initializeOrders(existingUser.id, existingUser.role).catch((error) => {
        console.error("Failed to initialize orders:", error);
      });

      return {
        success: true,
        role: existingUser.role,
        verificationStatus: existingUser.verificationStatus || "pending",
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
  const updateUser = useCallback(async (updatedData) => {
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
      existingUser.id === updatedUser.id
        ? updatedUser
        : existingUser
    )
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
      await syncFarmerProducts(
        updatedUser.id,
        productUpdates
      );
    } catch (error) {
      console.error(
        "Failed to sync farmer product profile updates:",
        error
      );
    }
  }

  return updatedUser;
}, [user]);

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

  const value = {
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
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
