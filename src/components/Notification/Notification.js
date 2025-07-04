import React, { useEffect, useState } from "react";
import { getAllNotifications, markAsRead } from "../../api";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    setLoading(true);
    getAllNotifications()
      .then((response) => setNotifications(response.data.notifications))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id) => {
    markAsRead(id)
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id
              ? { ...notif, read_at: new Date().toISOString() }
              : notif
          )
        );
      })
      .catch(() => {
        alert("Failed to mark as read");
      });
  };

  if (loading) return <div className="notification-loading">Loading...</div>;
  if (!notifications.length)
    return <div className="notification-empty">No notifications found.</div>;

  return (
    <div className="notification-list">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification-item ${notif.read_at ? "read" : "unread"}`}
        >
          <div className="notification-data">
            <pre>{JSON.stringify(notif.data, null, 2)}</pre>
          </div>
          <div className="notification-actions">
            {!notif.read_at && (
              <button
                className="notification-read-btn"
                onClick={() => handleMarkAsRead(notif.id)}
              >
                unread
              </button>
            )}
            {notif.read_at && (
              <span className="notification-read-label">Read</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
