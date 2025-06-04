import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../store/slices/notificationSlice";

import { ROLES } from "../../constants/roles";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || ![ROLES.ADMIN, ROLES.SUPERADMIN].includes(user.role)) {
      dispatch(
        showNotification({ message: "❌ Access denied", type: "error" })
      );
    }
  }, [user, dispatch]);

  if (!user || ![ROLES.ADMIN, ROLES.SUPERADMIN].includes(user.role)) {
    return <p>Access denied</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>
      <ul className={styles.menu}>
        <li>
          <Link to="/admin/books/new">Add New Book</Link>
        </li>
        <li>
          <Link to="/admin/users">User Management</Link>
        </li>
        <li>
          <Link to="/admin/newsletter">Send Newsletter</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
