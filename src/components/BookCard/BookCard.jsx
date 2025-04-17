import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

const BookCard = ({ book }) => {
  return (
    <div className={styles.bookCard}>
      <img src={book.image} alt={book.title} className={styles.bookImage} />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <Link to={`/bookstore/book/${book.id}`} className={styles.detailsButton}>
        Details
      </Link>
    </div>
  );
};

export default BookCard;
