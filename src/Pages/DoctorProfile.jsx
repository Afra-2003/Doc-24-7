import "./DoctorProfile.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import toast from "react-hot-toast";

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

export default function DoctorProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // ✅ GET USER
  const getUser = () => JSON.parse(localStorage.getItem("docUser"));
  const user = getUser();

  // ✅ DOCTORS LIST
  const doctors = [
    { id:1, name:"Dr. Richard James", email:"richard@doc247.com", spec:"General Physician", exp:"4 Years", fee:"$50", about:"General care specialist", img:doc1 },
    { id:2, name:"Dr. Emily Watson", email:"emily@doc247.com", spec:"Gynecologist", exp:"6 Years", fee:"$60", about:"Women's health expert", img:doc2 },
    { id:3, name:"Dr. David Lee", email:"david@doc247.com", spec:"Neurologist", exp:"7 Years", fee:"$80", about:"Neuro specialist", img:doc3 },
    { id:4, name:"Dr. Sarah Miller", email:"sarah@doc247.com", spec:"Dermatologist", exp:"5 Years", fee:"$55", about:"Skin expert", img:doc4 },
    { id:5, name:"Dr. John Carter", email:"john@doc247.com", spec:"Cardiologist", exp:"8 Years", fee:"$90", about:"Heart specialist", img:doc5 },
    { id:6, name:"Dr. Olivia Brown", email:"olivia@doc247.com", spec:"Pediatrician", exp:"3 Years", fee:"$45", about:"Child specialist", img:doc6 },
    { id:7, name:"Dr. Christopher Lee", email:"christopher@doc247.com", spec:"Cardiologist", exp:"3 Years", fee:"$45", about:"Heart specialist", img:doc7 },
    { id:8, name:"Dr. Amelia Hill", email:"amelia@doc247.com", spec:"Neurologist", exp:"7 Years", fee:"$70", about:"Neuro expert", img:doc8 },
    { id:9, name:"Dr. Jeffrey King", email:"jeffrey@doc247.com", spec:"Dermatologist", exp:"3 Years", fee:"$45", about:"Skin expert", img:doc9 },
    { id:10, name:"Dr. Ryan Martinez", email:"ryan@doc247.com", spec:"Pediatrician", exp:"3 Years", fee:"$45", about:"Child specialist", img:doc10 },
    { id:11, name:"Dr. Zoe Kelly", email:"zoe@doc247.com", spec:"Gynecologist", exp:"3 Years", fee:"$45", about:"Women specialist", img:doc11 },
    { id:12, name:"Dr. Andrew Williams", email:"andrew@doc247.com", spec:"General Physician", exp:"3 Years", fee:"$45", about:"General doctor", img:doc12 },
    { id:13, name:"Dr. Ava Mitchell", email:"ava@doc247.com", spec:"Dermatologist", exp:"3 Years", fee:"$45", about:"Skin doctor", img:doc13 },
    { id:14, name:"Dr. Timothy White", email:"timothy@doc247.com", spec:"Dermatologist", exp:"3 Years", fee:"$45", about:"Skin care", img:doc14 },
    { id:15, name:"Dr. Patrick Harris", email:"patrick@doc247.com", spec:"Cardiologist", exp:"3 Years", fee:"$45", about:"Heart care", img:doc15 }
  ];

  const doctor = doctors.find((doc) => doc.id === Number(id));

  if (!doctor) return <h2>Doctor not found</h2>;

  // ✅ TIME SLOTS
  const slots = [
    "03:30 PM","04:00 PM","04:30 PM",
    "05:00 PM","05:30 PM","06:00 PM",
    "06:30 PM","07:00 PM"
  ];

  // ✅ NEXT 7 DAYS
  const getNextDays = () => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);

      days.push({
        day: date.toLocaleString("en", { weekday: "short" }).toUpperCase(),
        date: date.getDate(),
        month: date.toLocaleString("en", { month: "short" }),
        year: date.getFullYear()
      });
    }
    return days;
  };

  const days = getNextDays();

  // ✅ FIXED TEMPLATE STRING
  const appointments =
    JSON.parse(localStorage.getItem(`appointments_${user?.email}`)) || [];

  // ✅ BOOK FUNCTION
  const handleBook = () => {

    const currentUser = getUser();

    if (!currentUser) {
      toast.error("Please login first");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    const selectedDate =
      `${days[selectedDay].day}-${days[selectedDay].date}-${days[selectedDay].month}-${days[selectedDay].year}`;

    const appointment = {
      doctor: doctor.name,
      doctorEmail: doctor.email,
      img: doctor.img,
      spec: doctor.spec,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhoto: currentUser.photo || "",
      date: selectedDate,
      time: selectedSlot,
      status: "booked"
    };

    // USER STORAGE
    const userKey = `appointments_${currentUser.email}`;
    const userAppointments =
      JSON.parse(localStorage.getItem(userKey)) || [];

    userAppointments.unshift(appointment);
    localStorage.setItem(userKey, JSON.stringify(userAppointments));

    // GLOBAL STORAGE
    const allAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    allAppointments.unshift(appointment);
    localStorage.setItem("appointments", JSON.stringify(allAppointments));

    toast.success("Appointment booked successfully");
    navigate("/myappointments");
  };

  return (
    <div>
      <Navbar />

      <div className="doctor-profile">

        {/* TOP */}
        <div className="doc-profile-top">
          <img src={doctor.img} alt="doctor" />

          <div className="doc-profile-info">
            <h2>
              {doctor.name} <span className="verified">✔</span>
            </h2>

            <p>
              MBBS - {doctor.spec}
              <span className="doc-exp">{doctor.exp}</span>
            </p>

            <h4>About :</h4>
            <p className="doc-about">{doctor.about}</p>

            <p className="doc-fee">
              Fee: <b>{doctor.fee}</b>
            </p>
          </div>
        </div>

        {/* BOOKING */}
        <div className="booking">
          <h3>Booking Slots</h3>

          {/* DAYS */}
          <div className="days">
            {days.map((d, index) => (
              <div
                key={index}
                className={selectedDay === index ? "day active" : "day"}
                onClick={() => setSelectedDay(index)}
              >
                <p>{d.day}</p>
                <h4>{d.date}</h4>
              </div>
            ))}
          </div>

          {/* SLOTS */}
          <div className="slots">
            {slots.map((slot, index) => {

              const selectedDate =
                `${days[selectedDay].day}-${days[selectedDay].date}-${days[selectedDay].month}-${days[selectedDay].year}`;

              const isBooked = appointments.some(
                (app) =>
                  app.doctor === doctor.name &&
                  app.date === selectedDate &&
                  app.time === slot
              );

              return (
                <button
                  key={index}
                  disabled={isBooked}
                  className={
                    selectedSlot === slot
                      ? "slot active"
                      : isBooked
                      ? "slot booked"
                      : "slot"
                  }
                  onClick={() => setSelectedSlot(slot)}
                >
                  {isBooked ? "Booked" : slot}
                </button>
              );
            })}
          </div>

          <button className="book-btn" onClick={handleBook}>
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
}
