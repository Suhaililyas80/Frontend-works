import React, { useState } from "react";
import { AssignRole } from "../api"; // Adjust the path as necessary

export function AssignRoleC({ selectedUserId, onAssignSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    if (!selectedUserId) {
      alert("No user selected for role assignment.");
      return;
    }
    setShowModal(true);
  };

  const handleAssignRole = () => {
    if (!role) {
      alert("Please enter a role to assign.");
      return;
    }
    setIsLoading(true);
    AssignRole(selectedUserId, role)
      .then((response) => {
        setShowModal(false);
        setRole("");
        if (onAssignSuccess) onAssignSuccess();
      })
      .catch((error) => {
        alert("Failed to assign role. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setShowModal(false);
    setRole("");
  };

  return (
    <div>
      <button
        className="assign-role-button"
        onClick={handleOpenModal}
        disabled={!selectedUserId}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Assign Role
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Assign Role</h2>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter any role"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              onClick={handleAssignRole}
              disabled={isLoading}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {isLoading ? "Assigning..." : "Assign Role"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
