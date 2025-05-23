import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { apiService } from "../../services/axiosService";
import styles from "./Orders.module.css";

const Orders = () => {
  const { user } = useAuth();
  const { data: ordersData, loading, error } = useFetch("/orders", true);
  const [orders, setOrders] = useState([]);

  // Синхронізація локального стану після fetch
  useEffect(() => {
    if (ordersData) setOrders(ordersData);
  }, [ordersData]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await apiService.delete(`/orders/${orderId}`, true);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      alert("Failed to delete order");
      console.error(err);
    }
  };

  return (
    <div className={styles.ordersPage}>
      <h2>My Orders</h2>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
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
