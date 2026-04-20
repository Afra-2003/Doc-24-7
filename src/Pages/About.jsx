import "./about.css";
import Navbar from "../Components/Navbar";

export default function About() {
  return (
    <>
      {/* ✅ Navbar outside */}
      <Navbar />

      <div className="about-container">

        <h1>About Doc24/7</h1>

        <p className="about-intro">
          Doc24/7 is a modern doctor appointment booking system designed to make
          healthcare access simple, fast, and efficient for everyone.
        </p>

        {/* MISSION */}
        <div className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>
            To provide a seamless platform where patients can easily book
            appointments with doctors anytime, anywhere.
          </p>
        </div>

        {/* FEATURES */}
        <div className="about-section">
          <h2>⚙️ Features</h2>
          <ul>
            <li>📅 Easy appointment booking</li>
            <li>👨‍⚕️ Doctor dashboard to manage patients</li>
            <li>👤 User profile & appointment tracking</li>
            <li>🛠️ Admin panel to manage system</li>
          </ul>
        </div>

        {/* USERS */}
        <div className="about-section">
          <h2>👥 Who Can Use?</h2>
          <p>
            This system is designed for Patients, Doctors, and Admins to manage
            healthcare services efficiently.
          </p>
        </div>

        {/* DEVELOPER */}
        <div className="about-section">
          <h2>💡 Developed By</h2>
          <p>
            This project is developed as a full-stack healthcare solution using
            modern web technologies.
          </p>
        </div>

      </div>
    </>
  );
}
