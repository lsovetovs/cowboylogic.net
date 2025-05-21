// import { useEffect, useRef, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import axios from "../../store/axios";
// import styles from "./EditablePage.module.css";

// const EditablePage = ({ slug, title }) => {
//   const { user, token } = useAuth();
//   const [content, setContent] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     axios
//       .get(`/pages/${slug}`)
//       .then((res) => setContent(res.data.content))
//       .catch(() => setError("⚠️ Failed to load content"));
//   }, [slug]);

//   const execCmd = (command) => {
//     document.execCommand(command, false, null);
//   };

//   const handleSave = async () => {
//     try {
//       const updatedContent = editorRef.current.innerHTML;
//       await axios.put(
//         `/pages/${slug}`,
//         { content: updatedContent },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setContent(updatedContent);
//       setIsEditing(false);
//     } catch {
//       alert("❌ Failed to save changes");
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.title}>{title}</h1>
//       {error && <p className={styles.error}>{error}</p>}

//       {(user?.role === "admin" || user?.role === "superadmin") && (
//         <div className={styles.editToolbar}>
//           <button onClick={() => setIsEditing((prev) => !prev)} className="btn btn-outline">
//             {isEditing ? "❌ Cancel" : "✏️ Edit Page"}
//           </button>
//         </div>
//       )}

//       <div
//         ref={editorRef}
//         className={`${styles.content} ${isEditing ? styles.editable : ""}`}
//         contentEditable={isEditing}
//         suppressContentEditableWarning
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {isEditing && (
//         <div className={styles.editorButtons}>
//           <div className={styles.toolbar}>
//             <button onClick={() => execCmd("bold")}>Bold</button>
//             <button onClick={() => execCmd("italic")}>Italic</button>
//             <button onClick={() => execCmd("underline")}>Underline</button>
//             <button onClick={() => execCmd("insertUnorderedList")}>• List</button>
//             <button onClick={() => execCmd("insertOrderedList")}>1. List</button>
//             <button onClick={() => execCmd("removeFormat")}>Clear</button>
//           </div>
//           <button onClick={handleSave} className="btn btn-outline">
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditablePage;
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../store/axios";
import styles from "./EditablePage.module.css";

const EditablePage = ({ slug, title}) => {
  const { user, token } = useAuth();
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/pages/${slug}`)
      .then((res) => {
        setContent(res.data.content);
        setError(null);
      })
      .catch(() => setError("⚠️ Failed to load content"));
  }, [slug]);

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSave = async () => {
    try {
      const updatedContent = editorRef.current.innerHTML;
      await axios.put(
        `/pages/${slug}`,
        { content: updatedContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent(updatedContent);
      setIsEditing(false);
      setError(null); // якщо раніше був 404 — прибрати
    } catch {
      alert("❌ Failed to save changes");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {error && <p className={styles.error}>{error}</p>}

      {(user?.role === "admin" || user?.role === "superadmin") && (
        <div className={styles.editBar}>
          <button
            className="btn btn-outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "❌ Cancel" : "✏️ Edit Page"}
          </button>
        </div>
      )}

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
            <button onClick={() => execCmd("insertUnorderedList")}>
              • List
            </button>
            <button onClick={() => execCmd("insertOrderedList")}>
              1. List
            </button>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => execCmd("removeFormat")}>Clear</button>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => execCmd("insertImage", prompt("Image URL:"))}
            >
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
        dangerouslySetInnerHTML={{ __html: content }}
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
