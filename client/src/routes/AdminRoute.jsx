import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) return null; // або <Loader />

  if (!user) return <Navigate to="/login" replace />;
  if (![ROLES.ADMIN, ROLES.SUPERADMIN].includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
