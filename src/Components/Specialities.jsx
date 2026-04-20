import "./Specialities.css";
import {
  FaHeart,
  FaTooth,
  FaBrain,
  FaChild,
  FaFemale,
  FaAllergies
} from "react-icons/fa";

export default function Specialities() {

  const data = [
    { icon: <FaHeart />, name: "Cardiology" },
    { icon: <FaTooth />, name: "Dentistry" },
    { icon: <FaBrain />, name: "Neurology" },
    { icon: <FaChild />, name: "Pediatrics" },
    { icon: <FaFemale />, name: "Gynecology" },
    { icon: <FaAllergies />, name: "Dermatology" },

  ];

  return (
    <div className="specialities">

      <div className="specialities-header">
        <h2>Browse by Specialities</h2>
        <p>
          Find experienced doctors across all medical specialities
        </p>
      </div>

      <div className="speciality-grid">

        {data.map((item, index) => (
          <div className="speciality-card" key={index}>

            <div className="speciality-icon">
              {item.icon}
            </div>

            <h3>{item.name}</h3>

          </div>
        ))}

      </div>

    </div>
  );
}
