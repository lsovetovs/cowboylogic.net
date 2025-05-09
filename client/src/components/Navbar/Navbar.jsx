import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";
import clsx from "clsx";
import searchIcon from "/assets/svg/search-icon.svg";
import { useAuth } from "../../context/AuthContext";

const buildLinkClass = ({ isActive }) =>
  clsx(styles.navLink, isActive && styles.active);

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearchVisible(false);
  };

  const toggleDropdown = (menuName, event) => {
    event.preventDefault();
    setOpenDropdown(openDropdown === menuName ? null : menuName);
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

          {/* CLStrategies з випадаючим меню */}
          <div className={styles.dropdown}>
            <NavLink
              to="/clstrategies"
              className={clsx(styles.navLink, styles.dropdownButton)}
              onClick={(e) => toggleDropdown("clstrategies", e)}
            >
              CLStrategies
              {openDropdown === "clstrategies" && (
                <div className={styles.dropdownMenu}>
                  <NavLink to="/clstrategies" className={styles.dropdownItem}>
                    CLStrategies Home
                  </NavLink>
                  <NavLink
                    to="/clstrategies/cowboy-college-consulting"
                    className={styles.dropdownItem}
                  >
                    Cowboy College Consulting
                  </NavLink>
                  <NavLink
                    to="/clstrategies/cowboy-college-start-up"
                    className={styles.dropdownItem}
                  >
                    Cowboy College Start-up
                  </NavLink>
                  <NavLink
                    to="/clstrategies/cowboy-college-leadership"
                    className={styles.dropdownItem}
                  >
                    Cowboy College Leadership
                  </NavLink>
                </div>
              )}
            </NavLink>
          </div>

          {/* CLPublishing з випадаючим меню */}
          <div className={styles.dropdown}>
            <NavLink
              to="/clpublishing"
              className={clsx(styles.navLink, styles.dropdownButton)}
              onClick={(e) => toggleDropdown("clpublishing", e)}
            >
              CLPublishing
              {openDropdown === "clpublishing" && (
                <div className={styles.dropdownMenu}>
                  <NavLink to="/clpublishing" className={styles.dropdownItem}>
                    CLPublishing Home
                  </NavLink>
                  <NavLink
                    to="/clpublishing/cowboy-college-pub/author"
                    className={styles.dropdownItem}
                  >
                    Cowboy College Pub/Author
                  </NavLink>
                  <NavLink
                    to="/clpublishing/books-books"
                    className={styles.dropdownItem}
                  >
                    Books Books
                  </NavLink>
                  <NavLink
                    to="/clpublishing/b2b-bookstores"
                    className={styles.dropdownItem}
                  >
                    B2B Bookstores
                  </NavLink>
                </div>
              )}
            </NavLink>
          </div>

          <NavLink to="/contact" className={buildLinkClass}>
            ContactUs
          </NavLink>
          {user && ["admin", "superadmin"].includes(user.role) && (
            <NavLink to="/admin" className={buildLinkClass}>
              Admin Dashboard
            </NavLink>
          )}
          <NavLink to="/bookstore" className={buildLinkClass}>
            CLP Book Store
          </NavLink>
          {/* Кнопка пошуку */}
          <button
            className={styles.searchButton}
            onClick={() => setSearchVisible(!isSearchVisible)}
          >
            <img
              src={searchIcon}
              alt="Search"
              height={20}
              width={20}
              className={styles.searchIcon}
            />
          </button>
        </nav>
      </div>

      {/* Випадаючий пошук */}
      {isSearchVisible && (
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
      )}
    </div>
  );
};

export default Navbar;
