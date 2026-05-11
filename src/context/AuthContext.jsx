import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("f2c-user", null);

  const login = (userData) => setUser(userData);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("f2c-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
