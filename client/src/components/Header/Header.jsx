// import { Link } from "react-router-dom";
// import styles from "./Header.module.css";

// const Header = () => {
//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
   
//           <Link to="/" className={styles.logo}>CowboyLogic</Link>
//           <p className={styles.tagline}>
//           CowboyLogic Strategies/Publishing</p>
        
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftBlock}>
          <Link to="/" className={styles.logo}>CowboyLogic</Link>
          <p className={styles.tagline}>
            CowboyLogic Strategies/Publishing
          </p>
        </div>

        <div className={styles.authBlock}>
          {user ? (
            <>
              <span className={styles.userEmail}>Welcome, {user.email}</span>
              <button className={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.authBtn}>Login</Link>
              <Link to="/register" className={styles.authBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
