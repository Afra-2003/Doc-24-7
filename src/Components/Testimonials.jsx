import { useState, useEffect } from "react";
import "./Testimonials.css";

export default function Testimonials() {

  const reviews = [
    {
      name: "Priya Sharma",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "Amazing service and very easy appointment booking. The doctors were very professional.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Rahul Kumar",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Great experience! I booked a consultation within minutes.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Sneha Patel",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "Highly recommended platform for healthcare appointments.",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(slider);

  }, []);

  return (
    <div className="testimonials">

      <h2>What Our Patients Say</h2>
      <p className="testimonial-sub">
        Trusted by thousands of patients across the country
      </p>

      <div className="testimonial-card">

        <img
          src={reviews[index].image}
          alt="profile"
          className="profile-img"
        />

        <p className="review-text">
          "{reviews[index].text}"
        </p>

        <div className="rating">
          {reviews[index].rating}
        </div>

        <h4 className="review-name">
          {reviews[index].name}
        </h4>

      </div>

    </div>
  );
}
