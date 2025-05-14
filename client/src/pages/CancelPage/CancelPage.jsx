import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>❌ Оплату скасовано</h2>
      <p>Схоже, щось пішло не так або ви скасували оплату.</p>
      <Link to="/cart" className="btn btn-primary">Повернутись до кошика</Link>
    </div>
  );
};

export default CancelPage;
