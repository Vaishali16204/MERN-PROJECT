import React, { useEffect, useState } from "react";
import "./ManageProducts.css";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { 
      method: "DELETE",
    });

    setProducts(products.filter((p) => p._id !== id));
  };
  
  return (
    <div className="manage-container">
      <h2>Manage Products</h2>
     <table className="product-table">
      <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
          <td>
          <img src={`http://localhost:5000/uploads/${product.image}`} alt="" width="60"/>
           </td>
           <td>{product.name}</td>
           <td>{product.description} </td>
           <td>₹{product.price}</td>
          <td>{product.category}</td>
          <td>
         <button
  className="edit-btn"
  onClick={() => navigate(`/edit-product/${product._id}`)}
>
  Edit
</button>
          <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
           </td>
          </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
}

export default ManageProducts;