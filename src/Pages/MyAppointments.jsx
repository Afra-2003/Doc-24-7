import "./MyAppointments.css";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyAppointments() {
  const user = JSON.parse(localStorage.getItem("docUser"));

  const [appointments, setAppointments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    if (!user) return;

    const all = JSON.parse(localStorage.getItem("appointments")) || [];

    const myAppointments = all.filter((a) => a.userEmail === user.email);

    setAppointments(myAppointments);
  }, []);

  // ✅ CANCEL APPOINTMENT
  const cancelAppointment = (index) => {
    const updated = [...appointments];
    updated[index].status = "cancelled";
    setAppointments(updated);

    // USER STORAGE
    localStorage.setItem(
      `appointments_${user.email}`,
      JSON.stringify(updated)
    );

    // GLOBAL STORAGE
    const all = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAll = all.map((a) => {
      if (
        a.userEmail === user.email &&
        a.doctorEmail === updated[index].doctorEmail &&
        a.date === updated[index].date &&
        a.time === updated[index].time
      ) {
        return { ...a, status: "cancelled" };
      }
      return a;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAll));

    toast.success("Appointment cancelled");
  };

  // ✅ CLEAR APPOINTMENT (AFTER COMPLETION)
  const clearAppointment = (index) => {
    const updated = [...appointments];
    const removed = updated[index];

    updated.splice(index, 1);
    setAppointments(updated);

    // USER STORAGE
    localStorage.setItem(
      `appointments_${user.email}`,
      JSON.stringify(updated)
    );

    // GLOBAL STORAGE
    let all = JSON.parse(localStorage.getItem("appointments")) || [];

    const updatedAll = all.filter((a) => {
      return !(
        a.userEmail === removed.userEmail &&
        a.doctorEmail === removed.doctorEmail &&
        a.date === removed.date &&
        a.time === removed.time
      );
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAll));

    toast.success("Appointment cleared");
  };

  // ✅ OPEN EDIT
  const openEdit = (index) => {
    setEditIndex(index);
    setNewDate(appointments[index].date);

    let time = appointments[index].time;

    if (time.includes("PM") || time.includes("AM")) {
      let [t, ampm] = time.split(" ");
      let [h, m] = t.split(":");
      h = parseInt(h);

      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;

      setNewTime(`${h.toString().padStart(2, "0")}:${m}`);
    } else {
      setNewTime(time);
    }
  };

  // ✅ SAVE EDIT
  const saveEdit = () => {
    const updated = [...appointments];
    const oldAppointment = updated[editIndex];

    const [hour, minute] = newTime.split(":");
    let h = parseInt(hour);
    let ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    const formattedTime = `${h.toString().padStart(2, "0")}:${minute} ${ampm}`;

    // LOCAL STATE
    updated[editIndex] = {
      ...updated[editIndex],
      date: newDate,
      time: formattedTime,
      status: "edited",
    };
    setAppointments(updated);

    // USER STORAGE
    localStorage.setItem(
      `appointments_${user.email}`,
      JSON.stringify(updated)
    );

    // GLOBAL STORAGE
    const all = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAll = all.map((a) => {
      if (
        a.userEmail === user.email &&
        a.doctorEmail === oldAppointment.doctorEmail &&
        a.date === oldAppointment.date &&
        a.time === oldAppointment.time
      ) {
        return {
          ...a,
          date: newDate,
          time: formattedTime,
          status: "edited",
        };
      }
      return a;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAll));

    toast.success("Appointment edited successfully");
    setEditIndex(null);
  };

  return (
    <div>
      <Navbar />

      <div className="my-appointments">
        <h2>My Appointments</h2>

        {appointments.length === 0 && (
          <p className="empty">No appointments booked yet</p>
        )}

        {appointments.map((app, index) => (
          <div key={index} className="appointment-card">
            <img src={app.img} alt="doctor" />

            <div className="appointment-info">
              <h3>{app.doctor}</h3>
              <p>{app.spec}</p>
              <p>Date : {app.date}</p>
              <p>Time : {app.time}</p>

              <span className={`status ${app.status || "booked"}`}>
                {app.status === "cancelled" && "❌ Cancelled"}
                {app.status === "edited" && "✏ Edited"}
                {app.status === "accepted" && "✅ Accepted"}
                {app.status === "rejected" && "🚫 Rejected"}
                {app.status === "completed" && "✔ Completed"}
                {(!app.status || app.status === "booked") && "🟢 Pending"}
              </span>
            </div>

            <div className="appointment-actions">

              {/* ✅ COMPLETED → CLEAR */}
              {app.status === "completed" && (
                <button
                  className="clear"
                  onClick={() => clearAppointment(index)}
                >
                  Clear
                </button>
              )}

              {/* ✅ CANCELLED → LABEL */}
              {app.status === "cancelled" && (
                <button className="cancelled">
                  Appointment Cancelled
                </button>
              )}

              {/* ✅ NORMAL FLOW */}
              {app.status !== "completed" && app.status !== "cancelled" && (
                <>
                  {app.status !== "edited" && (
                    <button
                      className="edit"
                      onClick={() => openEdit(index)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="cancel"
                    onClick={() => cancelAppointment(index)}
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* ✅ EDIT MODAL */}
      {editIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Appointment</h3>

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={saveEdit} className="save">
                Save
              </button>

              <button
                onClick={() => setEditIndex(null)}
                className="close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
