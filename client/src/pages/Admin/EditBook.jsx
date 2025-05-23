import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../services/axiosService";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    imageUrl: "",
    inStock: true,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.get(`/books/${id}`)
      .then((res) => {
        const { title, author, description, price, imageUrl, inStock } = res.data;
        setFormData({ title, author, description, price, imageUrl, inStock });
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to load book");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
await apiService.put(`/books/${id}`, formData, true);


      setSuccess("✅ Book updated successfully");
      setTimeout(() => navigate("/bookstore"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-book-page" style={{ padding: "1rem" }}>
      <h2>Edit Book</h2>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}

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
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>

        <label>
          In Stock:
          <input
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
          />
        </label>

        <button type="submit">💾 Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
