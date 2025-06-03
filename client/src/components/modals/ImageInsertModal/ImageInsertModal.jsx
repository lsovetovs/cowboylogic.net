// components/ImageInsertModal/ImageInsertModal.jsx
import { useState } from "react";
import styles from "./ImageInsertModal.module.css";

const ImageInsertModal = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onInsert(url);
    setUrl("");
    setPreview("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUrl(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Insert Image</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL..."
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className={styles.preview} />}
          <div className={styles.actions}>
            <button type="submit" className="btn btn-outline">
              Insert
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageInsertModal;
