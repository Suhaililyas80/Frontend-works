import React from "react";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

function Sidebar({ open, onToggle }) {
  const history = useHistory();

  const onUserActivity = () => {
    history.push("/UserActivities");
  };
  const handletaskmanagementClick = () => {
    history.push("/VmockDashboard");
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

          <button
            className="sidebar-menu-btn"
            onClick={handletaskmanagementClick}
          >
            VmockDashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
