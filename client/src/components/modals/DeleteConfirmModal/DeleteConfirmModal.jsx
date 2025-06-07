import styles from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p>Are you sure you want to delete this book?</p>
        <div className={styles.buttons}>
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button onClick={onConfirm} className="btn btn-outline">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
