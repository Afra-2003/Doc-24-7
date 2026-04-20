import { useEffect, useState } from "react";
import "./Admin.css";

export default function ManageAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  return (
    <div>

      <h2 className="admin-dashboard-title">Appointments List</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="4">No appointments found</td>
            </tr>
          ) : (
            appointments.map((a, i) => (
              <tr key={i}>
                <td>{a.userName}</td>

                {/* ✅ FIXED DOCTOR NAME */}
                <td>{a.doctorName || a.doctor || a.doctorEmail}</td>

                <td>{a.date} | {a.time}</td>

                <td className={`admin-status-${a.status}`}>
                  {a.status}
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}
