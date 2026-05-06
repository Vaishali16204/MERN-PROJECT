import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (!email || !password || (isSignup && !phone)) {
      alert("Please fill all required fields");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // API URL
    const url = isSignup
      ? `${process.env.REACT_APP_API_URL}/signup`
      : `${process.env.REACT_APP_API_URL}/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isSignup
            ? { email, phone, password }
            : { email, password }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user || { email })
        );

        // Clear form
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        // Navigate after login/signup
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Make sure backend is running.");
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        {/* Email */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone for signup */}
        {isSignup && (
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}

        {/* Password */}
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        {isSignup && (
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Toggle */}
        <p
          className="toggle-text"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

export default Login;