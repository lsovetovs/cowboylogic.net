import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import styles from "./FavoritesPage.module.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.books);
  const loading = useSelector((state) => state.favorites.loading);
  const error = useSelector((state) => state.favorites.error);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) return <h2>Loading favorites...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>❤️ My Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>You do not have any favorites yet.</p>
      ) : (
        <div className={styles.bookList}>
          {favorites.map((book) => (
            <div key={book.id} className={styles.card}>
              <img
                src={book.imageUrl}
                alt={book.title}
                className={styles.image}
                onClick={() => navigate(`/bookstore/book/${book.id}`)}
              />

              <div className={styles.info}>
                <div className={styles.actions}>
                  <FavoriteButton bookId={book.id} />
                </div>

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>${book.price}</p>
                <p>{book.inStock ? "In Stock" : "Out of Stock"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
