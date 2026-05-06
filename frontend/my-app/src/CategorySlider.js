import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySlider.css";

import summer from "./images/summer .jpg";
import skincare from "./images/skincare.jpg";
import bodycare from "./images/bodycare.jpg";
import fragrance from "./images/fragrance.jpg";
import haircare from "./images/haircare.jpg";
import combos from "./images/combos.jpg";

const categories = [
  { name: "summer essentials", image: summer },
  { name: "skincare", image: skincare },
  { name: "bodycare", image: bodycare },
  { name: "fragrance", image: fragrance },
  { name: "haircare", image: haircare },
  { name: "combos", image: combos }
];

function CategorySlider() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${category}`);
  };

  return (
    <div className="category-section">
      <div className="category-container">
        {categories.map((item, index) => (
          <div
            className="category-item"
            key={index}
            onClick={() => handleCategoryClick(item.name)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySlider;