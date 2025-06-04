import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import styles from "./LoginForm.module.css";
import axios from "../../store/axios";
import { loginUser, fetchCurrentUser } from "../../store/slices/authSlice";
import { showNotification } from "../../store/slices/notificationSlice"; // ✅

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);

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
      dispatch(showNotification({ message: t("login.codeSent"), type: "info" }));
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || t("login.loginFailed"),
          type: "error",
        })
      );
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email: form.email, code }));
      if (loginUser.fulfilled.match(result)) {
        dispatch(showNotification({ message: t("login.welcomeBack"), type: "success" }));
        dispatch(fetchCurrentUser(result.payload.token));
        navigate("/");
      } else {
        dispatch(
          showNotification({
            message: result.payload || t("login.codeInvalid"),
            type: "error",
          })
        );
      }
    } catch {
      dispatch(showNotification({ message: t("login.codeInvalid"), type: "error" }));
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google", {
        id_token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      dispatch(fetchCurrentUser(res.data.token));

      dispatch(showNotification({ message: t("login.googleSuccess"), type: "success" }));
      navigate("/");
    } catch (err) {
      console.error("Google login error", err);
      dispatch(showNotification({ message: t("login.googleFailed"), type: "error" }));
    }
  };

  return (
    <div className={styles.container}>
      <h2>{t("Login")}</h2>

      {step === 1 ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder={t("Email")}
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t("Password")}
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{t("Continue")}</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder={t("Placeholder")}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? t("LoggingIn") : t("Verify")}
          </button>
        </form>
      )}

      <div className={styles["google-login"]}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() =>
            dispatch(showNotification({ message: t("login.googleFailed"), type: "error" }))
          }
        />
      </div>
    </div>
  );
};

export default LoginForm;
