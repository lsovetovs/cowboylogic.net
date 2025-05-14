import { useEffect, useState } from "react";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";

const Orders = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = () => {
    axios
      .get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders"));
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order deleted");
      fetchOrders();
    } catch (err) {
      alert("Failed to delete order");
      console.error(err);
    }
  };

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
            {user?.role === "admin" && (
              <button
                onClick={() => handleDeleteOrder(order.id)}
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "#ffdddd",
                  border: "1px solid red",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                🗑 Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
