import "./SearchDoctor.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchDoctor() {
  return (
    <div className="search-section">

      <h2>Find Doctors Near You</h2>

      <div className="search-box">

        <div className="search-input">
          <FaMapMarkerAlt />
          <input placeholder="Enter Location" />
        </div>

        <div className="search-input">
          <FaSearch />
          <input placeholder="Search Doctors, Clinics..." />
        </div>

        <button>Search</button>

      </div>
    </div>
  );
}
