import React, { useState, useEffect } from "react";
import "./SmallCarousel.css";

const slides = [
  {
    text: "FREE sunscreen & body lotion above ₹1299",
    bg: "#f5d1b8",
    img: "/images/sunscreen.png"
  },
  {
    text: "FREE face mist on orders above ₹999",
    bg: "#6a5acd",
    img: "/images/facem.png"
  }
];

function SmallCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="small-carousel"
      style={{ backgroundColor: slides[current].bg }}
    >
      <div className="carousel-content">

        <img
          src={slides[current].img}
          alt="offer"
          className="offer-img"
        />

        <h2>{slides[current].text}</h2>

        <button className="next-btn" onClick={nextSlide}>
          ❯
        </button>

      </div>
    </div>
  );
}

export default SmallCarousel;