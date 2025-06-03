// components/ClearConfirmModal/ClearConfirmModal.jsx
import styles from "./ClearConfirmModal.module.css";

const ClearConfirmModal = ({ onConfirm, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Clear All Content</h3>
        <p>Are you sure you want to clear all content?</p>
        <div className={styles.actions}>
          <button className="btn btn-outline" onClick={onConfirm}>Yes, clear</button>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ClearConfirmModal;
