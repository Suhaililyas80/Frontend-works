import { DeleteUser } from "../api";
import { useState } from "react";

export function DeleteUsers({ selectedUserIds, onDeleteSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Click handler for main delete button
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Click handler for confirming deletion in modal
  const handleDelete = () => {
    console.log("Attempting to delete:", selectedUserIds);
    if (!selectedUserIds || selectedUserIds.length === 0) {
      alert("No users selected for deletion.");
      setShowModal(false);
      return;
    }
    setIsLoading(true);
    DeleteUser(selectedUserIds)
      .then((response) => {
        console.log("Users deleted successfully:", response.data);
        setShowModal(false);
        onDeleteSuccess();
      })
      .catch((error) => {
        console.error("Error deleting users:", error);
        alert("Failed to delete users. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Click handler for cancel button in modal
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="delete-button"
        onClick={handleOpenModal}
        disabled={!selectedUserIds || selectedUserIds.length === 0}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete_Users
      </button>
      {console.log(showModal)}
      {showModal && (
        <div className="model">
          <div className="modal-content">
            <p>Are you sure you want to delete the selected users?</p>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {isLoading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              style={{
                backgroundColor: "green",
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
