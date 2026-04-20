import "./TopDoctors.css";
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";
import doc3 from "../assets/doc3.png";
import doc4 from "../assets/doc4.png";

export default function TopDoctors() {
  return (
    <div className="top-doctors">
      <h2>Top Doctors</h2>

      <div className="top-doctor-grid">

        <div className="top-doctor-card">
          <img src={doc1} alt="doctor" />
          <h3>Dr. John</h3>
          <p>Cardiologist</p>
        </div>

      <div className="top-doctor-card">
        <img src={doc2} alt="doctor" />
        <h3>Dr. Sarah</h3>
        <p>Dentist</p>
      </div>

      <div className="top-doctor-card">
        <img src={doc3} alt="doctor" />
        <h3>Dr. David</h3>
        <p>Neurologist</p>
      </div>

      <div className="top-doctor-card">
        <img src={doc4} alt="doctor" />
        <h3>Dr. Emily</h3>
        <p>Pediatrician</p>
      </div>


      </div>
    </div>
  );
}
