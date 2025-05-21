import { useState } from "react";
import styles from "./Contact.module.css";
import axios from "../../store/axios";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/contact", { firstName, lastName, email, comment });
      alert("Message sent!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
    } catch  {
      alert("Failed to send message");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <h2>ContactUs</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name*"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
