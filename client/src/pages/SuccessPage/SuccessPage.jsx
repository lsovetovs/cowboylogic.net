import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../store/axios";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

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

    if (token) {
      confirmOrder();
    }
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
