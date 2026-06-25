import { saveUser, updateStoredUser } from "@/services/profileService";
import { useEffect, createContext, useContext, useState } from "react";
import { saveUserToFirestore, getAllUsersFromFirestore, } from "@/services/userService";

import {
  registerWithEmail,
  loginWithEmail,
  logoutUser,
  onAuthStateChanged,
} from "@/services/firebaseAuth";

import { auth } from "@/config/firebase";

const ADMIN = {
  id: "admin-001",
  name: "Admin",
  email: "admin@f2cmarket.com",
  password: "admin123",
  role: "admin",
  verified: true,
  verificationStatus: "approved",
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const isAuthenticated = !!user;

useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (firebaseUser) => {
      if (firebaseUser) {
        const storedUser = users.find(
          (u) => u.id === firebaseUser.uid
        );

        if (storedUser) {
          setUser(storedUser);
        }
      } else {
        setUser(null);
      }
    }
  );

  

  return unsubscribe;
}, [users]);

useEffect(() => {
  const loadUsers = async () => {
    try {
      const firestoreUsers = await getAllUsersFromFirestore();
      setUsers(firestoreUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  loadUsers();
}, []);

  /* ── Login ── */
  const login = async (email, password) => {
    // Admin Login
    if (email === ADMIN.email && password === ADMIN.password) {
      setUser(ADMIN);
      saveUser(ADMIN);

      return {
        success: true,
        role: "admin",
      };
    }

    try {
      const credentials = await loginWithEmail(email, password);

      // Find complete profile from localStorage
      const foundUser = users.find((u) => u.id === credentials.user.uid);

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
      saveUser(foundUser);

      return {
        success: true,
        role: foundUser.role,
        verificationStatus: foundUser.verificationStatus || "pending",
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
    newUser.password
  );

  const userToSave = {
    ...newUser,
    id: credentials.user.uid,
    createdAt: new Date().toISOString(),
    verificationStatus:
      newUser.role === "farmer" ? "pending" : "approved",
    verified: newUser.role !== "farmer",
    banned: false,
  };

  await saveUserToFirestore(userToSave);
  
  setUsers((prev) => [...prev, userToSave]);


  // Save profile data for all users
  saveUser(userToSave);

  // Consumers log in immediately
  if (newUser.role === "consumer") {
    setUser(userToSave);
  }

  return userToSave;
};

  /* ── Update logged-in user ── */
  const updateUser = (updatedData) => {
    const updatedUser = updateStoredUser(updatedData);

    if (!updatedUser) return;

    setUser(updatedUser);

    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((existingUser) =>
        existingUser.id === updatedUser.id
          ? {
              ...existingUser,
              ...updatedUser,

              profile: {
                ...(existingUser.profile || {}),
                ...(updatedUser.profile || {}),
              },

              farmerProfile: {
                ...(existingUser.farmerProfile || {}),
                ...(updatedUser.farmerProfile || {}),
              },
            }
          : existingUser,
      );

      /* Sync farmer details to all products */
      const products = JSON.parse(localStorage.getItem("f2c-products")) || [];

      const updatedProducts = products.map((product) =>
        product.farmerId === updatedUser.id
          ? {
              ...product,

              farmerName: updatedUser.name,

              farmerAvatar: updatedUser.avatar || "",

              farmName: updatedUser.farmerProfile?.farmName || product.farmName,

              farmLocation:
                updatedUser.farmerProfile?.location || product.farmLocation,
            }
          : product,
      );

      localStorage.setItem("f2c-products", JSON.stringify(updatedProducts));

      return updatedUsers;
    });
  };

  /* ── Logout ── */
const logout = async () => {
  await logoutUser();
  setUser(null);
  localStorage.removeItem("f2c-user");
};

  /* ── Admin helpers ── */
  const getAllUsers = () => users;
  const updateUserInList = (updated) =>
    setUsers((prev) =>
      prev.map((existingUser) =>
        existingUser.id === updated.id
          ? {
              ...existingUser,
              ...updated,

              profile: {
                ...(existingUser.profile || {}),
                ...(updated.profile || {}),
              },

              farmerProfile: {
                ...(existingUser.farmerProfile || {}),
                ...(updated.farmerProfile || {}),
              },
            }
          : existingUser,
      ),
    );

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        login,
        register,
        updateUser,
        logout,
        getAllUsers,
        updateUserInList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
