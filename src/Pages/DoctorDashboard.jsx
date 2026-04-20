import { useEffect, useState } from "react";
import Docnav from "../Components/Docnav";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("appointments");

  const doctor = JSON.parse(localStorage.getItem("docUser"));

  // ✅ PROTECT
  if (!doctor || doctor.role !== "doctor") {
    return <h2 style={{ textAlign: "center" }}>Unauthorized Access</h2>;
  }

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("appointments")) || [];
    const myAppointments = all.filter((a) => a.doctorEmail === doctor.email);
    setAppointments(myAppointments);
  }, []);

  const updateStatus = (appointment, newStatus) => {
    // ✅ 1. UPDATE GLOBAL STORAGE
    let all = JSON.parse(localStorage.getItem("appointments")) || [];

    const updatedAll = all.map((a) => {
      if (
        a.userEmail === appointment.userEmail &&
        a.doctorEmail === appointment.doctorEmail &&
        a.date === appointment.date &&
        a.time === appointment.time
      ) {
        return { ...a, status: newStatus };
      }
      return a;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAll));

    // ✅ 2. UPDATE USER STORAGE
    const userKey = `appointments_${appointment.userEmail}`;

    let userAppointments = JSON.parse(localStorage.getItem(userKey)) || [];

    userAppointments = userAppointments.map((a) => {
      if (
        a.doctorEmail === appointment.doctorEmail &&
        a.date === appointment.date &&
        a.time === appointment.time
      ) {
        return { ...a, status: newStatus };
      }
      return a;
    });

    localStorage.setItem(userKey, JSON.stringify(userAppointments));

    // ✅ 3. REFRESH UI
    const myAppointments = updatedAll.filter(
      (a) => a.doctorEmail === doctor.email
    );
    setAppointments(myAppointments);
  };

  return (
    <div>
      <Docnav />

      <div className="dashboard">
        {/* SIDEBAR */}
        <div className="sidebar">
          {/* DOCTOR IMAGE */}
          <div className="doc-profile">
            <img src={doctor.img} alt="doctor" />
            <h3>{doctor.name}</h3>
            <p>{doctor.spec}</p>
          </div>

          {/* MENU */}
          <div className="doc-menu">
            <p
              className={tab === "appointments" ? "active" : ""}
              onClick={() => setTab("appointments")}
            >
              Appointments
            </p>

            <p
              className={tab === "profile" ? "active" : ""}
              onClick={() => setTab("profile")}
            >
              Profile
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {tab === "appointments" && (
            <>
              <h2>My Appointments</h2>

              {appointments.length === 0 ? (
                <p>No appointments</p>
              ) : (
                appointments.map((a, i) => (
                  <div key={i} className="card">
                    <img src={a.userPhoto || "https://i.imgur.com/HeIi0wU.png"} alt="user"/>


                    <div className="a-profile">
                      <h3>👩🏻‍💼{a.userName}</h3>
                      <p>📧 {a.userEmail}</p>
                      <p>📅 {a.date}</p>
                      <p>⏰ {a.time}</p>
                      

                      <span className={`status ${a.status || "booked"}`}>
                        {a.status === "booked" && "🟢 Pending"}
                        {a.status === "edited" && "✏ Edited"}
                        {a.status === "accepted" && "✅ Accepted"}
                        {a.status === "rejected" && "❌ Rejected"}
                        {a.status === "completed" && "✔ Completed"}
                        {a.status === "cancelled" && "❌ Cancelled"}
                      </span>

                      <div className="actions">
                        {(a.status === "booked" || a.status === "edited") && (
                          <>
                            <button
                              className="accept"
                              onClick={() => updateStatus(a, "accepted")}
                            >
                              Accept
                            </button>

                            <button
                              className="reject"
                              onClick={() => updateStatus(a, "rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {a.status === "accepted" && (
                          <button
                            className="complete"
                            onClick={() => updateStatus(a, "completed")}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {tab === "profile" && (
            <>
              <h2>My Profile</h2>
              <div className="profile-box1">
                <p>
                  <b>Name:</b> {doctor.name}
                </p>
                <p>
                  <b>Email:</b> {doctor.email}
                </p>
                <p>
                  <b>Specialization:</b> {doctor.spec}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
