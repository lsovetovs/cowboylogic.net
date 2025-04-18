// import styles from './BookStore.module.css';
// // import Hero from '../../components/Hero/Hero';


// const BookStore = () => {
//   return (
//     <div className={styles.container}>
//       {/* <Hero title="BookStore" /> */}
//     </div>
//   );
// };

// export default BookStore;

import { useState, useEffect } from "react";
import BookList from "../../components/BookList/BookList";
import booksData from "../../data/books.js"; // Тимчасові дані
import styles from "./BookStore.module.css";

const BookStore = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData); // Імітуємо отримання даних
  }, []);

  return (
    <div className={styles.bookStore}>
      <h1>CLP BookStore</h1>
      <button className={styles.addButton}>Add Book</button>
      <BookList books={books} />
    </div>
  );
};

export default BookStore;
