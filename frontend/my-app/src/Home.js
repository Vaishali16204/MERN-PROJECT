import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import CategorySlider from "./CategorySlider";
import SmallCarousel from "./SmallCarousel";
import HeroCarousel from "./HeroCarousel";
import Footer from "./Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <CategorySlider />
      <SmallCarousel />
      <HeroCarousel />

      <div className="home">
        <div className="product-grid">
          {products.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={`http://localhost:5000/uploads/${product.image
                  .split("/")
                  .pop()}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h4>₹{product.price}</h4>
              <span>{product.category}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;