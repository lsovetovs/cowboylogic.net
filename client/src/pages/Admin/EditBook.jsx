import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/slices/notificationSlice";
import { apiService } from "../../services/axiosService";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    imageUrl: "",
    inStock: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .get(`/books/${id}`)
      .then((res) => {
        const { title, author, description, price, imageUrl, inStock } = res.data;
        setFormData({ title, author, description, price, imageUrl, inStock });
        setLoading(false);
      })
      .catch(() => {
        dispatch(showNotification({ message: "❌ Failed to load book", type: "error" }));
        setLoading(false);
      });
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.put(`/books/${id}`, formData, true);
      dispatch(showNotification({ message: "✅ Book updated successfully", type: "success" }));
      setTimeout(() => navigate("/bookstore"), 1500);
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "Update failed",
          type: "error",
        })
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-book-page" style={{ padding: "1rem" }}>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input name="author" value={formData.author} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>
        <label>
          In Stock:
          <input name="inStock" type="checkbox" checked={formData.inStock} onChange={handleChange} />
        </label>
        <button type="submit">💾 Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
