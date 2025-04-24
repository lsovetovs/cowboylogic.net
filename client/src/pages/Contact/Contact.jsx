import { useState } from "react";
import styles from "./Contact.module.css";
import axios from "../../store/axios"; // або прямо 'axios'

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
      setFirstName(""); setLastName(""); setEmail(""); setComment("");
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className={styles.container}>
  
    <form className={styles.contact} onSubmit={handleSubmit}>
      <h2>Contact</h2>
      <input
        type="text"
        placeholder="FirstName*"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="LastName*"
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
  );
};

export default Contact;
