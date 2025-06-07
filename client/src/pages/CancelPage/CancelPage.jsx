import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>❌ Payment Canceled</h2>
      <p>It seems something went wrong or you canceled the payment.</p>
      <Link to="/cart" className="btn btn-outline">
        Return to Cart
      </Link>
    </div>
  );
};

export default CancelPage;
