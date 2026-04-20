import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/doc 247 logo.png";

export default function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("docUser"));
  const [open,setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("docUser");
    navigate("/roleselect");
  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <Link to="/front" className="nav-logo">
        <img src={logo} alt="logo" />
      </Link>

      {/* MENU */}

      <div className="nav-menu">

        <Link to="/front">Home</Link>

        <Link to="/doctors">All Doctors</Link>

        <Link to="/myappointments">My Appointments</Link>

        <Link to="/about">About</Link>

      </div>

      {/* RIGHT SIDE */}

      <div className="nav-right">

        {!user ? (

          <Link to="/login/user" className="login-btn">
            Login
          </Link>

        ) : (

          <div className="user-menu">

            <div
              className="user-name"
              onClick={()=>setOpen(!open)}
            >
              👤 Hi, {user.name} ▼
            </div>

            {open && (

              <div className="dropdown">

                <p onClick={()=>navigate("/profile")}>
                  Profile
                </p>


                <p onClick={handleLogout}>
                  Logout
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>
  );
}
