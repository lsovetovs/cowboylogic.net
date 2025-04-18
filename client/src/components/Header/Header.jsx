import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
   
          <Link to="/" className={styles.logo}>CowboyLogic</Link>
          <p className={styles.tagline}>
          CowboyLogic Strategies/Publishing</p>
        
      </div>
    </header>
  );
};

export default Header;