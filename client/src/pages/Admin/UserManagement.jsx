import { useEffect, useState } from "react";
import { ROLES } from "../../constants/roles";
import { apiService } from "../../services/axiosService";
import { toast } from "react-toastify";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiService.get("/users", true);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to fetch users");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await apiService.patch(`/users/${id}/role`, { role: newRole }, true);
      fetchUsers();
      toast.success("User role updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiService.delete(`/users/${id}`, true);
      fetchUsers();
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
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
