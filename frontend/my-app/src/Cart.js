import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1), 0);

  const totalQty = cart.reduce( (sum, item) => sum + (item.qty || 1),0);

  const handleProceed = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={"http://localhost:5000/uploads/" + item.image}alt="" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div>
                  <button onClick={() => decreaseQty(index)}>-</button>
                  <span> {item.qty || 1} </span>
                  <button onClick={() => increaseQty(index)}>+</button>
                </div>
                <button onClick={() => removeItem(index)}>Remove </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-right">
        <h3>Price Summary</h3>
        <p>Total Items: {totalQty}</p>
        <h2>Total: ₹{total}</h2>
        <button className="checkout-btn"onClick={handleProceed}disabled={cart.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;