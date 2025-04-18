import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../../components/BookList/BookList";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";
import styles from "./BookStore.module.css";

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const handleAddBook = () => {
    navigate("/admin/books/new");
  };

  return (
    <div className={styles.bookStore}>
      <h1>CLP BookStore</h1>

      {/* 🔐 Кнопка "Add Book" тільки для адміна */}
      {user?.role === "admin" && (
        <button onClick={handleAddBook} className={styles.addButton}>
          Add Book
        </button>
      )}

      <BookList books={books} />
    </div>
  );
};

export default BookStore;
