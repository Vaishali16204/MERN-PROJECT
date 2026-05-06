import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Payment Successful </h1>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;