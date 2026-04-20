import "./AllDoctors.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// images
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";
import doc3 from "../assets/doc3.png";
import doc4 from "../assets/doc4.png";
import doc5 from "../assets/doc5.png";
import doc6 from "../assets/doc6.png";
import doc7 from "../assets/doc7.png";
import doc8 from "../assets/doc8.png";
import doc9 from "../assets/doc9.png";
import doc10 from "../assets/doc10.png";
import doc11 from "../assets/doc11.png";
import doc12 from "../assets/doc12.png";
import doc13 from "../assets/doc13.png";
import doc14 from "../assets/doc14.png";
import doc15 from "../assets/doc15.png";

export default function AllDoctors() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    const storedDoctors = JSON.parse(localStorage.getItem("doctors"));

    if (storedDoctors && storedDoctors.length > 0) {
      setDoctors(storedDoctors);
    } else {

      // default doctors (first time only)
      const defaultDoctors = [
  {
    id:1,
    name:"Dr. Richard James",
    spec:"General Physician",
    exp:"4 Years",
    fee:"₹500",
    rating:"4.8",
    img:doc1,
    email:"richard@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:2,
    name:"Dr. Emily Watson",
    spec:"Gynecologist",
    exp:"6 Years",
    fee:"₹600",
    rating:"4.7",
    img:doc2,
    email:"emily@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:3,
    name:"Dr. David Lee",
    spec:"Neurologist",
    exp:"7 Years",
    fee:"₹800",
    rating:"4.9",
    img:doc3,
    email:"david@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:4,
    name:"Dr. Sarah Miller",
    spec:"Dermatologist",
    exp:"5 Years",
    fee:"₹550",
    rating:"4.6",
    img:doc4,
    email:"sarah@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:5,
    name:"Dr. John Carter",
    spec:"Cardiologist",
    exp:"8 Years",
    fee:"₹900",
    rating:"4.9",
    img:doc5,
    email:"john@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:6,
    name:"Dr. Olivia Brown",
    spec:"Pediatrician",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc6,
    email:"olivia@doc247.com",
    password:"doc123",
    status:"Pending"
  },
  {
    id:7,
    name:"Dr. Christopher Lee",
    spec:"Cardiologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc7,
    email:"christopher@doc247.com",
    password:"doc123",
    status:"Pending"
  },
  {
    id:8,
    name:"Dr. Amelia Hill",
    spec:"Neurologist",
    exp:"7 Years",
    fee:"₹700",
    rating:"4.5",
    img:doc8,
    email:"amelia@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:9,
    name:"Dr. Jeffrey King",
    spec:"Dermatologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc9,
    email:"jeffrey@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:10,
    name:"Dr. Ryan Martinez",
    spec:"Pediatrician",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc10,
    email:"ryan@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:11,
    name:"Dr. Zoe Kelly",
    spec:"Gynecologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc11,
    email:"zoe@doc247.com",
    password:"doc123",
    status:"Pending"
  },
  {
    id:12,
    name:"Dr. Andrew Williams",
    spec:"General Physician",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc12,
    email:"andrew@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:13,
    name:"Dr. Ava Mitchell",
    spec:"Dermatologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc13,
    email:"ava@doc247.com",
    password:"doc123",
    status:"Approved"
  },
  {
    id:14,
    name:"Dr. Timothy White",
    spec:"Dermatologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc14,
    email:"timothy@doc247.com",
    password:"doc123",
    status:"Pending"
  },
  {
    id:15,
    name:"Dr. Patrick Harris",
    spec:"Cardiologist",
    exp:"3 Years",
    fee:"₹450",
    rating:"4.7",
    img:doc15,
    email:"patrick@doc247.com",
    password:"doc123",
    status:"Approved"
  }
];


      setDoctors(defaultDoctors);
      localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
    }

  }, []);

  const filteredDoctors = doctors.filter((doc) =>
  (doc.status === "Approved" || !doc.status) &&   // 🔥 FIX
  (filter === "All" || doc.spec === filter) &&
  doc.name.toLowerCase().includes(search.toLowerCase())
);



  return (
    <div>

      <Navbar />

      <div className="all-doctors-page">

        {/* LEFT FILTER */}
        <div className="filter">
          <h3>Specialization</h3>

          <p onClick={() => setFilter("All")}>All Doctors</p>
          <p onClick={() => setFilter("General Physician")}>General Physician</p>
          <p onClick={() => setFilter("Gynecologist")}>Gynecologist</p>
          <p onClick={() => setFilter("Dermatologist")}>Dermatologist</p>
          <p onClick={() => setFilter("Pediatrician")}>Pediatrician</p>
          <p onClick={() => setFilter("Neurologist")}>Neurologist</p>
          <p onClick={() => setFilter("Cardiologist")}>Cardiologist</p>
        </div>

        {/* RIGHT */}
        <div className="all-doctor-content">

          <input
            type="text"
            placeholder="Search doctor..."
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="all-doctor-grid">

            {filteredDoctors.map((doc) => (

              <div
                key={doc.id}
                className="all-doctor-card"
                onClick={() => navigate(`/doctors/${doc.id}`)}
              >

                <img src={doc.img} alt="doctor" />

                <div className="doctor-info">

                  <p className="available">● Available Today</p>

                  <h3>{doc.name}</h3>

                  <p className="spec">{doc.spec}</p>

                  <p className="exp">{doc.exp} Experience</p>

                  <div className="doctor-bottom">
                    <span className="rating">⭐ {doc.rating}</span>
                    <span className="fee">{doc.fee}</span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
