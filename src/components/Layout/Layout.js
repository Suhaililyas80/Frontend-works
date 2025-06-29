import React, { useState, useEffect } from "react";
import Sidebar2 from "../Sidebar2/Sidebar2";
import { FaUserCircle } from "react-icons/fa";
import { getUserByToken } from "../../api";
import { useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const location = useLocation();

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
    setShowUserDetails(false);
  }, [location.pathname, sidebarOpen]);

  const sidebarWidth = sidebarOpen ? 180 : 56;
  const topbarHeight = 60;

  return (
    <div>
      <Sidebar2 open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      <header
        className="responsive-layout-topbar"
        style={{
          left: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
          height: topbarHeight,
        }}
      >
        <div className="responsive-welcome-message">
          Welcome, <span>{user ? user.name : "..."}</span>
        </div>
        <div className="responsive-profile-section">
          <FaUserCircle
            size={32}
            className="responsive-profile-icon"
            onClick={() => setShowUserDetails((v) => !v)}
            title="View user details"
          />
          {showUserDetails && user && (
            <div className="responsive-profile-popover">
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
            </div>
          )}
        </div>
      </header>
      <main
        className="responsive-layout-main"
        style={{
          marginLeft: sidebarWidth,
          paddingTop: topbarHeight,
          minHeight: `calc(100vh - ${topbarHeight}px)`,
        }}
      >
        <div className="main-content-inner">{children}</div>
      </main>
    </div>
  );
}
