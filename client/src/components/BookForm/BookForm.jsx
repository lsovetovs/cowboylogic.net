import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import styles from "./BookForm.module.css";
import { useSelector } from "react-redux";
import ImageInsertModal from "../modals/ImageInsertModal/ImageInsertModal";

const BookForm = ({ onSuccess, onError }) => {
  const { id } = useParams();
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

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/books/${id}`)
        .then((res) => {
          setForm(res.data);
          setPreview(res.data.imageUrl);
        })
        .catch(() => {
          onError?.("❌ Failed to load book");
        });
    }
  }, [id, onError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageInsert = ({ file, url }) => {
    if (file) {
      setImageFile(file);
      setForm((f) => ({ ...f, imageUrl: "" }));
      setPreview(URL.createObjectURL(file));
    } else if (url) {
      setImageFile(null);
      setForm((f) => ({ ...f, imageUrl: url }));
      setPreview(url);
    }
    setShowImageModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("inStock", form.inStock);

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (form.imageUrl) {
      formData.append("imageUrl", form.imageUrl);
    }

    try {
      if (id) {
        await axios.put(`/books/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        onSuccess?.("✅ Book updated successfully");
      } else {
        await axios.post("/books", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        onSuccess?.("✅ Book created successfully");
      }
      navigate("/bookstore");
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Error saving book";
      onError?.(msg);
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

        <button type="button" className="btn btn-outline" onClick={() => setShowImageModal(true)}>
          Choose Image
        </button>

        {preview && (
          <div className={styles.preview}>
            <p>Image Preview:</p>
            <img src={preview} alt="Preview" className={styles.previewImage} />
          </div>
        )}

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

      {showImageModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

export default BookForm;
