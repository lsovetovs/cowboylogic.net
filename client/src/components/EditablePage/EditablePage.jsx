import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { apiService } from "../../services/axiosService";
import styles from "./EditablePage.module.css";
import DOMPurify from "dompurify";
import { ROLES } from "../../constants/roles";
import { toast } from "react-toastify";
import EditableToolbar from "../../components/EditableToolbar/EditableToolbar";

const EditablePage = ({ slug, title }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

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
      const cleanContent = DOMPurify.sanitize(editorRef.current.innerHTML);
      await apiService.put(`/pages/${slug}`, { content: cleanContent }, token);
      setContent(cleanContent);
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

      {isEditing && <EditableToolbar execCmd={execCmd} editorRef={editorRef} />}

      <div
        ref={editorRef}
        className={`${styles.editable} ${isEditing ? styles.editingArea : styles.staticView}`}
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
