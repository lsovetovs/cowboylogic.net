import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import styles from "./BookForm.module.css";
import { useSelector } from "react-redux";

const BookForm = ({ onSuccess, onError }) => {
  const { id } = useParams(); // null → створення, значення → редагування
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    imageUrl: "",
    inStock: true,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/books/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => {
          if (onError) onError("❌ Failed to load book");
        });
    }
  }, [id, onError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/books/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (onSuccess) onSuccess("✅ Book updated successfully");
      } else {
        await axios.post("/books", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (onSuccess) onSuccess("✅ Book created successfully");
      }
      navigate("/bookstore");
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Error saving book";
      if (onError) onError(msg);
    }
  };

  return (
    <div className={styles.bookForm}>
      <h2>{id ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
        <button type="submit">{id ? "Update Book" : "Create Book"}</button>
      </form>
    </div>
  );
};

export default BookForm;
