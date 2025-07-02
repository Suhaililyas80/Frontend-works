import React from "react";
import "./Sidebar2.css";
import { useHistory, useLocation } from "react-router-dom";

function Sidebar2({ open, onToggle }) {
  const history = useHistory();
  const location = useLocation();

  // const handleVmockDashboardClick = () => {
  //   history.push("/VmockDashboard");
  // };

  // const handleAllTasksClick = () => {
  //   history.push("/AllTasks");
  // };
  // const handleDeshboardClick = () => {
  //   history.push("/Dashboard");
  // };
  // const handleLogoutClick = () => {
  //   history.push("/logout");
  // };
  // const handleUserActivityClick = () => {
  //   history.push("/UserActivities");
  // };
  // const handleNotificationClick = () => {
  //   history.push("/Notification");
  // };

  const routes = {
    home: "/VmockDashboard",
    userManagement: "/Dashboard",
    userActivities: "/UserActivities",
    taskManagement: "/AllTasks",
    notification: "/Notification",
    logout: "/logout",
  };

  const isActive = (path) => location.pathname === path;

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
          <button
            className={`sidebar-menu-btn${
              isActive(routes.home) ? " active" : ""
            }`}
            onClick={() => history.push(routes.home)}
          >
            Home
          </button>
          <button
            className={`sidebar-menu-btn${
              isActive(routes.userManagement) ? " active" : ""
            }`}
            onClick={() => history.push(routes.userManagement)}
          >
            UserManagement
          </button>
          <button
            className={`sidebar-menu-btn${
              isActive(routes.userActivities) ? " active" : ""
            }`}
            onClick={() => history.push(routes.userActivities)}
          >
            UserActivities
          </button>
          <button
            className={`sidebar-menu-btn${
              isActive(routes.taskManagement) ? " active" : ""
            }`}
            onClick={() => history.push(routes.taskManagement)}
          >
            TaskManagement
          </button>
          <button
            className={`sidebar-menu-btn${
              isActive(routes.notification) ? " active" : ""
            }`}
            onClick={() => history.push(routes.notification)}
          >
            Notification
          </button>
          <button
            className={`sidebar-menu-btn${
              isActive(routes.logout) ? " active" : ""
            }`}
            onClick={() => history.push(routes.logout)}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar2;
