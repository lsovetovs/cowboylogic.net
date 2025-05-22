
import { useEffect, useState } from "react";
import axios from "../../store/axios";
import { useAuth } from "../../context/AuthContext";
import styles from "./Orders.module.css";

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
    <div className={styles.ordersPage}>
      <h2>My Orders</h2>
      {error && <p className={styles.error}>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <h4>Order #{order.id}</h4>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <ul className={styles.orderList}>
              {order.OrderItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.Book.title}</strong> — {item.quantity} pcs @ ${item.price}
                </li>
              ))}
            </ul>
            {user?.role === "admin" && (
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className={styles.cancelButton}
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
