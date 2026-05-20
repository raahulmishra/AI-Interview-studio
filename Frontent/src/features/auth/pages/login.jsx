import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "../login.scss";
import { useAuth } from "../hooks/useAuth.js";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading ,handleLogin} = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await handleLogin({ email, password });
    navigate("/");
  } catch (err) {
    console.log("Login failed");
  }
};

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">AI Resume Builder</h2>
        <p className="login__subtitle">Login to continue</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
            required
          />

          <button type="submit" className="login__button">
            Login
          </button>
        </form>

        <p className="login__footer">
          Don’t have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}