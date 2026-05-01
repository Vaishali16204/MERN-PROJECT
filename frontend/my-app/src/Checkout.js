import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.qty || 1),0);
  const gst = cart.reduce((sum, item) =>  sum +((Number(item.price) * (item.qty || 1) * (item.gstRate || 18)) / 100),0);
  const cgst = gst / 2;
  const sgst = gst / 2;
  const finalTotal = total + gst;
  const [form, setForm] = useState({email: "",name: "",phone: "",address: "",city: "",state: "",pincode: "",payment: "COD", });
  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value });};

  const handleCheckout = async () => {
    if ( !form.email || !form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      alert("Fill all fields");
      return;
    }
    if (form.payment === "COD") {
      await fetch("${process.env.REACT_APP_API_URL}/save-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cart,total,gst,cgst,sgst,finalTotal,totalQty,user: form,paymentMethod: "COD",}),
      });
      alert("Order placed");
      localStorage.removeItem("cart");
      navigate("/");
      return;
    }
  console.log("Sending amount:", finalTotal);
  const res = await fetch("${process.env.REACT_APP_API_URL}/create-razorpay-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      }
    );
  if (!window.Razorpay) {
  alert("Razorpay SDK failed to load. Check internet connection.");
  return;
}

  const data = await res.json();
  const options = { key: "rzp_test_SYuYScG890W7qQ", amount: data.amount, currency: "INR", order_id: data.id, name: "Store",
   prefill: {name: form.name,email: form.email,contact: form.phone,},
   theme: { color: "#d83dd8" },
   handler: async function (response) {
        await fetch("${process.env.REACT_APP_API_URL}/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({cart,total,gst,cgst,sgst,finalTotal,totalQty,user: form,paymentMethod: "UPI",paymentId: response.razorpay_payment_id, }),
        });
        localStorage.removeItem("cart");
        navigate("/");
      },
    };

  const rzp = new window.Razorpay(options);rzp.open();
};

return (
  <div className="checkout-container">
  <div className="checkout-left">
  <h2>Checkout</h2>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />

        <label><input type="radio" name="payment" value="COD" checked={form.payment === "COD"} onChange={handleChange}/>COD</label>
        <label><input type="radio"name="payment"value="UPI"checked={form.payment === "UPI"}onChange={handleChange}/>UPI</label>

        <button className="place-order-btn" onClick={handleCheckout}>Place Order</button>
      </div>

      <div className="checkout-right">
        {cart.map((item, i) => (
          <div className="checkout-item" key={i}>
            <img src={`http://localhost:5000/uploads/${item.image}`}alt={item.name} />
            <div className="checkout-item-details">
              <p>{item.name}</p>
              <p>Qty: {item.qty || 1}</p>
              <p>₹{item.price} × {item.qty || 1}</p>
            </div>
          </div>
        ))}

        <div className="summary-box">
          <div className="summary-row"><span>Total Items</span><span>{totalQty}</span></div>
          <div className="summary-row"><span>Subtotal</span> <span>₹{total}</span></div>
          <div className="summary-row"><span>CGST (9%)</span><span>₹{cgst.toFixed(2)}</span></div>
          <div className="summary-row"><span>SGST (9%)</span><span>₹{sgst.toFixed(2)}</span>  </div>
          <hr />
          <div className="summary-total"> <span>Total</span> <span>₹{finalTotal.toFixed(2)}</span></div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;