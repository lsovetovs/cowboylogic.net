import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../store/axios";

const Cart = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(() => {
    axios
      .get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load cart"));
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.patch(
        `/cart/${itemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
    } catch {
      alert("Update failed");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch {
      alert("Failed to remove item");
    }
  };

  const handleStripeCheckout = async () => {
    try {
      const stripeItems = items.map((item) => ({
        title: item.Book.title,
        price: item.Book.price,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        "/orders/create-checkout-session",
        { items: stripeItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      alert("Stripe checkout failed");
      console.error(err);
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.Book.price,
    0
  );

  return (
    <div className="cart-page">
      <h2>My Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.Book.title}</strong> — ${item.Book.price} ×{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                />
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleStripeCheckout}>Checkout with Stripe</button>
        </>
      )}
    </div>
  );
};

export default Cart;
