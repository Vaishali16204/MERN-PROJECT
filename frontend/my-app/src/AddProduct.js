import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null
  });               

  const categories = [
    "Skincare","Haircare","Body Care","Fragrance",
    "Combos","Suncare","Serums","Moisturizers","Makeup"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("image", formData.image);

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: data
    });

    if (res.ok) {
      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null
      });
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" value={formData.name}  onChange={handleChange}/>
          <input name="price"  placeholder="Price" value={formData.price} onChange={handleChange}/>
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
          <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input type="file" name="image" accept="image/*"onChange={handleChange} />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;