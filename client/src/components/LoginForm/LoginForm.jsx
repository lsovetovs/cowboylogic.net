import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../store/axios";

const LoginForm = () => {
  const { login } = useAuth();
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
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ Google login
  const googleLogin = useGoogleLogin({
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
        console.error("Google login error", err);
        setError("Google login failed");
      }
    },
    onError: () => {
      setError("Google login failed");
    },
    flow: "implicit",
  });

  return (
    <div className={styles["login-form"]}>
      <h2>Login</h2>

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
        <button type="submit">Log In</button>
        {error && <p>{error}</p>}
      </form>

      <button
        type="button"
        onClick={googleLogin}
        className={styles["google-btn"]}
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginForm;
