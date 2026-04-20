import "./Services.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function Services() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    speciality: "",
    location: "",
    experience: "",
    fee: "",
    image: "",
  });

  const user = JSON.parse(localStorage.getItem("docUser"));
  const navigate = useNavigate();

  // Load doctors
  useEffect(() => {
    if (!user) navigate("/login");

    axios.get("http://localhost:5000/doctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  // ✅ Book appointment function
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
      status: "Booked",
    });

    alert("Appointment booked successfully!");
  };

  // Search filter
  const filteredDoctors = doctors.filter((d) =>
    d.speciality.toLowerCase().includes(search.toLowerCase())
  );

  // Input change
  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  // Submit doctor form
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    if (
      !newDoctor.name ||
      !newDoctor.speciality ||
      !newDoctor.location ||
      !newDoctor.experience ||
      !newDoctor.fee ||
      !newDoctor.image
    ) {
      alert("Please fill all fields!");
      return;
    }

    const res = await axios.post("http://localhost:5000/doctors", {
      ...newDoctor,
      fee: Number(newDoctor.fee),
    });

    // Update UI instantly
    setDoctors([...doctors, res.data]);

    // Reset form
    setNewDoctor({
      name: "",
      speciality: "",
      location: "",
      experience: "",
      fee: "",
      image: "",
    });

    setShowForm(false);
    alert("Doctor added successfully!");
  };

  return (
    <div className="services-page">
      <Navbar />

      <div className="services-container">
        <h1>Our Services</h1>
        <p className="sub">Search doctors and manage doctor list</p>

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

              {/* ✅ Book Appointment Button */}
              <button
                className="book-btn"
                onClick={() => handleBook(doctor)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Plus Button */}
      <button className="plus-btn" onClick={() => setShowForm(true)}>
        <FaPlus />
      </button>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <div className="popup-header">
              <h2>Add Doctor</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddDoctor}>
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={newDoctor.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="speciality"
                placeholder="Speciality"
                value={newDoctor.speciality}
                onChange={handleChange}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={newDoctor.location}
                onChange={handleChange}
              />

              <input
                type="text"
                name="experience"
                placeholder="Experience (example: 5 Years)"
                value={newDoctor.experience}
                onChange={handleChange}
              />

              <input
                type="number"
                name="fee"
                placeholder="Consultation Fee"
                value={newDoctor.fee}
                onChange={handleChange}
              />

              <input
                type="text"
                name="image"
                placeholder="Doctor Image URL"
                value={newDoctor.image}
                onChange={handleChange}
              />

              <button type="submit" className="submit-btn">
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
