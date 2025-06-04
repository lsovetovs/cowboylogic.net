import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ROLES } from "../../constants/roles";
import { apiService } from "../../services/axiosService";
import { showNotification } from "../../store/slices/notificationSlice";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await apiService.get("/users", true);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      dispatch(
        showNotification({ message: "❌ Failed to fetch users", type: "error" })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await apiService.patch(`/users/${id}/role`, { role: newRole }, true);
      fetchUsers();
      dispatch(
        showNotification({ message: "✅ User role updated", type: "success" })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "❌ Update failed",
          type: "error",
        })
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiService.delete(`/users/${id}`, true);
      fetchUsers();
      dispatch(
        showNotification({ message: "✅ User deleted", type: "success" })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "❌ Delete failed",
          type: "error",
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Management</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                {u.email}
                {u.isSuperAdmin && " 👑"}
              </td>
              <td>
                {u.isSuperAdmin ? (
                  <strong>super admin</strong>
                ) : (
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  >
                    <option value={ROLES.USER}>user</option>
                    <option value={ROLES.ADMIN}>admin</option>
                  </select>
                )}
              </td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                {!u.isSuperAdmin && (
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
