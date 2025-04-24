import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // або <Loader /> для візуалізації завантаження

  if (!user) return <Navigate to="/login" replace />;
  if (!["admin", "superadmin"].includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
