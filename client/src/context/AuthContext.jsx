import { createContext, useContext, useEffect, useState } from "react";
import axios from "../store/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true); // додано

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch {
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false); // завершення ініціалізації
    };

    fetchUser();
  }, [token]);

  const login = async (data) => {
    const res = await axios.post("/auth/login", data);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await axios.post("/auth/register", data);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
