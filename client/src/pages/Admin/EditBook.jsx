// import BookForm from "../../components/BookForm/BookForm";

// const EditBook = () => {
//   return <BookForm />;
// };

// export default EditBook;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";

const EditBook = () => {
  const { id } = useParams();
  const { token } = useAuth();
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

  useEffect(() => {
    axios
      .get(`/books/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => setError("Failed to load book"));
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

    const { id, ...dataToSend } = formData;

    try {
      await axios.put(`/books/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Book updated successfully");
      setError(null);

      setTimeout(() => navigate("/bookstore"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      setSuccess(null);
    }
  };

  return (
    <div className="edit-book-page">
      <h2>Edit Book</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
