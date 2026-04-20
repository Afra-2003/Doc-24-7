import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  const user = JSON.parse(localStorage.getItem("docUser"));

  // not logged in
  if (!user) {
    return <Navigate to="/login/user" />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/login/user" />;
  }

  return children;
}

