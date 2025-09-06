import { useState, useEffect } from "react";
import api from "../api";
import "./Dashboard.css";

export default function Dashboard({user}) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        // Axios error object
        if (err.response) {
          // Server responded with status code outside 2xx
          console.error("Error response:", err.response.data);
          setError(err.response.data.error || "Server error");
        } else if (err.request) {
          // Request was made but no response received
          console.error("No response:", err.request);
          setError("No response from server");
        } else {
          // Something else happened
          console.error("Axios error:", err.message);
          setError(err.message);
        }
      }
    }
    fetchTasks();
  }, []);

  // Add new task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await api.post("/tasks", { name: newTask.trim() });
      setTasks([...tasks, res.data]);
      setNewTask("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    }
  };

  // Delete task (check off)
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title mt-5">
       Welcome {user?.email || "Guest"}!
      </h1>

      {/* Flex container for side-by-side layout */}
      <div className="flex-container">
        {/* Task List */}
        <div className="tasks-card">
          <h3>My Tasks</h3>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleAdd} className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>

          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                {task.name}
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="list-group-item text-center text-muted">
                No tasks yet!
              </li>
            )}
          </ul>
        </div>

        {/* Motivational / Info Text */}
        <div className="text-card">
              <div>
          <h3>Stay Consistent!</h3>
          <p>
            Tracking your tasks daily helps you stay motivated and organized.
          </p>
          <p>
            Every task you complete is a step closer to your goals. Keep going!
          </p>
          <p>
            Remember, small progress each day adds up to big results.
          </p>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="footer-text">
        GymPro • Track your progress • Stay motivated
      </div>
    </div>
  );
}
