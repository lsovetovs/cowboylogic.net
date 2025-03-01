import { NavLink, useNavigate } from "react-router-dom";
// import { ReactComponent as SearchIcon } from "../../assets/svg/search-icon.svg";
import searchIcon from "../../assets/svg/search-icon.svg";
import { useState } from "react";
import styles from "./Navbar.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) =>
  clsx(styles.navLink, isActive && styles.active);

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    // Перенаправлення на сторінку пошуку
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // Очищаємо поле після відправки
    setSearchVisible(false); // Ховаємо поле пошуку
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.navLinks}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={buildLinkClass}>
            About
          </NavLink>
          <NavLink to="/portfolio" className={buildLinkClass}>
            Portfolio
          </NavLink>
          <NavLink to="/education" className={buildLinkClass}>
            Education
          </NavLink>
          <NavLink to="/work-history" className={buildLinkClass}>
            Work History
          </NavLink>
          <NavLink to="/contact" className={buildLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/bookstore" className={buildLinkClass}>
            CLP Book Store
          </NavLink>
          <button
            className={styles.searchButton}
            onClick={() => setSearchVisible(!isSearchVisible)}
          >
            {/* <SearchIcon className={styles.searchIcon} /> */}
            <img
              src={searchIcon}
              alt="Search"
              height={20}
              width={20}
              className={styles.searchIcon}
              ></img>
          </button>
        </nav>
      </div>
      {isSearchVisible && (
        // <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
        // </div>
      )}
    </div>
  );
};

export default Navbar;
