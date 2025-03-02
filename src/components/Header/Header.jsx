import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
   
          <Link to="/" className={styles.logo}>Cowboylogic</Link>
          <p className={styles.tagline}>
          Cowboylogic Strategies</p>
        
      </div>
    </header>
  );
};

export default Header;