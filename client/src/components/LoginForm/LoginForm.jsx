import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import axios from "../../store/axios";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { loginWithToken, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", form);
      await axios.post("/auth/request-code", { email: form.email });
      setStep(2);
      toast.info("Verification code sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/verify-code", {
        email: form.email,
        code,
      });
      loginWithToken(res.data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired code");
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

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google login error", err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      {step === 1 ? (
        <form onSubmit={handleLogin}>
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
          <button type="submit">Continue</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}

      <div className={styles["google-login"]}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google login failed")}
        />
      </div>
    </div>
  );
};

export default LoginForm;
