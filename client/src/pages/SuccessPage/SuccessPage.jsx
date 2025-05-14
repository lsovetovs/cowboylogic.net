import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../store/axios";

import { useAuth } from "../../context/AuthContext";

const SuccessPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        await axios.post(
          "/orders/confirm-stripe-order",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Confirmation failed", error);
      }
    };

    confirmOrder();
  }, [token]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎉 Оплата пройшла успішно!</h2>
      <p>Ми підтвердили ваше замовлення.</p>
      <button onClick={() => navigate("/")}>На головну</button>
    </div>
  );
};

export default SuccessPage;
