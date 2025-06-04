import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiService } from "../../services/axiosService";
import { showNotification } from "../../store/slices/notificationSlice"; // ✅
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("/newsletter/send", { subject, content }, true);
      dispatch(showNotification({ message: "✅ Newsletter sent successfully", type: "success" }));
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "❌ Sending failed",
          type: "error",
        })
      );
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
