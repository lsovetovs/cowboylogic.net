import { useDispatch } from "react-redux";
import BookForm from "../../components/BookForm/BookForm";
import { showNotification } from "../../store/slices/notificationSlice";

const AddBook = () => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(showNotification({ message: "✅ Book added successfully", type: "success" }));
  };

  const handleError = (message) => {
    dispatch(showNotification({ message, type: "error" }));
  };

  return <BookForm onSuccess={handleSuccess} onError={handleError} />;
};

export default AddBook;
