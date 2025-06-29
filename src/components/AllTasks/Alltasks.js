import { useState, useEffect } from "react";
import { getTasks, updateTaskStatus, updatetaskdetails } from "../../api";
import "./AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingTaskStatus, setUpdatingTaskStatus] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalFields, setModalFields] = useState({
    title: "",
    description: "",
    end_date: "",
  });

  //modal for updating task details
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setModalFields({
      title: task.title || "",
      description: task.description || "",
      end_date: task.end_date || "",
    });
    setShowModal(true);
  };

  const handleModalFieldChange = (e) => {
    const { name, value } = e.target;
    setModalFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalUpdate = (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    const params = {};
    if (modalFields.title !== selectedTask.title)
      params.title = modalFields.title;
    if (modalFields.description !== selectedTask.description)
      params.description = modalFields.description;
    if (modalFields.end_date !== selectedTask.end_date)
      params.end_date = modalFields.end_date;

    if (Object.keys(params).length === 0) {
      setShowModal(false);
      return;
    }
    setLoading(true);
    setError("");
    updatetaskdetails(selectedTask.id, params)
      .then(() => {
        setShowModal(false);
        setSelectedTask(null);
        setLoading(false);
        fetchTasks();
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to update task details");
      });
  };

  // Modal close handler

  // Filtering parameters
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [assignedby, setAssignedBy] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);
  console.log("showModal", showModal);
  const fetchTasks = (params = {}) => {
    setLoading(true);
    setError("");
    getTasks(params)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        const res = (data || {}).data;
        if (Array.isArray(res)) {
          setTasks(res);
        } else {
          setTasks([]);
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to fetch tasks");
        setTasks([]);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (status) params.status = status;
    if (userId) params.user_id = userId;
    if (assignedby) params.assigned_by = assignedby;
    if (title) params.title = title;
    fetchTasks(params);
  };

  const handleReset = () => {
    setStatus("");
    setUserId("");
    setAssignedBy("");
    setTitle("");
    fetchTasks();
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    setUpdatingTaskStatus(true);
    updateTaskStatus(taskId, newStatus)
      .then(() => {
        setUpdatingTaskStatus(false);
        fetchTasks();
      })
      .catch(() => {
        setUpdatingTaskStatus(false);
        setError("Failed to update task status");
      });
  };

  return (
    <div className="all-tasks-container">
      <h1 className="all-tasks-header">All Tasks</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          type="text"
          value={assignedby}
          onChange={(e) => setAssignedBy(e.target.value)}
          placeholder="Assigned By"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>
      {loading && <p className="status-text">Loading tasks...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && tasks.length === 0 && (
        <p className="status-text">No tasks found.</p>
      )}
      {!loading && !error && tasks.length > 0 && (
        <div className="table-responsive">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned By</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task = {}) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.user_id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assigned_by}</td>
                  <td>{task.start_date}</td>
                  <td>{task.end_date}</td>
                  <td>
                    {updatingTaskStatus === task.id ? (
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleUpdateStatus(task.id, e.target.value)
                        }
                        onBlur={() => setUpdatingTaskStatus(null)}
                        autoFocus
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="deleted">Deleted</option>
                      </select>
                    ) : (
                      <button
                        className={`status-btn status-${task.status}`}
                        onClick={() => setUpdatingTaskStatus(task.id)}
                      >
                        {task.status.replace("_", " ")}
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => openUpdateModal(task)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {console.log(
        "showModal:",
        showModal,
        "selectedTask:",
        selectedTask,
        "modalFields:",
        modalFields
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modalll">
            <h2 className="modell-title">Update Task</h2>
            <form onSubmit={handleModalUpdate}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={modalFields.title}
                  onChange={handleModalFieldChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={modalFields.description}
                  onChange={handleModalFieldChange}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  name="end_date"
                  value={modalFields.end_date}
                  onChange={handleModalFieldChange}
                />
              </label>
              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
