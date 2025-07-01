import React, { useState, useEffect, use } from "react";
import "./VmockDashboard.css";
import Sidebar2 from "../Sidebar2/Sidebar2";
import { getUserByToken, getNumberoftasksbystatus } from "../../api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaUserCircle } from "react-icons/fa";
import { getTasksduetoday } from "../../api";
import { Link } from "react-router-dom";
import { getUnreadNotifications } from "../../api"; // Assuming this function fetches unread notifications
// import { store } from "../../Redux/store"; // Assuming you have a Redux store setup

export function VmockDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [taskStatusData, setTaskStatusData] = useState({
    completed: 0,
    pending: 0,
    inProgress: 0,
    deleted: 0,
    total: 0,
  });
  // console.log(store.getState());

  // get tasks due today its count
  const [tasksDueToday, setTasksDueToday] = useState(0);
  useEffect(() => {
    getTasksduetoday()
      .then((response) => {
        const count = response.data.data;
        setTasksDueToday(typeof count === "number" ? count : 0);
      })
      .catch(() => {
        setTasksDueToday(0);
      });
  }, []);

  // get unread notifications count
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  useEffect(() => {
    getUnreadNotifications()
      .then((response) => {
        const count = response.data.count || 0;
        console.log("Unread Notifications Count:", count);
        setUnreadNotifications(typeof count === "number" ? count : 0);
      })
      .catch(() => {
        setUnreadNotifications(0);
      });
  }, []);

  useEffect(() => {
    getUserByToken()
      .then((response) => {
        const data = response.data.data || {};
        setUser({
          name: data.name || "Guest",
          email: data.email || "No email",
          role: data.roles?.[0]?.role || "No role",
        });
      })
      .catch(() => {
        setUser({
          name: "Guest",
          email: "No email",
          role: "No role",
        });
      });
  }, []);

  useEffect(() => {
    getNumberoftasksbystatus()
      .then((response) => {
        const data = response.data.data || {};
        setTaskStatusData({
          completed: data.completed || 0,
          pending: data.pending || 0,
          inProgress: data.in_progress || 0, // FIX: use data.in_progress
          deleted: data.deleted || 0,
          total:
            data.total ||
            (data.completed || 0) +
              (data.pending || 0) +
              (data.in_progress || 0) + // FIX: use data.in_progress
              (data.deleted || 0),
        });
      })
      .catch(() => {});
  }, []);
  //console.log("taskStatusData", taskStatusData);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const chartOptions = {
    chart: { type: "pie" },
    title: { text: "Task Status Overview" },
    series: [
      {
        name: "Tasks",
        colorByPoint: true,
        data: [
          { name: "Completed", y: taskStatusData.completed, color: "#28a745" },
          { name: "Pending", y: taskStatusData.pending, color: "#ffc107" },
          {
            name: "In Progress",
            y: taskStatusData.inProgress,
            color: "#17a2b8",
          },
          { name: "Deleted", y: taskStatusData.deleted, color: "#dc3545" },
        ],
      },
    ],
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)",
        },
      },
    },
  };

  return (
    <div className="vmock-dashboard-root">
      <Sidebar2 open={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`vmock-dashboard-content${sidebarOpen ? " open" : ""}`}>
        <header className="vmock-dashboard-header">
          <div className="vmock-dashboard-title">VmockDashboard</div>
        </header>
        <div className="vmock-dashboard-topbar">
          <div className="vmock-dashboard-welcome">
            {user ? (
              <>
                Welcome, <span>{user.name}</span>
              </>
            ) : (
              "Welcome"
            )}
          </div>
          <div className="vmock-dashboard-profile">
            <span
              className="dashboard-user-icon"
              onClick={() => setShowUserDetails((v) => !v)}
              title="View user details"
            >
              <FaUserCircle size={32} />
            </span>
            {showUserDetails && user && (
              <div className="dashboard-user-popover">
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Role:</strong> {user.role}
                </div>
              </div>
            )}
          </div>
        </div>
        <main className="vmock-dashboard-main">
          <div className="vmock-dashboard-chart">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
          {/* <div className="vmock-dashboard-summary">
            <div>
              <strong>Total Tasks:</strong> {taskStatusData.total}
            </div>
            <div>
              <Link
                to="/AllTasks?status=pending"
                className="stat stat-pending stat-link"
              >
                Pending: {taskStatusData.pending}
              </Link>
            </div>
            <div>
              <Link
                to="/AllTasks?status=in_progress"
                className="stat stat-inprogress stat-link"
              >
                In Progress: {taskStatusData.inProgress}
              </Link>
            </div>
            <div>
              <Link
                to="/AllTasks?status=completed"
                className="stat stat-completed stat-link"
              >
                Completed: {taskStatusData.completed}
              </Link>
            </div>
            <div>
              <span className="stat stat-deleted">Deleted:</span>{" "}
              {taskStatusData.deleted}
            </div>
            <div>
              <span className="stat stat-tasksduetoday">TodaydueTasks:</span>{" "}
              {tasksDueToday}
            </div>
          </div> */}
        </main>
        <div className="vmock-dashboard-summary-row">
          <Link to="/AllTasks" className="stat-box stat-total stat-link">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{taskStatusData.total}</div>
          </Link>
          <Link
            to="/AllTasks?status=pending"
            className="stat-box stat-pending stat-link"
          >
            <div className="stat-label">Pending</div>
            <div className="stat-value">{taskStatusData.pending}</div>
          </Link>
          <Link
            to="/AllTasks?status=in_progress"
            className="stat-box stat-inprogress stat-link"
          >
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{taskStatusData.inProgress}</div>
          </Link>
          <Link
            to="/AllTasks?status=completed"
            className="stat-box stat-completed stat-link"
          >
            <div className="stat-label">Completed</div>
            <div className="stat-value">{taskStatusData.completed}</div>
          </Link>
          <div className="stat-box stat-deleted">
            <div className="stat-label">Deleted</div>
            <div className="stat-value">{taskStatusData.deleted}</div>
          </div>
          <div className="stat-box stat-tasksduetoday">
            <div className="stat-label">Today Due</div>
            <div className="stat-value">{tasksDueToday}</div>
          </div>
        </div>
        <Link
          to="/Notification"
          className="stat-box stat-notifications stat-link"
        >
          <div className="stat-label">Unread Notifications</div>
          <div className="stat-value">
            {unreadNotifications > 0
              ? unreadNotifications
              : "No new notifications"}
          </div>
        </Link>
      </div>
    </div>
  );
}
