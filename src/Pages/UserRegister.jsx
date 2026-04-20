import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import "./UserRegister.css";

export default function UserRegister(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
password:""
})

const handleRegister = ()=>{

let users = JSON.parse(localStorage.getItem("users")) || []

users.push(form)

localStorage.setItem("users",JSON.stringify(users))

toast.success("User registered successfully")

navigate("/login/user")

}

return(

<div className="register-page">

<div className="register-box">

<h2>User Registration</h2>

<input
placeholder="Username"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="Email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
placeholder="Phone"
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button onClick={handleRegister}>
Register
</button>

<p>

Already have an account?

<span onClick={()=>navigate("/login/user")}>
Login
</span>

</p>

</div>

</div>

)


}
