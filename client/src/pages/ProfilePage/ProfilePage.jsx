
import { useAuth } from "../../context/AuthContext";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <h2>Change Password</h2>
      <ResetPasswordForm />
    </div>
  );
};

export default ProfilePage;
