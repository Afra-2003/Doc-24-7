import { useEffect, useState } from "react";
import "./Admin.css";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  const deleteUser = (email) => {
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div>

      <h2 className="admin-dashboard-title">Manage Users</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <button
                  className="admin-btn admin-btn-delete"
                  onClick={() => deleteUser(u.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
