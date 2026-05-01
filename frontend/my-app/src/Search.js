/*referevce https://www.youtube.com/watch?v=QSBc8bABwE0  https://www.youtube.com/watch?v=mZvKPtH9Fzo*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Search.css";

function Search() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
   useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = products.filter((item) =>`${item.name} ${item.category || ""}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="search-container">
      <h2>Search Results for "{query}"</h2>
      <div className="search-grid"> {filtered.length === 0 ? (<p>No products found</p>) : (
      filtered.map((item) => (
      <Link to={`/product/${item._id}`} className="search-link" key={item._id}>
      <div className="search-card">
      <img src={"http://localhost:5000/uploads/" + item.image} alt="" />
      <h4>{item.name}</h4>
      <p>₹{item.price}</p>
      <small>{item.category}</small>
    </div>
  </Link>

          ))
        )}
      </div>
    </div>
  );
}

export default Search;