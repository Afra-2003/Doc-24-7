import { BrowserRouter, Routes, Route } from "react-router-dom";

import Front from "./Pages/Front";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import AllDoctors from "./Pages/AllDoctors";
import DoctorProfile from "./Pages/DoctorProfile";
import MyAppointments from "./Pages/MyAppointments";

import Splash from "./Pages/Splash";
import RoleSelect from "./Pages/RoleSelect";
import UserRegister from "./Pages/UserRegister";

import DoctorDashboard from "./Pages/DoctorDashboard";

import AdminDashboard from "./Pages/AdminDashboard";
import AdminLayout from "./Pages/AdminLayout";
import ManageDoctors from "./Pages/ManageDoctors";
import Profile from "./Pages/Profile";

import ProtectedRoute from "./Components/ProtectedRoute";
import ManageAppointments from "./Pages/ManageAppointments";
import ManageUsers from "./Pages/ManageUsers";
import About from "./Pages/About";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH FLOW */}
        <Route path="/" element={<Splash />} />
        <Route path="/roleselect" element={<RoleSelect />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/about" element={<About />} />

        {/* ❌ REMOVE DOCTOR REGISTER */}
        {/* <Route path="/doctorregister" element={<DoctorRegister />} /> */}

        {/* 🔐 PROTECTED ROUTES */}

        <Route
          path="/doctordashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admindashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />

  <Route path="users" element={<ManageUsers />} />
  <Route path="doctors" element={<ManageDoctors />} />
  <Route path="appointments" element={<ManageAppointments />} />

</Route>


        <Route
          path="/myappointments"
          element={
            <ProtectedRoute role="user">
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* NORMAL ROUTES */}
        <Route path="/front" element={<Front />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        
      </Routes>
    </BrowserRouter>
  );
}
