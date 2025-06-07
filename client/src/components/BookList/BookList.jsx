import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../store/slices/notificationSlice";
import { useDispatch } from "react-redux";
import axios from "../../store/axios";
import styles from "./BookList.module.css";
import BookCard from "../BookCard/BookCard";

const BookList = ({ books = [], onDelete }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    navigate(`/admin/books/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete?.(id);
      dispatch(showSuccess("Book deleted successfully"));
    } catch (err) {
      console.error("Delete failed", err);
      dispatch(showError("Failed to delete book"));
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
    console.log("Toggle favorite:", bookId); // поки що мок, заміниш на dispatch
  };

  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isAdmin={user?.role === "admin" || user?.role === "superadmin"}
          isLoggedIn={!!user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default BookList;
