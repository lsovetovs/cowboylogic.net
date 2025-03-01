import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
   
          <Link to="/" className={styles.logo}>Roger Haller</Link>
          <p className={styles.tagline}>
          Roger Haller – Portfolio</p>
        
      </div>
    </header>
  );
};

export default Header;
