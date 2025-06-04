import { useSelector } from "react-redux";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.profilePage}>
      <h1>My Profile</h1>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>

      <h2>Change Password</h2>
      <div className={styles.resetForm}>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ProfilePage;

