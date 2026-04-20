import "./Home.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("docUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");

    axios.get("http://localhost:5000/doctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const handleBook = async (doctor) => {
    const date = prompt("Enter date (YYYY-MM-DD)");
    const time = prompt("Enter time (example: 10:30 AM)");

    if (!date || !time) return;

    await axios.post("http://localhost:5000/appointments", {
      userId: user.id,
      userName: user.fullName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      date,
      time,
      status: "Booked"
    });

    alert("Appointment booked successfully!");
  };

  const filteredDoctors = doctors.filter((d) =>
    d.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar />

      <div className="home-container">
        <h1>Find Your Doctor</h1>
        <p className="sub">Search doctors and book appointment easily</p>

        <input
          className="search"
          type="text"
          placeholder="Search by speciality (Cardiologist, Dermatologist...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="doctor-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} />
              <h3>{doctor.name}</h3>
              <p>{doctor.speciality}</p>
              <p>{doctor.location}</p>
              <p>{doctor.experience}</p>
              <p className="fee">₹{doctor.fee}</p>

              <button className="book-btn" onClick={() => handleBook(doctor)}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
