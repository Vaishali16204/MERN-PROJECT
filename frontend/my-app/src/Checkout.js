
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQty = cart.reduce(
    (sum, item) => sum + (item.qty || item.quantity || 1),
    0
  );

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * (item.qty || item.quantity || 1),
    0
  );

  const subtotal = total / 1.18;
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const gst = cgst + sgst;
  const finalTotal = total;

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (
      !form.email ||
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Fill all fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Enter valid email");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Enter valid 6-digit pincode");
      return;
    }

    if (form.payment === "COD") {
      await fetch(`${process.env.REACT_APP_API_URL}/save-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          subtotal,
          gst,
          cgst,
          sgst,
          finalTotal,
          totalQty,
          user: form,
          paymentMethod: "COD",
        }),
      });

      alert("Order placed successfully");
      localStorage.removeItem("cart");
      navigate("/");
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/create-razorpay-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      }
    );

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const data = await res.json();

    const options = {
      key: "rzp_test_SYuYScG890W7qQ",
      amount: data.amount,
      currency: "INR",
      order_id: data.id,
      name: "Store",
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#d83dd8" },

      handler: async function (response) {
        await fetch(`${process.env.REACT_APP_API_URL}/save-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart,
            subtotal,
            gst,
            cgst,
            sgst,
            finalTotal,
            totalQty,
            user: form,
            paymentMethod: "UPI",
            paymentId: response.razorpay_payment_id,
          }),
        });

        localStorage.removeItem("cart");
        alert("Payment successful");
        navigate("/");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Checkout</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />

        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={form.payment === "COD"}
            onChange={handleChange}
          />
          COD
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={form.payment === "UPI"}
            onChange={handleChange}
          />
          UPI
        </label>

        <button
          className="place-order-btn"
          onClick={handleCheckout}
        >
          Place Order
        </button>
      </div>

      <div className="checkout-right">
        {cart.map((item, i) => (
          <div className="checkout-item" key={i}>
            <img
              src={`http://localhost:5000/uploads/${item.image
                .split("/")
                .pop()}`}
              alt={item.name}
            />

            <div className="checkout-item-details">
              <p>{item.name}</p>
              <p>Qty: {item.qty || item.quantity || 1}</p>
              <p>
                ₹{item.price} × {item.qty || item.quantity || 1}
              </p>
            </div>
          </div>
        ))}

        <div className="summary-box">
          <div className="summary-row">
            <span>Total Items</span>
            <span>{totalQty}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>CGST (9%)</span>
            <span>₹{cgst.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>SGST (9%)</span>
            <span>₹{sgst.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
