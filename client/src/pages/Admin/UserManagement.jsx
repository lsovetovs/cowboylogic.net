import { useEffect, useState } from "react";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    axios
      .get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  }, [token, user]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(
        `/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch {
      alert("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  if (user?.role !== "admin") {
    return <p>⛔ Access denied. Admins only.</p>;
  }

  return (
    <div className={styles.userManagement}>
      <h2>User Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, email, role }) => (
            <tr key={id}>
              <td>{email}</td>
              <td>
                <select
                  value={role}
                  onChange={(e) => handleRoleChange(id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
