import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // custom styles

export default function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/register", {
        email,
        password,
        name,
        gender,
        age: parseInt(age, 10),
      });
      setUser(res.data); // auto-login
      nav("/dashboard");
    } catch {
      setErr("Registration failed");
    }
  }

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
