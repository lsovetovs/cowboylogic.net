// components/NewsletterSignup/NewsletterSignup.jsx
import { useState } from "react";
import axios from "../../store/axios";
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await axios.post("/newsletter/subscribe", { email });
      setStatus("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "❌ Subscription failed. Try again.";
      setStatus(msg);
    }
  };

  return (
    <div className={styles.newsletter}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newsletter">Subscribe to our newsletter:</label>
        <div className={styles.inputGroup}>
          <input
            id="newsletter"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </div>
        {status && <p className={styles.status}>{status}</p>}
      </form>
    </div>
  );
};

export default NewsletterSignup;
