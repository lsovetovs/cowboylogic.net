import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiService } from "../../services/axiosService";
import { toast } from "react-toastify";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  console.log("Current user:", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("/newsletter/send", { subject, content }, true);
      toast.success("✅ Newsletter sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Sending failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Send Newsletter</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
        <label>
          Content (HTML allowed):
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Send Newsletter</button>
      </form>
    </div>
  );
};

export default Newsletter;
