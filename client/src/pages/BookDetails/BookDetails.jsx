import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSelectedBook } from "../../store/slices/bookSlice";
import { showNotification } from "../../store/slices/notificationSlice"; // ✅ нове
import styles from "./BookDetails.module.css";
import axios from "../../store/axios";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { books, loading, error } = useSelector((state) => state.books);
  const book = books.find((b) => b.id === Number(id));

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks());
    } else {
      dispatch(setSelectedBook(book));
    }
  }, [dispatch, books, book]);

  const handleAddToCart = async () => {
    try {
      await axios.post("/cart", { bookId: book.id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(showNotification({ message: "Book added to cart!", type: "success" }));
    } catch (err) {
      console.error("Add to cart failed", err);
      dispatch(showNotification({ message: "Error adding book to cart", type: "error" }));
    }
  };

  if (loading || !book) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className={styles.bookDetails}>
      <img src={book.imageUrl} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Price: ${book.price}</p>

      {user && (
        <button onClick={handleAddToCart} className={styles.addToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookDetails;
