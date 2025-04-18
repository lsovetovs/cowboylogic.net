import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../store/axios";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError("Book not found"));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "/cart",
        { bookId: book.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Error adding book to cart");
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!book) return <h2>Loading...</h2>;

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
