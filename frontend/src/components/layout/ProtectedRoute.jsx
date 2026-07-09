import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#F5F1EA" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280" }}>Loading...</p>
      </div>
    );
  }

  // If no token, redirect to admin login
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // If user object is loaded and roles are specified, check them
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if they are in the wrong place
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
