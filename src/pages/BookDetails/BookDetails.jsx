import { useParams } from "react-router-dom";
import booksData from "../../data/books";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const book = booksData.find((b) => b.id === Number(id));

  if (!book) return <h2>Книга не знайдена</h2>;

  return (
    <div className={styles.bookDetails}>
      <img src={book.image} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Price: ${book.price}</p>
      <button className={styles.addToCart}>Add to Cart</button>
    </div>
  );
};

export default BookDetails;
