
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./ResetPasswordForm.module.css";
import axios from "../../store/axios";

const ResetPasswordForm = () => {
  const { token, logout } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await axios.patch(
        "/auth/reset-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password updated successfully. You will be logged out.");
      setTimeout(() => logout(), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ResetPasswordForm;
