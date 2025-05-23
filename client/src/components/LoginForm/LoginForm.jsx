
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import axios from "../../store/axios";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const { loginWithToken, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // 1: email+pass, 2: code
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      await axios.post("/auth/login", form);
      await axios.post("/auth/request-code", { email: form.email });
      setStep(2);
      setInfo("Verification code sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("/auth/verify-code", { email: form.email, code });
      loginWithToken(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code");
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

      <hr />
      <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} />

      {error && <p className={styles.error}>{error}</p>}
      {info && <p className={styles.info}>{info}</p>}
    </div>
  );
};

export default LoginForm;

