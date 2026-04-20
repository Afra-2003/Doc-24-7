import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {

  const { role } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // ================= ADMIN LOGIN =================
    if (role === "admin") {

      if (email === "admin@gmail.com" && password === "admin123") {

        localStorage.setItem("docUser", JSON.stringify({
          email,
          role: "admin"
        }));

        toast.success("Admin login successful");
        navigate("/admindashboard");

      } else {
        toast.error("Invalid admin credentials");
      }

      return;
    }

    // ================= USER LOGIN =================
    if (role === "user") {

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (validUser) {

        localStorage.setItem("docUser", JSON.stringify({
          ...validUser,
          role: "user"
        }));

        toast.success("Login successful");
        navigate("/front");

      } else {
        toast.error("Invalid credentials");
      }

      return;
    }

    // ================= DOCTOR LOGIN =================
    if (role === "doctor") {

      const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

      const validDoctor = doctors.find(
        (d) => d.email === email && d.password === password
      );

      if (validDoctor) {

        localStorage.setItem("docUser", JSON.stringify({
          ...validDoctor,
          role: "doctor"
        }));

        toast.success("Doctor login successful");
        navigate("/doctordashboard");

      } else {
        toast.error("Invalid credentials");
      }

      return;
    }

  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h2>
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {/* ONLY USER CAN REGISTER */}
        {role === "user" && (
          <p className="signup-text">
            Don't have an account?
            <span onClick={() => navigate("/userregister")}>
              Signup
            </span>
          </p>
        )}

      </div>

    </div>
  );
}
