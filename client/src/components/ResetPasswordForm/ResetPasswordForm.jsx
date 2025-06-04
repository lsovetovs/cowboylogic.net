import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import styles from "./ResetPasswordForm.module.css";
import axios from "../../store/axios";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        "/auth/reset-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Password updated. You will be logged out...");
      setTimeout(() => dispatch(logout()), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Error updating password");
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
    </div>
  );
};

export default ResetPasswordForm;
