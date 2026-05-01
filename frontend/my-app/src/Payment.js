import React from "react";
import { useLocation } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const placeOrder = async () => {
    await fetch("${process.env.REACT_APP_API_URL}/create-order", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({ cart, total, totalQty })
    });
    alert("Order placed successfully");
    localStorage.removeItem("cart");
  };

 return (
    <div>
      <h2>Payment Page</h2>
      <button onClick={placeOrder}>Pay & Place Order</button>
    </div>
  );
}

export default Payment;