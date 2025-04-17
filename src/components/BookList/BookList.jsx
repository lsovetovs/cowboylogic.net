import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.css";

const BookList = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
