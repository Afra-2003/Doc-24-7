import "./WhyChoose.css";
import { FaUserMd, FaClock, FaVideo, FaShieldAlt } from "react-icons/fa";

export default function WhyChoose(){
return(

<div className="why">

<h2>Why Choose Doc 24/7</h2>

<div className="why-grid">

<div className="why-card">
<FaUserMd className="icon"/>
<h3>Expert Doctors</h3>
<p>Top certified medical professionals</p>
</div>

<div className="why-card">
<FaClock className="icon"/>
<h3>24/7 Service</h3>
<p>Doctors available anytime</p>
</div>

<div className="why-card">
<FaVideo className="icon"/>
<h3>Video Consultation</h3>
<p>Consult from home</p>
</div>

<div className="why-card">
<FaShieldAlt className="icon"/>
<h3>Secure Booking</h3>
<p>Safe and secure appointments</p>
</div>

</div>

</div>

)
}
