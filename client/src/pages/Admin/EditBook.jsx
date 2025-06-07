import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/slices/notificationSlice";
import { apiService } from "../../services/axiosService";
import ImageInsertModal from "../../components/modals/ImageInsertModal/ImageInsertModal";
import styles from "./EditBook.module.css";

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

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .get(`/books/${id}`)
      .then((res) => {
        const { title, author, description, price, imageUrl, inStock } = res.data;
        setFormData({ title, author, description, price, imageUrl, inStock });
        setPreview(imageUrl);
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

  const handleImageInsert = ({ file, url }) => {
    if (file) {
      setImageFile(file);
      setFormData((f) => ({ ...f, imageUrl: "" }));
      setPreview(URL.createObjectURL(file));
    } else if (url) {
      setImageFile(null);
      setFormData((f) => ({ ...f, imageUrl: url }));
      setPreview(url);
    }
    setShowImageModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("inStock", formData.inStock);

    if (imageFile) {
      form.append("image", imageFile);
    } else if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl);
    }

    try {
      await apiService.put(`/books/${id}`, form, true);
      dispatch(showNotification({ message: "✅ Book updated successfully", type: "success" }));
      setTimeout(() => navigate("/bookstore"), 1500);
    } catch (err) {
      dispatch(showNotification({ message: err.response?.data?.message || "Update failed", type: "error" }));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.editBookPage}>
      <h2>Edit Book</h2>
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
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </label>

        <button type="button" className={styles.buttonPrimary} onClick={() => setShowImageModal(true)}>
          Choose Image
        </button>

        {preview && (
          <div className={styles.preview}>
            <p>Image Preview:</p>
            <img src={preview} alt="Preview" className={styles.previewImage} />
          </div>
        )}

        <div className={styles.checkboxRow}>
          <label htmlFor="inStock">In Stock:</label>
          <input id="inStock" name="inStock" type="checkbox" checked={formData.inStock} onChange={handleChange} />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.buttonPrimary}>
            💾 Update Book
          </button>
        </div>
      </form>

      {showImageModal && (
        <ImageInsertModal onInsert={handleImageInsert} onClose={() => setShowImageModal(false)} />
      )}
    </div>
  );
};

export default EditBook;
