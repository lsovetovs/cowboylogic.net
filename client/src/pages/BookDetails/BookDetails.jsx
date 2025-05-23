import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { apiService } from "../../services/axiosService";
import { toast } from "react-toastify";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: book, loading, error } = useFetch(`/books/${id}`);

  const handleAddToCart = async () => {
    try {
      await apiService.post(
        "/cart",
        { bookId: book.id, quantity: 1 },
        true
      );
      toast.success("Book added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Error adding book to cart");
    }
  };

  if (loading) return <h2>Loading...</h2>;
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
