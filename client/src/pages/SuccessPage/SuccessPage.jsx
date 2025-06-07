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
          "/orders/confirm",
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
      <h2>🎉 Payment Successful!</h2>
      <p>Your order has been confirmed. Thank you for your purchase!</p>
      <button className="btn btn-outline" onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default SuccessPage;
