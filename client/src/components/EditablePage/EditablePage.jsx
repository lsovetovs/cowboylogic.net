import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiService } from "../../services/axiosService";
import styles from "./EditablePage.module.css";
import DOMPurify from "dompurify";
import { ROLES } from "../../constants/roles";
import { toast } from "react-toastify";

const EditablePage = ({ slug, title }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    apiService
      .get(`/pages/${slug}`)
      .then((res) => {
        setContent(res.data.content);
        setError(null);
      })
      .catch(() => {
        setError("⚠️ Failed to load content");
        toast.error("Failed to load content");
      });
  }, [slug]);

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSave = async () => {
    try {
      const cleanContent = DOMPurify.sanitize(content);
      await apiService.put(`/pages/${slug}`, { content: cleanContent }, true);
      setIsEditing(false);
      toast.success("Page content saved successfully!");
    } catch {
      toast.error("Failed to save changes.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        {(user?.role === ROLES.ADMIN || user?.role === ROLES.SUPERADMIN) && (
          <div className={styles.editControls}>
            <button
              className="btn btn-outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "❌ Cancel" : "✏️ Edit Page"}
            </button>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {isEditing && (
        <div className={styles.toolbar}>
          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("bold")}>B</button>
            <button onClick={() => execCmd("italic")}>I</button>
            <button onClick={() => execCmd("underline")}>U</button>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("justifyLeft")}>Left</button>
            <button onClick={() => execCmd("justifyCenter")}>Center</button>
            <button onClick={() => execCmd("justifyRight")}>Right</button>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("insertUnorderedList")}>• List</button>
            <button onClick={() => execCmd("insertOrderedList")}>1. List</button>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("removeFormat")}>Clear</button>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("insertImage", prompt("Image URL:"))}>
              🖼️ Image
            </button>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        className={`${styles.editable} ${
          isEditing ? styles.editingArea : styles.staticView
        }`}
        contentEditable={isEditing}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />

      {isEditing && (
        <div className={styles.bottomSave}>
          <button className="btn btn-outline" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditablePage;
