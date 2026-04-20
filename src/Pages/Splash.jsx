import "./Splash.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/Appointment-Booking-App.jpg"

export default function Splash(){

const navigate = useNavigate()

useEffect(()=>{
const timer = setTimeout(()=>{
navigate("/roleselect")
},3000)

return ()=>clearTimeout(timer)

},[navigate])


return(

<div className="splash">

<div className="splash-content">

<img src={logo} alt="logo" className="splash-logo"/>

<h1>Doctor Appointment System</h1>

<p>Book appointments with trusted doctors</p>

<div className="loader"></div>

</div>

</div>

)

}