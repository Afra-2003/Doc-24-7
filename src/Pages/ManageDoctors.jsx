import { useEffect, useState } from "react";
import "./admin.css";

export default function ManageDoctors() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(data);
  }, []);

  return (
    <div className="admin-manage-doctors">

      <h2 className="admin-dashboard-title">Doctors List</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
          </tr>
        </thead>

        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="3">No doctors found</td>
            </tr>
          ) : (
            doctors.map(doc => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.spec}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}

