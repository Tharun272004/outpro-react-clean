import { useEffect, useState } from "react";
import "../admin.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ---------------------------
  // Fetch all contact messages
  // ---------------------------
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

      // 🔒 Token expired / invalid
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      const data = await res.json();

      // 🛡 Safety check
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setContacts(data);
    } catch (error) {
      console.error("Fetch contacts error:", error);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Delete a message
  // ---------------------------
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  // ---------------------------
  // Update status
  // ---------------------------
  const updateStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Pending" ? "Completed" : "Pending";

    try {
      const res = await fetch(
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

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status");
    }
  };

  // ---------------------------
  // Logout
  // ---------------------------
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // ---------------------------
  // Load on mount
  // ---------------------------
  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* CARD */}
      <div className="admin-card">
        <h3>Contact Messages</h3>

        {loading ? (
          <p>Loading messages...</p>
        ) : contacts.length === 0 ? (
          <p>No messages found</p>
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
