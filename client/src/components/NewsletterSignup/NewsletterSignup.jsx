import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../store/axios";
import { showNotification } from "../../store/slices/notificationSlice"; // ✅
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/newsletter/subscribe", { email });
      dispatch(showNotification({ message: "✅ Subscribed successfully!", type: "success" }));
      setEmail("");
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "❌ Subscription failed. Try again.",
          type: "error",
        })
      );
    }
  };

  return (
    <div className={styles.newsletter}>
      <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.subscribeBtn}>
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSignup;
