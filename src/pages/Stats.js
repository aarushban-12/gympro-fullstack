import { useState, useEffect } from "react";
import api from "../api";

export default function StatsPage() {
  const [stats, setStats] = useState({
    steps_walked: 0,
    water_intake_ml: 0,
    weight: 0,
    height: 0,
    max_bench: 0,
    max_squat: 0,
    max_deadlift: 0,
  });

  const [message, setMessage] = useState("");

  // Fetch current stats on load
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get("/stats");
        if (res.data) setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: parseInt(e.target.value, 10) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/stats", stats);
      setMessage("Stats updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update stats.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">My Stats</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Steps Walked</label>
            <input
              type="number"
              name="steps_walked"
              className="form-control"
              value={stats.steps_walked}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Water Intake (ml)</label>
            <input
              type="number"
              name="water_intake_ml"
              className="form-control"
              value={stats.water_intake_ml}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={stats.weight}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              name="height"
              className="form-control"
              value={stats.height}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Max Bench (kg)</label>
            <input
              type="number"
              name="max_bench"
              className="form-control"
              value={stats.max_bench}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Max Squat (kg)</label>
            <input
              type="number"
              name="max_squat"
              className="form-control"
              value={stats.max_squat}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Max Deadlift (kg)</label>
            <input
              type="number"
              name="max_deadlift"
              className="form-control"
              value={stats.max_deadlift}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Stats
          </button>
        </form>
      </div>
    </div>
  );
}
