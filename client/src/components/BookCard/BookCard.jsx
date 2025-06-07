import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const BookCard = ({
  book,
  onEdit,
  onDeleteClick,
  onAddToCart,
  isAdmin,
  isLoggedIn,
}) => {
  const getImageUrl = (url) => {
    if (!url) return "/fallback-image.png";
    if (url.startsWith("http")) return url;
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return `${baseUrl}${url}`;
  };

  return (
    <div className={styles.card}>
      <img
        src={getImageUrl(book.imageUrl)}
        alt={book.title}
        className={styles.image}
      />

      <div className={styles.info}>
        {isAdmin && (
          <div className={styles.actions}>
            <button onClick={() => onEdit(book.id)}>Edit</button>
            <button onClick={() => onDeleteClick(book.id)}>Delete</button>
          </div>
        )}

        <Link to={`/bookstore/book/${book.id}`} className={styles.titleLink}>
          <h3>{book.title}</h3>
        </Link>

        <p>{book.author}</p>
        <p>${book.price}</p>
        <p>{book.inStock ? "In Stock" : "Out of Stock"}</p>

        {isLoggedIn && (
          <div className={styles.actionRow}>
            <button
              onClick={() => onAddToCart(book.id)}
              className={styles.actionButton}
            >
              Add to Cart
            </button>
            <FavoriteButton bookId={book.id} small />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;

