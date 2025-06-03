import { useState } from "react";
import styles from "./LinkInsertModal.module.css";

const LinkInsertModal = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onInsert(url.trim());
      setUrl("");
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Insert Link</h3>
        <form onSubmit={handleSubmit}>
  <div className={styles.inputWrapper}>
    <input
      type="url"
      placeholder="Enter URL..."
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      required
    />
  </div>

          <div className={styles.actions}>
            <button type="submit" className="btn btn-outline">Insert</button>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkInsertModal;
