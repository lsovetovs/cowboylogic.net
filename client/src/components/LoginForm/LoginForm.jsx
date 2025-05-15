import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { GoogleLogin } from "@react-oauth/google";
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

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google", {
        id_token: credentialResponse.credential,
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
  };

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

      <hr />
      <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} />
    </div>
  );
};

export default LoginForm;
