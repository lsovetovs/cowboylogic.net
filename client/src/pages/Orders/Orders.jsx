import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { apiService } from "../../services/axiosService";
import { toast } from "react-toastify";
import styles from "./Orders.module.css";

const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { data: ordersData, loading, error } = useFetch("/orders", token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersData) setOrders(ordersData);
  }, [ordersData]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await apiService.delete(`/orders/${orderId}`, token);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order deleted successfully");
    } catch (err) {
      toast.error("Failed to delete order");
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
