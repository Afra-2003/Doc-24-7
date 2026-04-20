import { useEffect, useState, useRef } from "react";
import "./Stats.css";
import { FaUserInjured, FaUserMd, FaCalendarCheck, FaAmbulance } from "react-icons/fa";

export default function Stats() {

  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);

  const statsRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;

          let p = 0, d = 0, a = 0;

          const interval = setInterval(() => {

            let done = true;

            if (p < 10000) {
              p += 200;
              setPatients(p);
              done = false;
            }

            if (d < 150) {
              d += 3;
              setDoctors(d);
              done = false;
            }

            if (a < 20000) {
              a += 400;
              setAppointments(a);
              done = false;
            }

            if (done) clearInterval(interval);

          }, 50);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();

  }, []);

  return (
    <div className="stats" ref={statsRef}>

      <div className="stat-card">
        <FaUserInjured className="icon" />
        <h2>{patients}+</h2>
        <p>Happy Patients</p>
      </div>

      <div className="stat-card">
        <FaUserMd className="icon" />
        <h2>{doctors}+</h2>
        <p>Expert Doctors</p>
      </div>

      <div className="stat-card">
        <FaCalendarCheck className="icon" />
        <h2>{appointments}+</h2>
        <p>Appointments Booked</p>
      </div>

      <div className="stat-card">
        <FaAmbulance className="icon" />
        <h2>24/7</h2>
        <p>Emergency Service</p>
      </div>

    </div>
  );
}
