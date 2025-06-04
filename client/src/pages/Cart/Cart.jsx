import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { apiService } from "../../services/axiosService";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.cart.items);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await apiService.patch(`/cart/${itemId}`, { quantity: newQuantity }, token);
      dispatch(fetchCartItems());
      toast.success("Quantity updated");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await apiService.delete(`/cart/${itemId}`, token);
      dispatch(fetchCartItems());
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleStripeCheckout = async () => {
    try {
      const stripeItems = items.map((item) => ({
        title: item.Book.title,
        price: item.Book.price,
        quantity: item.quantity,
      }));

      const res = await apiService.post("/orders/create-checkout-session", { items: stripeItems }, token);
      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Stripe checkout failed");
      console.error(err);
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.Book.price,
    0
  );

  return (
    <div className={styles["cart-page"]}>
      <h2>My Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.Book.title}</strong>
                <span className={styles.price}> — ${item.Book.price}</span>
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
          <button
            onClick={handleStripeCheckout}
            className="btn btn-outline btn-checkout"
          >
            Checkout with Stripe
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
