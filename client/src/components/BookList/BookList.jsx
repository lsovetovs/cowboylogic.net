import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import { showSuccess, showError } from "../../store/slices/notificationSlice";
import styles from "./BookList.module.css";
import BookCard from "../BookCard/BookCard";
import DeleteConfirmModal from "../modals/DeleteConfirmModal/DeleteConfirmModal";

const BookList = ({ books = [], onDelete }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookToDelete, setBookToDelete] = useState(null);

  const handleEdit = (id) => {
    navigate(`/admin/books/edit/${id}`);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/books/${bookToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete?.(bookToDelete);
      dispatch(showSuccess("Book deleted successfully"));
    } catch (err) {
      console.error("Delete failed", err);
      dispatch(showError("Failed to delete book"));
    } finally {
      setBookToDelete(null);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      await axios.post(
        "/cart",
        { bookId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(showSuccess("Book added to cart!"));
    } catch (err) {
      console.error("Add to cart error:", err);
      dispatch(showError("Failed to add to cart"));
    }
  };

  const handleToggleFavorite = (bookId) => {
    console.log("Toggle favorite:", bookId);
  };

  return (
    <>
      <div className={styles.bookList}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isAdmin={user?.role === "admin" || user?.role === "superadmin"}
            isLoggedIn={!!user}
            onEdit={handleEdit}
            onDeleteClick={(id) => setBookToDelete(id)}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default BookList;
