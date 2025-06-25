import React from "react";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

function Sidebar({ open, onToggle }) {
  const history = useHistory();

  const handleLogoutClick = () => {
    history.push("/logout");
  };
  const onUserActivity = () => {
    history.push("/UserActivities");
  };

  return (
    <div className={`sidebar-root${open ? " open" : ""}`}>
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
          <button className="sidebar-menu-btn" onClick={onUserActivity}>
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

export default Sidebar;
