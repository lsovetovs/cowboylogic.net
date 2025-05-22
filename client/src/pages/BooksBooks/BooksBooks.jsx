import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BooksBooks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/bookstore");
  }, [navigate]);

  return null;
};

export default BooksBooks;
