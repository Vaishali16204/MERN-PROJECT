import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-left">
          <h1>
            CURIOSITY <span>looks</span>
            <br />
            GOOD ON YOU.
          </h1>
        </div>

        <div className="footer-right">
          <h2>
            Be the <span>FIRST</span> to know!
          </h2>
          <p>
            Get early drops, insider science & offers that feel like magic.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>›</button>
          </div>

          <div className="footer-links">
            <div>
              <h3>Shop</h3>
              <p>Skincare</p>
              <p>Bodycare</p>
              <p>Haircare</p>
              <p>Fragrances</p>
            </div>

            <div>
              <h3>Learn</h3>
              <p>About Us</p>
              <p>Blogs</p>
              <p>Loyalty Program</p>
            </div>

            <div>
              <h3>Help</h3>
              <p>FAQs</p>
              <p>Contact Us</p>
            </div>
          </div>

          <div className="footer-contact">
            <h2>GET IN TOUCH</h2>
            <div className="social-icons">
              <a href="tel:+919876543210">📞CONTACT</a>
             <a href="mailto:support@plumclone.com">✉️EMAIL</a> 
             <a href="https://www.youtube.com/@plumgoodness" target="_blank">▶️YOUTUBE</a>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Plum Goodness Clone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;