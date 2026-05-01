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
  if (!email || !password) {
    alert("Please fill all required fields");
    return;
  }

  if (isSignup && password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const url = isSignup
    ? "http://localhost:5000/signup"
    : "http://localhost:5000/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isSignup ? { email, phone, password } : { email, password }),
    });

    const data = await response.json();

    if (response.ok) {
  alert(data.message);
  localStorage.setItem("user", JSON.stringify(data.user || { email }));
  if (!isSignup) {
    navigate("/"); 
  }
  setEmail("");
  setPhone("");
  setPassword("");
  setConfirmPassword("");
} else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error. Make sure backend is running.");
  }
};

  return (
    <div className="overlay">
      <div className="popup">
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <div className="input-box">
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        {isSignup && (
        <div className="input-box">
        <input type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        )}
        <div className="input-box">
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        {isSignup && (
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="toggle-text" onClick={() => setIsSignup(!isSignup)} >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

export default Login;
