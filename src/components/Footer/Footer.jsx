import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.footer_content}>
        Copyright © 2025 <Link to="/">Roger Haller</Link>. All Rights Reserved.
        | Catch Responsive by{" "}
        <Link to="https://catchthemes.com/">Catch Themes</Link>
      </p>
    </div>
  );
}
