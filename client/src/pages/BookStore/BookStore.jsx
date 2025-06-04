import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookList from "../../components/BookList/BookList";
import axios from "../../store/axios";
import styles from "./BookStore.module.css";

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const handleAddBook = () => {
    navigate("/admin/books/new");
  };

  // 🗑️ Видалення книги з локального стану
  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className={styles.bookStore}>
      {/* <h1>CLP BookStore</h1> */}

      {/* 🔐 Кнопка "Add Book" тільки для адміна */}
      {user?.role === "admin" && (
        <button onClick={handleAddBook} className={styles.addButton}>
          Add Book
        </button>
      )}

      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default BookStore;
