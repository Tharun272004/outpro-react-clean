import { useEffect, useState } from "react";
import "../admin.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState(null);

  const token = localStorage.getItem("adminToken");

  /* ================= FETCH CONTACTS ================= */
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

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response");

      setContacts(data);
    } catch (error) {
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
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
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= STATUS TOGGLE ================= */
  const updateStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Pending" ? "Completed" : "Pending";

    try {
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
    } catch {
      alert("Failed to update status");
    }
  };

  /* ================= EDIT ================= */
  const openEditModal = (contact) => {
    setEditingContact({ ...contact });
  };

  const handleEditChange = (e) => {
    setEditingContact({
      ...editingContact,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact/${editingContact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingContact),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setContacts((prev) =>
        prev.map((c) =>
          c._id === editingContact._id ? updated.data : c
        )
      );

      setEditingContact(null);
    } catch {
      alert("Failed to update message");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  /* ================= LOAD ================= */
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

      {/* TABLE */}
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
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="status-btn"
                      onClick={() =>
                        updateStatus(c._id, c.status)
                      }
                    >
                      Toggle
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(c)}
                    >
                      Edit
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

      {/* ================= EDIT MODAL ================= */}
      {editingContact && (
        <div className="edit-modal">
          <div className="edit-card">
            <h3>Edit Message</h3>

            <input
              name="name"
              value={editingContact.name}
              onChange={handleEditChange}
            />
            <input
              name="email"
              value={editingContact.email}
              onChange={handleEditChange}
            />
            <input
              name="phone"
              value={editingContact.phone}
              onChange={handleEditChange}
            />
            <input
              name="service"
              value={editingContact.service}
              onChange={handleEditChange}
            />
            <textarea
              name="message"
              value={editingContact.message}
              onChange={handleEditChange}
            />

            <div className="edit-actions">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingContact(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
