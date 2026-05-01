import React from "react";
import "./CategorySlider.css";

import summer from "./images/summer .jpg";
import skincare from "./images/skincare.jpg";
import bodycare from "./images/bodycare.jpg";
import fragrance from "./images/fragrance.jpg";
import haircare from "./images/haircare.jpg";
import combos from "./images/combos.jpg";

const categories = [
  { name: "summer essentials", image: summer  },
  { name: "skincare", image: skincare },
  { name: "bodycare", image: bodycare },
  { name: "fragrance", image: fragrance },
  { name: "haircare", image: haircare },
  { name: "combos", image: combos }
];

function CategorySlider() {
  return (
    <div className="category-section">
      <div className="category-container">
        {categories.map((item, index) => (
          <div className="category-item" key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            
          </div>
          
        ))}
      </div>
    </div>
  );
}
export default CategorySlider;

