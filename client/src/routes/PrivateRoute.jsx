import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user, token, isLoading } = useSelector((state) => state.auth);

  // 👇 Чекаємо на завершення запиту, якщо є токен і ще не завантажений user
  if (token && user === null && isLoading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
