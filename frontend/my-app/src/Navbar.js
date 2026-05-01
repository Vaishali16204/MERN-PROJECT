import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { FaDownload, FaTruck, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = localStorage.getItem("user");

  return (
    <>
      <div className="top-navbar">
        <div className="logo">
          <h1>plum</h1>
          <p>— we have chemistry —</p>
        </div>

        <div className="center-search">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?q=${search}`);
                }
              }}
            />
          </div>
        </div>

        <div className="nav-right">
          <FaDownload />
          <FaTruck />
          <FaUser
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (user) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
          />
          <FaShoppingCart
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="main-navbar">
        <ul>
          <li><Link to="/search?q=skincare">Skin</Link></li>
          <li><Link to="/search?q=haircare">Hair</Link></li>
          <li><Link to="/search?q=bodycare">Body</Link></li>
          <li><Link to="/search?q=fragrance">Fragrances</Link></li>
          <li><Link to="/search?q=combos">Combos</Link></li>
          <li><Link to="/search?q=suncare">Suncare</Link></li>
          <li><Link to="/search?q=serum">Serum</Link></li>
          <li><Link to="/search?q=moisturizers">Moisturizers</Link></li>
          <li><Link to="/search?q=makeup">Makeup</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;