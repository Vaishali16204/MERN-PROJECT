import React from "react";
import CategorySlider from "./CategorySlider";
import SmallCarousel from "./SmallCarousel";
import HeroCarousel from "./HeroCarousel";
import ProductCarousel from "./ProductCarousel";

function Home() {
  return (
    <>
      <CategorySlider />
      <SmallCarousel />
      <HeroCarousel />
      <ProductCarousel />  
    </>
  );
}

export default Home;