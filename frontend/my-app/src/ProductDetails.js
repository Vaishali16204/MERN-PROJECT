import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBestPrice, setShowBestPrice] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const addToCart = () => {
    const finalPrice = showBestPrice
      ? Math.floor(product.price - product.price * 0.15)
      : product.price;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      ...product,
      price: finalPrice,
      quantity,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  if (!product) return <h2>Loading...</h2>;

  const discountedPrice = Math.floor(product.price - product.price * 0.15);

  return (
    <div className="product-details">
      <div className="product-image-section">
        <img
          src={`http://localhost:5000/uploads/${product.image.split("/").pop()}`}
          alt={product.name}
          className="main-product-image"
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <div className="rating-section">
          <span>⭐ 4.5 (4,468)</span>
        </div>

        <p className="desc">{product.description}</p>

        <div className="price-section">
          <span className="price">
            ₹{showBestPrice ? discountedPrice : product.price}
          </span>

          <span className="old-price">
            ₹{Math.floor(product.price * 1.15)}
          </span>

          <span className="discount">(15% OFF)</span>
        </div>

        <p className="tax-text">Inclusive of all taxes</p>

        <div className="best-price-box">
          <div
            className="best-price-header"
            onClick={() => setShowBestPrice(!showBestPrice)}
          >
            <h3>Best Price: ₹{discountedPrice}</h3>
            <span>{showBestPrice ? "▲" : "▼"}</span>
          </div>

          {showBestPrice && (
            <ul>
              <li>Product discount already applied</li>
              <li>Extra savings available on combo offers</li>
              <li>Premium quality assurance</li>
            </ul>
          )}
        </div>

        <div className="quantity-section">
          <button
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>
        </div>

        <p className="category">{product.category}</p>

        <button className="cart-btn" onClick={addToCart}>
          Add to Cart - ₹
          {(showBestPrice ? discountedPrice : product.price) * quantity}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;