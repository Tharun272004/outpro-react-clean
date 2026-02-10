import { useEffect, useState } from "react";
import "../admin.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchContacts = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setContacts(data);
    } catch {
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(
      `${process.env.REACT_APP_API_URL}/api/contact/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Pending" ? "Completed" : "Pending";

    await fetch(
      `${process.env.REACT_APP_API_URL}/api/contact/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    setContacts((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-card">
        <h3>Contact Messages</h3>

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.service}</td>
                  <td className="message-cell">{c.message}</td>

                  <td>
                    <span
                      className={
                        c.status === "Completed"
                          ? "status-completed"
                          : "status-pending"
                      }
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="status-btn"
                      onClick={() =>
                        updateStatus(c._id, c.status)
                      }
                    >
                      {c.status === "Pending"
                        ? "Mark Completed"
                        : "Mark Pending"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
