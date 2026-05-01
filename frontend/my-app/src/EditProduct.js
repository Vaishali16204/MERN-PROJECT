import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    navigate("/manage-products");
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
       <form className="edit-form" onSubmit={updateProduct}>
        <input type="text"name="name"value={product.name}onChange={handleChange}placeholder="Product Name"/>
        <input type="text"name="description"value={product.description}onChange={handleChange} placeholder="Description"/>
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price"/>
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category"/>
        <button type="submit" className="update-btn"> Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;