import React, { useEffect, useState } from "react";
import "./ProductCarousel.css";
import { useNavigate } from "react-router-dom";

function ProductCarousel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => setProducts(Array.isArray(data) ? data : []))
        .catch((err) => console.log("Error fetching products:", err));
    }, []);

  return (
    <div className="carousel-wrapper">
      <div className="product-track">
        {products.map((product) => (
          <div key={product._id} className="product-card"  onClick={() => navigate("/product/" + product._id)}>
          <img src={`http://localhost:5000/uploads/${product.image}`}alt={product.name}/>
          <h3>{product.name}</h3>
            <p className="desc">{product.description}</p>
            <p className="price">₹{product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;