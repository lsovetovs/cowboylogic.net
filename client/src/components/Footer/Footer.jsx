import { Link } from "react-router-dom";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <NewsletterSignup />
      <p className={styles.footer_content}>
        Copyright © 2025 <Link to="/">Roger Haller</Link>. All Rights Reserved.
        | Catch Responsive by{" "}
        <a href="https://catchthemes.com/" target="_blank" rel="noopener noreferrer">
          Catch Themes
        </a>
      </p>
    </footer>
  );
}
