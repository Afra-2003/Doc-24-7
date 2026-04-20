import "./Docnav.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/doc 247 logo.png";

export default function Docnav() {

  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("docUser"));

  const handleLogout = () => {
    localStorage.removeItem("docUser");
    navigate("/roleselect");
  };

  // ✅ PROTECTION (VERY IMPORTANT)
  if (!doctor) {
    return null; // prevents crash
  }

  return (

    <nav className="docnav">

      {/* LOGO */}
      <Link to="/doctordashboard" className="docnav-logo">
        <img src={logo} alt="logo" />
      </Link>

      {/* RIGHT SIDE */}
      <div className="docnav-right">

        <span className="docnav-name">
          👨‍⚕️ {doctor.name}
        </span>

        <button className="docnav-logout" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}
