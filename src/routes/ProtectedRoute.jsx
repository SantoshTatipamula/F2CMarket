import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (user.banned)
    return <Navigate to="/" replace />;

  if (
    user.role === "farmer" &&
    user.verificationStatus !== "approved" &&
    location.pathname.startsWith("/farmer")
  )
    return <Navigate to="/pending-verification" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleHome = { consumer: "/", farmer: "/farmer/dashboard", admin: "/admin/dashboard" };
    return <Navigate to={roleHome[user.role] || "/"} replace />;
  }

  return children;
}
