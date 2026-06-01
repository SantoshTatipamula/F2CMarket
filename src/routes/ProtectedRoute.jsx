import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  /* Not logged in */
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  /* Banned consumer */
  if (user.banned)
    return <Navigate to="/" replace />;

  /* Rejected farmer — block everything, show static page */
  if (user.role === "farmer" && user.verificationStatus === "rejected")
    return <Navigate to="/pending-verification" replace />;

  /* Pending farmer — can ONLY access /farmer/pending workspace */
  if (user.role === "farmer" && user.verificationStatus === "pending") {
    if (!location.pathname.startsWith("/farmer/pending")) {
      return <Navigate to="/farmer/pending" replace />;
    }
  }

  /* Wrong role */
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleHome = {
      consumer: "/",
      farmer:   user.verificationStatus === "pending" ? "/farmer/pending" : "/farmer/dashboard",
      admin:    "/admin/dashboard",
    };
    return <Navigate to={roleHome[user.role] || "/"} replace />;
  }

  return children;
}
