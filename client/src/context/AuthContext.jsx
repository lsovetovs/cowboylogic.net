import { createContext, useContext, useEffect, useState } from "react";
import axios from "../store/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        });
    }
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
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
