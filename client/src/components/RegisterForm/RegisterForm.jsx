// 📦 RegisterForm.jsx — оновлений з toast

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./RegisterForm.module.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../store/axios";

const RegisterForm = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google", {
        id_token: credentialResponse.credential,
      });

      login({
        token: res.data.token,
        user: res.data.user,
      });

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google signup error", err);
      toast.error("Google signup failed");
    }
  };

  return (
    <div className={styles.container}>
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
      </form>

      <div className={styles["google-signup"]}>
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => toast.error("Google signup failed")}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
