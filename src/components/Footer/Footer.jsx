import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <p className="footer-content">
        Copyright © 2025 <Link to="/">Roger Haller</Link>. All Rights Reserved.
        | Catch Responsive by{" "}
        <Link to="https://catchthemes.com/">Catch Themes</Link>
      </p>
    </div>
  );
}
