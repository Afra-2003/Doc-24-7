import { Link, useLocation } from "react-router-dom";
import "./Admin.css";

export default function AdminSidebar() {

  const location = useLocation();

  // 🎯 RANDOM ADMIN IMAGE
  const images = [
  
  "https://img.freepik.com/free-vector/hospital-management-concept-illustration_114360-2784.jpg",
  "https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-1638.jpg"
];


  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="admin-sidebar">

      {/* IMAGE + TITLE */}
      <div className="admin-profile">
        <img src={randomImage} alt="admin" />
        <h3>Admin Panel</h3>
        <p>Manage System</p>
      </div>

      {/* MENU */}
      <div className="admin-menu">

        <Link
          to="/admindashboard"
          className={location.pathname === "/admindashboard" ? "active" : ""}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admindashboard/users"
          className={location.pathname === "/admindashboard/users" ? "active" : ""}
        >
          👤 Users
        </Link>

        <Link
          to="/admindashboard/doctors"
          className={location.pathname === "/admindashboard/doctors" ? "active" : ""}
        >
          👨‍⚕️ Doctors
        </Link>

        <Link
          to="/admindashboard/appointments"
          className={location.pathname === "/admindashboard/appointments" ? "active" : ""}
        >
          📅 Appointments
        </Link>

      </div>

    </div>
  );
}
