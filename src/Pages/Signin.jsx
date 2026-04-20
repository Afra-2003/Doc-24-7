import "./Signin.css";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.email || !user.password || !user.confirmPassword)
      return setErr("All fields are required!");

    if (user.password !== user.confirmPassword)
      return setErr("Password and Confirm Password must match!");

    try {
      const check = await axios.get(
        `http://localhost:5000/users?email=${user.email}`
      );

      if (check.data.length > 0) return setErr("Email already exists!");

      await axios.post("http://localhost:5000/users", {
        fullName: user.fullName,
        email: user.email,
        password: user.password
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      setErr("Server error. Please try again!");
    }
  };

  return (
    <div className="signup-page">
      <Navbar />

      <div className="signup-box">
        <form className="signup-card" onSubmit={handleSignup}>
          <h2>Create Your Account</h2>
          <p className="sub">Join Doc 24/7</p>

          {err && <p className="error">{err}</p>}

          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />

          <button className="btn-full">Sign Up</button>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
