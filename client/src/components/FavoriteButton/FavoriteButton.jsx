import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../../store/slices/favoritesSlice";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ bookId, small = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorites.books);
  const isFavorite = favorites.some((fav) => fav.id === bookId);

  useEffect(() => {
    if (token && favorites.length === 0) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, token, favorites.length]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await dispatch(removeFavorite(bookId));
    } else {
      await dispatch(addFavorite(bookId));
    }
    dispatch(fetchFavorites()); // оновлення після дії
  };

  return (
    <button
      onClick={toggleFavorite}
      className={small ? styles.favoriteIconOnly : "btn btn-outline"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {small ? (isFavorite ? "💔" : "❤️") : isFavorite ? "💔 Remove" : "❤️ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;

