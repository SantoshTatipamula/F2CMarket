import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("f2c-user", null);

  // Check authentication
  const isAuthenticated = !!user;

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Register
  const register = (newUser) => {
    setUser(newUser);

    const existingUsers =
      JSON.parse(localStorage.getItem("f2c-users")) || [];

    localStorage.setItem(
      "f2c-users",
      JSON.stringify([...existingUsers, newUser])
    );
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("f2c-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);