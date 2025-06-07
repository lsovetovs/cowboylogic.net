import { useState } from "react";
import styles from "./ImageInsertModal.module.css";

const ImageInsertModal = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onInsert({ file, url: "" });
    } else if (url.trim()) {
      onInsert({ file: null, url: url.trim() });
    }
    setUrl("");
    setPreview("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUrl("");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Choose Image</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>or</p>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL..."
            disabled={!!file}
          />
          {preview && (
            <img src={preview} alt="Preview" className={styles.preview} />
          )}
          <div className={styles.actions}>
            <button type="submit" className="btn btn-outline">
              Confirm
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
