import { useState } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Minus, Eraser
} from "lucide-react";
import styles from "./EditableToolbar.module.css";
import ImageInsertModal from "../ImageInsertModal/ImageInsertModal";
import DOMPurify from "dompurify";

const EditableToolbar = ({ execCmd, editorRef }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageInsert = (url) => {
    execCmd("insertImage", url);
    setShowImageModal(false);
  };

  const handleClearFormatting = () => {
    execCmd("removeFormat");
    execCmd("formatBlock", "P");
  };

  const handleClearAll = () => {
    if (!editorRef?.current) return;
    const plainText = editorRef.current.textContent || "";
    const sanitized = DOMPurify.sanitize(`<p>${plainText}</p>`);
    editorRef.current.innerHTML = sanitized;
  };

  return (
    <>
      <div className={styles.toolbarContainer}>
        <div className={styles.group}>
          <button onClick={() => execCmd("bold")} title="Bold"><Bold className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("italic")} title="Italic"><Italic className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("underline")} title="Underline"><Underline className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("strikeThrough")} title="Strikethrough"><Strikethrough className={styles.toolbarIcon} /></button>
        </div>

        <div className={styles.group}>
          <button onClick={() => execCmd("justifyLeft")} title="Align Left"><AlignLeft className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("justifyCenter")} title="Align Center"><AlignCenter className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("justifyRight")} title="Align Right"><AlignRight className={styles.toolbarIcon} /></button>
        </div>

        <div className={styles.group}>
          <select onChange={(e) => execCmd("formatBlock", e.target.value)} defaultValue="" title="Headings">
            <option value="" disabled>⬇ Heading</option>
            <option value="P">Paragraph</option>
            <option value="H1">Heading 1</option>
            <option value="H2">Heading 2</option>
            <option value="H3">Heading 3</option>
          </select>
        </div>

        <div className={styles.group}>
          <button onClick={() => execCmd("insertUnorderedList")} title="Bullet List"><List className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("insertOrderedList")} title="Numbered List"><ListOrdered className={styles.toolbarIcon} /></button>
        </div>

        <div className={styles.group}>
          <button onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCmd("createLink", url);
          }} title="Insert Link"><Link className={styles.toolbarIcon} /></button>

          <button onClick={() => setShowImageModal(true)} title="Insert Image"><Image className={styles.toolbarIcon} /></button>
          <button onClick={() => execCmd("insertHorizontalRule")} title="Insert Line"><Minus className={styles.toolbarIcon} /></button>
        </div>

        <div className={styles.group}>
          <button onClick={handleClearFormatting} title="Clear Formatting"><Eraser className={styles.toolbarIcon} /></button>
          <button onClick={handleClearAll} title="Clear All">🧹</button>
        </div>
      </div>

      {showImageModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </>
  );
};

export default EditableToolbar;
