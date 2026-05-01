import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};
  useEffect(() => {
    fetch("http://localhost:5000/products/" + id)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details">
    <img src={"http://localhost:5000/uploads/" + product.image} alt="" />

    <div className="product-info">
      <h2>{product.name}</h2>
      <p className="desc">{product.description}</p>
      <p className="price">₹{product.price}</p>
      <p className="category">{product.category}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  </div>
);
}

export default ProductDetails;