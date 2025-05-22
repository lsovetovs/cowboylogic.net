import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <h3 className={styles.heading}>Navigation</h3>
          <ul className={styles.navList}>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/clstrategies/cowboy-college-consulting">Consulting</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Follow Us</h3>
          <ul className={styles.socialList}>
            <li>
              <a
                href="https://www.facebook.com/groups/26342439190"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className={styles.icon} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/cowboy_logic_press/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className={styles.icon} /> Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.heading}>Stay Updated</h3>
          <NewsletterSignup />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p className={styles.footer_content}>
          Copyright © 2025 <Link to="/">Roger Haller</Link>. All Rights
          Reserved. | Catch Responsive by{" "}
          <a
            href="https://catchthemes.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Catch Themes
          </a>
        </p>
      </div>
    </footer>
  );
}
