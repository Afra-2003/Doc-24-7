import { useEffect, useState } from "react";
import "./Admin.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    setStats({
      users: users.length,
      doctors: doctors.length,
      appointments: appointments.length
    });
  }, []);

  // ✅ Pie chart data
  const data = {
    labels: ["Users", "Doctors", "Appointments"],
    datasets: [
      {
        data: [stats.users, stats.doctors, stats.appointments],
        backgroundColor: [
          "#3a86ff",
          "#22c55e",
          "#f59e0b"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>

      <h2 className="admin-dashboard-title">Dashboard</h2>

      {/* CARDS */}
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="admin-card">
          <h3>Doctors</h3>
          <p>{stats.doctors}</p>
        </div>

        <div className="admin-card">
          <h3>Appointments</h3>
          <p>{stats.appointments}</p>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="admin-chart">
        <h3>System Overview</h3>
        <div style={{ width: "300px", margin: "auto" }}>
          <Pie data={data} />
        </div>
      </div>

    </div>
  );
}
