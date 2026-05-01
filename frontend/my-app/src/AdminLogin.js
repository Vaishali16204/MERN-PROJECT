import React, { useState } from "react";
import "./App.css";

function AdminLogin() {
const [password, setPassword] = useState("");
  const handleAdminLogin = () => {
    const adminPassword = "admin123";
    if (password === adminPassword) {
      alert("Admin Login Successful ");
      window.location.href = "/admin-dashboard";
    } 
    else {
      alert("Wrong Admin Password ");
    }
  };
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Admin Login</h2>
        <div className="input-box">
        <input type="password" placeholder="Enter Admin Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className="submit-btn" onClick={handleAdminLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;