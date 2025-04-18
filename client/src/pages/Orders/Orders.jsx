import { useEffect, useState } from "react";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders"));
  }, [token]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "1rem" }}>
            <h4>Order #{order.id}</h4>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <ul>
              {order.OrderItems.map((item) => (
                <li key={item.id}>
                  {item.Book.title} — {item.quantity} pcs @ ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
