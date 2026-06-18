import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { saveUser, updateStoredUser } from "@/services/profileService";

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
  const [user, setUser] = useLocalStorage("f2c-user", null);
  const [users, setUsers] = useLocalStorage("f2c-users", []);

  const isAuthenticated = !!user;

  /* ── Login ── */
  const login = (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      setUser(ADMIN);
      saveUser(ADMIN);
      return { success: true, role: "admin" };
    }

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!found) return { success: false, error: "Invalid email or password." };

    if (found.banned)
      return {
        success: false,
        error: "Your account has been suspended. Contact support.",
      };

    /* Rejected farmers cannot log in */
    if (found.role === "farmer" && found.verificationStatus === "rejected") {
      return {
        success: false,
        error:
          "Your farmer application was rejected. Please contact support@f2cmarket.com.",
      };
    }

    /* Pending farmers CAN log in — into a restricted workspace */
    setUser(found);
    saveUser(found);
    return {
      success: true,
      role: found.role,
      verificationStatus: found.verificationStatus || "pending",
    };
  };

  /* ── Register ── */
  const register = (newUser) => {
    const userToSave = {
      ...newUser,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      verificationStatus: newUser.role === "farmer" ? "pending" : "approved",
      verified: newUser.role !== "farmer",
      banned: false,
    };

    setUsers((prev) => [...prev, userToSave]);

    /* Consumers log in immediately; farmers wait for approval */
    if (newUser.role === "consumer") {
      setUser(userToSave);
      saveUser(userToSave);
    }

    return userToSave;
  };

  /* ── Update logged-in user ── */
  const updateUser = (updatedData) => {
    const updatedUser = updateStoredUser(updatedData);

    if (!updatedUser) return;

    setUser(updatedUser);

    setUsers((prev) =>
      prev.map((existingUser) =>
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
      ),
    );
  };

  /* ── Logout ── */
  const logout = () => {
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
        : existingUser
    )
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
