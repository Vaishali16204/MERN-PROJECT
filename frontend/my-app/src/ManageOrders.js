import React, { useState, useEffect } from "react";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log("Error fetching orders:", err));
  }, []);
 const updateStatus = async (id) => {
  await fetch(`http://localhost:5000/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "Delivered" })
  });
  window.location.reload();
};

 return (
  <div className="orders-container">
    <h2 className="orders-title">Manage Orders</h2>
    {orders.length === 0 ? (
      <p>No orders found</p>
    ) : (
      orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <span className="order-id">#{order._id}</span>
            <span className="order-amount">₹{order.totalAmount}</span>
          </div>

          <div className="order-info">
            <p><b>Name:</b> {order.user?.name}</p>
            <p><b>Email:</b> {order.user?.email}</p>
            <p><b>Phone:</b> {order.user?.phone}</p>
            <p><b>City:</b> {order.user?.city}</p>
            <p><b>State:</b> {order.user?.state}</p>
            <p><b>Pincode:</b> {order.user?.pincode}</p>
            <p><b>Qty:</b> {order.totalQty}</p>
            <p><b>Payment:</b> {order.paymentMethod}</p>
          </div>

          <div className="items">
            <h4>Items</h4>
            {order.items.map((item, i) => (
              <div className="item" key={i}>
                <span>{item.name}</span>
                <span>₹{item.price} × {item.qty}</span>
              </div>
            ))}
          </div>
          <div className="status">{order.status}</div>
           
          <button onClick={() => updateStatus(order._id)} > Mark as Delivered</button> </div>
    ))
    )}
  </div>
);
}

export default ManageOrders;