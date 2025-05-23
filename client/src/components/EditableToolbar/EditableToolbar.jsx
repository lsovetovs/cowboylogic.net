import { useState } from "react";
import styles from "./EditableToolbar.module.css";
import DOMPurify from "dompurify";
import ImageInsertModal from "../ImageInsertModal/ImageInsertModal";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link, Image, Minus, Eraser
} from "lucide-react";

const EditableToolbar = ({ execCmd, editorRef }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setShowConfirmModal(false);
  };

  const ButtonWithTooltip = ({ title, onClick, children }) => (
    <div className={styles.tooltipWrapper}>
      <button onClick={onClick}>{children}</button>
      <span className={styles.tooltip}>{title}</span>
    </div>
  );

  return (
    <>
      <div className={styles.toolbarContainer}>
        <div className={styles.group}>
          <ButtonWithTooltip title="Bold" onClick={() => execCmd("bold")}><Bold className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Italic" onClick={() => execCmd("italic")}><Italic className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Underline" onClick={() => execCmd("underline")}><Underline className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Strikethrough" onClick={() => execCmd("strikeThrough")}><Strikethrough className={styles.toolbarIcon} /></ButtonWithTooltip>
        </div>

        <div className={styles.group}>
          <ButtonWithTooltip title="Align Left" onClick={() => execCmd("justifyLeft")}><AlignLeft className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Align Center" onClick={() => execCmd("justifyCenter")}><AlignCenter className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Align Right" onClick={() => execCmd("justifyRight")}><AlignRight className={styles.toolbarIcon} /></ButtonWithTooltip>
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
          <ButtonWithTooltip title="Bullet List" onClick={() => execCmd("insertUnorderedList")}><List className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Numbered List" onClick={() => execCmd("insertOrderedList")}><ListOrdered className={styles.toolbarIcon} /></ButtonWithTooltip>
        </div>

        <div className={styles.group}>
          <ButtonWithTooltip title="Insert Link" onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCmd("createLink", url);
          }}><Link className={styles.toolbarIcon} /></ButtonWithTooltip>

          <ButtonWithTooltip title="Insert Image" onClick={() => setShowImageModal(true)}><Image className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Insert Line" onClick={() => execCmd("insertHorizontalRule")}><Minus className={styles.toolbarIcon} /></ButtonWithTooltip>
        </div>

        <div className={styles.group}>
          <ButtonWithTooltip title="Clear Formatting" onClick={handleClearFormatting}><Eraser className={styles.toolbarIcon} /></ButtonWithTooltip>
          <ButtonWithTooltip title="Clear All" onClick={() => setShowConfirmModal(true)}>🧹</ButtonWithTooltip>
        </div>
      </div>

      {showImageModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImageModal(false)}
        />
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to clear all content?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={handleClearAll}>Yes, clear</button>
              <button className="btn btn-outline" onClick={() => setShowConfirmModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditableToolbar;
