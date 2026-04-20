import "./Docnav.css"; // reuse same CSS
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/doc 247 logo.png";

export default function AdminNav() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/roleselect");
  };

  // ✅ optional protection
  const admin = JSON.parse(localStorage.getItem("adminUser"));

  

  return (

    <nav className="docnav">

      {/* LOGO */}
      <Link to="/admindashboard" className="docnav-logo">
        <img src={logo} alt="logo" />
      </Link>

      {/* RIGHT SIDE */}
      <div className="docnav-right">

        <span className="docnav-name">
          👑 Hi, Admin
        </span>

        <button className="docnav-logout" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

