import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftBlock}>
          <Link to="/" className={styles.logo}>
            CowboyLogic
          </Link>
          <p className={styles.tagline}>CowboyLogic Strategies/Publishing</p>
        </div>

        <div className={styles.authBlock}>
          {user ? (
            <>
              <Link to="/cart" className={styles.authBtn}>🛒 Cart</Link>
              <Link to="/orders" className={styles.authBtn}>My Orders</Link>
              <Link to="/profile" className={styles.authBtn}>My Profile</Link>
              <span className={styles.userEmail}>Welcome, {user.email}</span>
              <button className={styles.logoutBtn} onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.authBtn}>Login</Link>
              <Link to="/register" className={styles.authBtn}>Register</Link>
            </>
          )}
          <div className={styles.langSwitcher}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
