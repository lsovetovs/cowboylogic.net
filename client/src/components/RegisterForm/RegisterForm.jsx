import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../store/axios";

const RegisterForm = () => {
  const { register, login } = useAuth(); // login — для Google
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("/auth/google", {
          id_token: tokenResponse.credential || tokenResponse.id_token,
        });

        login({
          token: res.data.token,
          user: res.data.user,
        });

        navigate("/");
      } catch (err) {
        console.error("Google signup error", err);
        setError("Google signup failed");
      }
    },
    onError: () => {
      setError("Google signup failed");
    },
    flow: "implicit",
  });

  return (
    <div className={styles["register-form"]}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>

      <button
        type="button"
        onClick={googleSignup}
        className={styles["google-btn"]}
      >
        Sign up with Google
      </button>
    </div>
  );
};

export default RegisterForm;
