import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const { user } = useAuth();

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