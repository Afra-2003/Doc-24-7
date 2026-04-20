import "./RoleSelect.css";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {

  const navigate = useNavigate();

  return (

    <div className="roleselect-page">

      <h1>Select Your Role</h1>
      <p>Choose how you want to continue</p>

      <div className="roleselect-container">

        <div
          className="roleselect-card roleselect-user"
          onClick={() => navigate("/login/user")}
        >
          <h2>User</h2>
          <p>Book appointments with doctors</p>
        </div>

        <div
          className="roleselect-card roleselect-doctor"
          onClick={() => navigate("/login/doctor")}
        >
          <h2>Doctor</h2>
          <p>Manage appointments and patients</p>
        </div>

        <div
          className="roleselect-card roleselect-admin"
          onClick={() => navigate("/login/admin")}
        >
          <h2>Admin</h2>
          <p>Manage doctors and analytics</p>
        </div>

      </div>

    </div>

  );
}
