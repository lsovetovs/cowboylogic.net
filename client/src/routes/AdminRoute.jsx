import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../../constants/roles";


const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // або <Loader /> для візуалізації завантаження

  if (!user) return <Navigate to="/login" replace />;
  if (![ROLES.ADMIN, ROLES.SUPERADMIN].includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
