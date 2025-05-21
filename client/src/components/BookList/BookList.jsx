import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import styles from "./BookList.module.css";

const BookList = ({ books = [], onDelete }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

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
    } catch (err) {
      console.error("Delete failed", err);
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
      alert("Book added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <div key={book.id} className={styles.card}>
  <img src={book.imageUrl} alt={book.title} className={styles.image} />

  <div className={styles.info}>
    {/* Admin buttons top right */}
    {user?.role === "admin" && (
      <div className={styles.actions}>
        <button onClick={() => handleEdit(book.id)}>Edit</button>
        <button onClick={() => handleDelete(book.id)}>Delete</button>
      </div>
    )}

    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>${book.price}</p>
      <p>{book.inStock ? "In Stock" : "Out of Stock"}</p>
    </div>

    {/* Cart button at bottom */}
    {user && (
      <button
        onClick={() => handleAddToCart(book.id)}
        className={styles.cartButton}
      >
        Add to Cart
      </button>
    )}
  </div>
</div>

      ))}
    </div>
  );
};

export default BookList;
