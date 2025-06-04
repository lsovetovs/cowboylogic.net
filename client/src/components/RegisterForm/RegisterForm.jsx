import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../store/axios";
import { fetchCurrentUser } from "../../store/slices/authSlice";
import { showNotification } from "../../store/slices/notificationSlice"; // ✅

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      dispatch(showNotification({ message: "Account created successfully!", type: "success" }));

      await axios.post("/auth/login", form);
      await axios.post("/auth/request-code", { email: form.email });

      const code = prompt("Enter the verification code sent to email:");
      const verifyRes = await axios.post("/auth/verify-code", {
        email: form.email,
        code,
      });

      localStorage.setItem("token", verifyRes.data.token);
      dispatch(fetchCurrentUser(verifyRes.data.token));

      dispatch(showNotification({ message: "Welcome!", type: "success" }));
      navigate("/");
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "Registration failed",
          type: "error",
        })
      );
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google", {
        id_token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      dispatch(fetchCurrentUser(res.data.token));

      dispatch(showNotification({ message: "Logged in with Google!", type: "success" }));
      navigate("/");
    } catch (err) {
      console.error("Google signup error", err);
      dispatch(showNotification({ message: "Google signup failed", type: "error" }));
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
          onError={() =>
            dispatch(showNotification({ message: "Google signup failed", type: "error" }))
          }
        />
      </div>
    </div>
  );
};

export default RegisterForm;
