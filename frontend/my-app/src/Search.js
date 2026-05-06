import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Search.css";

function Search() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = products.filter((item) =>
    `${item.name || ""} ${item.category || ""} ${item.description || ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>Search Results for "{query}"</h2>

      <div className="search-grid">
        {filtered.length === 0 ? (
          <p>No products found</p>
        ) : (
          filtered.map((item) => (
            <Link
              to={`/product/${item._id}`}
              className="search-link"
              key={item._id}
            >
              <div className="search-card">
                <img
                  src={`http://localhost:5000/uploads/${item.image
                    ?.split("/")
                    .pop()}`}
                  alt={item.name || "Product"}
                />
                <h4>{item.name || "No Name"}</h4>
                <p>₹{item.price || 0}</p>
                <small>{item.category || "No Category"}</small>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;