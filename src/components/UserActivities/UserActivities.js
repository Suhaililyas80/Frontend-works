import React, { useEffect, useState } from "react";
import { UserActivity } from "../../api"; // <-- Make sure this function matches your backend API
import "./UserActivities.css";

function UserActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Optional: for error display

  // Parameters for filtering
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, []);

  const fetchActivities = (params = {}) => {
    setLoading(true);
    setError("");
    UserActivity(params)
      .then((response) => {
        setLoading(false);
        const res = response.data;
        if (Array.isArray(res)) {
          setActivities(res);
        } else if (Array.isArray(res.activities)) {
          setActivities(res.activities);
        } else {
          setActivities([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch activities");
        setActivities([]);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (userId) params.user_id = userId; // Make sure param names match your API
    if (email) params.email = email;
    if (role) params.role = role;
    fetchActivities(params);
  };

  const handleReset = () => {
    setUserId("");
    setEmail("");
    setRole("");
    fetchActivities();
  };

  return (
    <div className="user-activities-main">
      <h1 className="user-activities-title">User Activities</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit" className="useractivities-btn" disabled={loading}>
          Search
        </button>
        <button
          type="button"
          className="useractivities-btn"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </button>
      </form>
      <div className="activities-table">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Login-Time</th>
                <th>Logout-Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.user_id}</td>
                    <td>{activity.email}</td>
                    <td>{activity.login_time}</td>
                    <td>{activity.logout_time || "-"}</td>
                    <td>{activity.duration || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserActivities;
