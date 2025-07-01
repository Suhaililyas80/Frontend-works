import React from "react";
import "./Sidebar2.css";
import { useHistory } from "react-router-dom";

function Sidebar2({ open, onToggle }) {
  const history = useHistory();

  const handleAllTasksClick = () => {
    history.push("/AllTasks");
  };
  const handleDeshboardClick = () => {
    history.push("/Dashboard");
  };
  const handleLogoutClick = () => {
    history.push("/logout");
  };
  const handleUserActivityClick = () => {
    history.push("/UserActivities");
  };

  return (
    <div className={`sidebar2-root${open ? " open" : ""}`}>
      <button
        className="sidebar-hamburger"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>
      {open && (
        <div className="sidebar-menu">
          <button className="sidebar-menu-btn" onClick={handleAllTasksClick}>
            All Tasks
          </button>
          <button className="sidebar-menu-btn" onClick={handleDeshboardClick}>
            Dashboard
          </button>
          <button
            className="sidebar-menu-btn"
            onClick={handleUserActivityClick}
          >
            User Activity
          </button>
          <button className="sidebar-menu-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar2;
