import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";
import AdminNav from "../Components/AdminNav";

export default function AdminLayout() {
  return (
    <div className="admin-main-wrapper">

      {/* ✅ FULL WIDTH NAVBAR */}
      <AdminNav />

      {/* ✅ BELOW NAVBAR */}
      <div className="admin-layout-wrapper">

        <AdminSidebar />

        <div className="admin-content-area">
          <Outlet />
        </div>

      </div>

    </div>
  );
}
