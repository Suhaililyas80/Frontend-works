import { useState, useEffect } from "react";
import { createTasks, UserListing } from "../../api";
import "./CreateTasks.css";

const formFields = [
  { name: "user_id", label: "User", type: "user-select", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  { name: "end_date", label: "End Date", type: "date", required: true },
  // Add more fields as needed!
];

export function CreateTasks() {
  const [formData, setFormData] = useState({});

  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    UserListing({ role: "user" })
      .then((response) => {
        const res = response.data;
        console.log("UserListing response:", res);
        setUsers((res || {}).users || []);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users");
        setUsers([]);
      });
  }, []);

  // Only non-admin users for assignment
  //   console.log(users);
  //   const nonAdminUsers = users.filter((user) => user.role_names !== "admin");

  // Generalized onChange handler (single field, for all inputs)
  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For input/textarea elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
    createTasks(
      formData.user_id,
      formData.title,
      formData.description,
      formData.end_date
    )
      .then((response) => {
        setLoading(false);
        const res = response.data;
        if (res.success) {
          setSuccessMessage("Task created successfully!");
          setFormData({});
          setUserSearch("");
        } else {
          setError(res.message || "Failed to create task");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "An error occurred while creating the task");
      });
  };

  // User filtering for dropdown
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="create-tasks-main">
      <h1 className="create-tasks-title">Create Task</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleCreateTask} className="create-tasks-form">
        {formFields.map((field) => {
          if (field.type === "user-select") {
            // Show selected user name if already chosen, otherwise show search
            const selectedUser = users.find((u) => u.id === formData.user_id);
            return (
              <label key={field.name}>
                {field.label}:
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="user_id"
                    value={selectedUser ? selectedUser.name : userSearch}
                    onFocus={() => setShowUserDropdown(true)}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      handleFieldChange("user_id", "");
                      setShowUserDropdown(true);
                    }}
                    onBlur={() =>
                      setTimeout(() => setShowUserDropdown(false), 200)
                    }
                    placeholder="Search user by name..."
                    required={field.required}
                    autoComplete="off"
                  />
                  {showUserDropdown && (
                    <ul className="user-dropdown">
                      {filteredUsers.map((user) => (
                        <li
                          key={user.id}
                          title={`${user.name} (${user.email})`}
                          onClick={() => {
                            handleFieldChange("user_id", user.id);
                            setUserSearch(user.name);
                            setShowUserDropdown(false);
                          }}
                          style={{
                            background:
                              formData.user_id === user.id
                                ? "#e6f7ff"
                                : "white",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          {user.name} ({user.email})
                        </li>
                      ))}
                      {filteredUsers.length === 0 && (
                        <li style={{ color: "#888", padding: "5px" }}>
                          No users found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </label>
            );
          } else if (field.type === "textarea") {
            return (
              <label key={field.name}>
                {field.label}:
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                />
              </label>
            );
          } else {
            return (
              <label key={field.name}>
                {field.label}:
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                />
              </label>
            );
          }
        })}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
