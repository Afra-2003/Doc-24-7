import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import toast from "react-hot-toast";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("docUser"));
    setUser(loggedUser);

    if (loggedUser) {
      const userAppointments =
        JSON.parse(localStorage.getItem(`appointments_${loggedUser.email}`)) || [];
      setAppointments(userAppointments);
    }
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // HANDLE PHOTO
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      setUser(updatedUser);
    };

    if (file) reader.readAsDataURL(file);
  };

  // SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("docUser", JSON.stringify(user));
    setEdit(false);
    toast.success("Profile updated successfully");
  };

  // NO USER LOGGED IN
  if (!user) {
    return <h2 style={{ textAlign: "center" }}>No user logged in</h2>;
  }

  // HELPER: Convert status to display text
  const getStatusLabel = (status) => {
    switch (status) {
      case "booked":
      case undefined:
        return "Pending";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      case "edited":
        return "Edited";
      default:
        return status;
    }
  };

  // HELPER: Map status to color class
  const getStatusClass = (status) => {
    switch (status) {
      case "booked":
      case undefined:
      case "accepted":
        return "status-green";
      case "rejected":
      case "cancelled":
        return "status-red";
      case "completed":
        return "status-blue";
      case "edited":
        return "status-yellow"; // optional for edited
      default:
        return "";
    }
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">

        {/* PROFILE CARD */}
        <div className="profile-card">
          <h2>My Profile</h2>

          <div className="profile-photo">
            <img
              src={user.photo || "https://i.imgur.com/HeIi0wU.png"}
              alt="profile"
            />
            {edit && <input type="file" onChange={handlePhoto} />}
          </div>

          <label>Name</label>
          <input
            name="name"
            value={user.name}
            disabled={!edit}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            value={user.email}
            disabled
          />

          <label>Phone</label>
          <input
            name="phone"
            value={user.phone || ""}
            disabled={!edit}
            onChange={handleChange}
          />

          {!edit ? (
            <button onClick={() => setEdit(true)}>Edit Profile</button>
          ) : (
            <button onClick={handleSave}>Save Changes</button>
          )}
        </div>

        {/* APPOINTMENT HISTORY */}
        <div className="history-container">
          <h2>Appointment History</h2>

          {appointments.length === 0 ? (
            <p>No Appointments Yet</p>
          ) : (
            appointments.map((a, index) => (
              <div className="history-card" key={index}>
                <img src={a.img} className="doc-img" alt="doctor" />

                <div className="history-info">
                  <h3>{a.doctor}</h3>
                  <p className="spec">{a.spec}</p>
                  <p className="date">📅 {a.date}</p>
                  <p className="time">⏰ {a.time}</p>
                  <p className={`status ${getStatusClass(a.status)}`}>
                    Status: {getStatusLabel(a.status)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
