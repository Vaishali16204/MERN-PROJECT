import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = async () => {
    try {
      if (user && user._id) {
        await fetch("http://localhost:5000/logout/" + user._id, {
          method: "PUT",
        });
      }
    } catch (error) {
      console.log("Logout error:", error);
    }

    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {if (!user) {navigate("/login");return;}
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => {
        const currentUser = users.find((u) => u._id === user._id);
        if (!currentUser) {
          alert("Your account no longer exists");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        if (currentUser.status === "Blocked") {
          alert("Your account has been blocked by admin");
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => console.log("User fetch error:", err));
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        const userOrders = data.filter(
          (order) =>
            order.user &&
            order.user.email &&
            order.user.email === user.email
        );
        setOrders(userOrders);
      })
      .catch((err) => console.log("Order fetch error:", err));
  }, [navigate, user]);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please login first</h2>
        <button onClick={() => navigate("/login")} className="logout-btn">  Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-box">
        <h3>Email: {user.email}</h3>
        <button onClick={handleLogout} className="logout-btn" >  Logout </button>
      </div>

      <h2 className="order-title">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p> ) : (
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item Name</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

          <tbody>
            {orders.map((order, index) => (
            <tr key={index}>
              <td>{order._id}</td>
              <td> {order.items && order.items.length > 0 ? order.items.map((item) => item.name).join(", ")  : "No items"}</td>
              <td>₹{order.total}</td>
              <td className={order.status &&order.status.toLowerCase() === "delivered"?"delivered":"pending"}>{order.status || "Placed"}</td>
              <td> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</td>
           </tr>
          ))}
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Profile;

