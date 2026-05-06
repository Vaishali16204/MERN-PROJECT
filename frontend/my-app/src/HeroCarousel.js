import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroCarousel.css";

import slide1 from "./images/hero1.jpg";
import slide2 from "./images/hero2.jpg";
import slide3 from "./images/hero3.jpg";
import slide4 from "./images/hero4.jpg";
import slide5 from "./images/hero5.jpg";

const slides = [slide1, slide2, slide3, slide4, slide5];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const handleShopNow = () => {
    navigate("/search");
  };

  return (
    <div className="hero-carousel">
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((img, index) => (
          <div key={index} className="hero-slide">
            <img src={img} alt={`hero-${index}`} className="hero-img" />

            <div className="hero-content">
              <h1>Special Offer</h1>
              <p>Shop your favourites now</p>
              <button onClick={handleShopNow}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow left" onClick={prevSlide}>
        ❮
      </button>

      <button className="hero-arrow right" onClick={nextSlide}>
        ❯
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`hero-dot ${current === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;