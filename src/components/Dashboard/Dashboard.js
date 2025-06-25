import React, { useState, useEffect } from "react";
import { UserListing } from "../../api";
import Sidebar from "../Sidebar/Sidebar";
import "../Sidebar/Sidebar.css";
import "./Dashboard.css";
import { handleCSV } from "../CsvDowanloadB";
import { DeleteUsers } from "../DeleteUsers";
import { AssignRoleC } from "../AssignRole";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // select ids
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // single user select
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const isAllSelected =
    users.length > 0 && selectedUserIds.length === users.length;
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user.id));
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const fetchUsers = (params = {}) => {
    setLoading(true);
    UserListing(params)
      .then((response) => {
        setLoading(false);
        const res = response.data;
        if (Array.isArray(res)) {
          setUsers(res);
        } else if (Array.isArray(res.users)) {
          setUsers(res.users);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        setUsers([]);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (name) params.name = name;
    if (email) params.email = email;
    if (role) params.role = role;
    fetchUsers(params);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setRole("");
    fetchUsers();
  };

  //  //redux form //download api

  // download csv functionality in dashboard

  return (
    <div className="dashboard-main">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((open) => !open)}
      />
      <div
        className={`dashboard-container${sidebarOpen ? " sidebar-shift" : ""}`}
      >
        <h1 className="dashboard-title">UserDashboard</h1>

        <form className="dashboard-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button type="submit" className="dashboard-btn" disabled={loading}>
            Search
          </button>
          <button
            type="button"
            className="dashboard-btn"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="button"
            className="dashboard-btn"
            onClick={() => handleCSV(users)}
            disabled={loading || users.length === 0}
          >
            Download_CSV
          </button>
        </form>
        <div className="dashboard-actions-row">
          <DeleteUsers
            selectedUserIds={selectedUserIds}
            onDeleteSuccess={() => {
              setSelectedUserIds([]);
              fetchUsers();
            }}
          />
          {selectedUserId && (
            <AssignRoleC
              selectedUserId={selectedUserId}
              onAssignSuccess={() => {
                setSelectedUserId(null);
                fetchUsers();
              }}
            />
          )}
        </div>
        <div className="dashboard-table-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : users.length === 0 ? (
            <div>No users found</div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Email Verified</th>
                  <th>Roles</th>
                  <th>Created at</th>
                  <th>Created by</th>
                  <th>Updated at</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={(e) => {
                      // Prevent checkbox clicks from triggering row click
                      if (e.target.type !== "checkbox")
                        setSelectedUserId(user.id);
                    }}
                    style={{
                      backgroundColor:
                        selectedUserId === user.id ? "#e5f1ff" : "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <td
                      onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.email_verified_at ? "Yes" : "No"}</td>
                    <td>{user.role_names}</td>
                    <td>{user.created_at}</td>
                    <td>{user.createdby}</td>
                    <td>{user.updated_at ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
