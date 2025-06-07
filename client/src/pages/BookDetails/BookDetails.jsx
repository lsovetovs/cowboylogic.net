import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../../store/slices/bookSlice";
import { showNotification } from "../../store/slices/notificationSlice";
import styles from "./BookDetails.module.css";
import axios from "../../store/axios";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"; // ✅

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const book = useSelector((state) => state.books.selectedBook);
  const { loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "/cart",
        { bookId: book.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(showNotification({ message: "Book added to cart!", type: "success" }));
    } catch (err) {
      console.error("Add to cart failed", err);
      dispatch(showNotification({ message: "Error adding book to cart", type: "error" }));
    }
  };

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post("/square/create-payment", {
        title: book.title,
        price: book.price,
        bookId: book.id,
        userId: user.id,
      });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error("Square payment error", err);
      dispatch(showNotification({ message: "Payment failed", type: "error" }));
    }
  };

  if (loading || !book) return <h2 className={styles.loading}>Loading...</h2>;
  if (error) return <h2 className={styles.error}>{error}</h2>;

  return (
    <div className={styles.bookDetails}>
      <div className={styles.imageContainer}>
        <img src={book.imageUrl} alt={book.title} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.author}>By {book.author}</p>
        <p className={styles.description}>{book.description}</p>
        <p className={styles.price}>${book.price.toFixed(2)}</p>

        {user && (
          <div className={styles.actions}>
            <button onClick={handleAddToCart} className="btn btn-outline">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn btn-outline">
              Buy Now 💳
            </button>
            <FavoriteButton bookId={book.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
