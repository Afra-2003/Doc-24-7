import "./Front.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import heroo from "../assets/herooo.png"

import TopDoctors from "../Components/TopDoctors";
import Footer from "../Components/Footer";
import WhyChoose from "../Components/WhyChoose";
import Testimonials from "../Components/Testimonials";
import Specialities from "../Components/Specialities";
import Stats from "../Components/Stats";


export default function Front() {
  const navigate = useNavigate();

  return (
    <div className="front">
      <Navbar />

      <div className="front-hero">
        <div className="front-left">
          <h1>
            Welcome to <span>Doc 24/7 !!!</span>
          </h1>
          <h1>
            Find a <span>Doctor</span> And Book An <span>Appointment</span>
          </h1>

          <p>
            We are a team of 50+ Expert Doctors with 24/7 Service, 200+ beds,
            Home appointment and Video consultation
          </p>

          <div className="front-btns">
            <button className="front-btn" onClick={() => navigate("/doctors")}>
              Book Appointment 
            </button>

          </div>
        </div>

        <div className="front-right">
          <img src={heroo} alt="homeimage" className="home-img" />
        </div>
      </div>

      {/* ADD THESE SECTIONS BELOW */}
      {/* <Services /> */}
      <Specialities/>
      <TopDoctors />
      <WhyChoose/>
      <Stats/>
      <Testimonials/>
      <Footer />
    </div>
  );
}
