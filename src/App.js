import { useEffect, useState } from "react";
import { Routes, Route, } from "react-router-dom";
import api from "./api";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import BMICalculator from "./pages/BMICalculator";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Stats from "./pages/Stats";
import Trivia from "./pages/Trivia";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    })();
  }, []);

 
  return (
    <div>
      

      <Navbar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="bmi" element={<BMICalculator/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} />
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute user={user}>
            <Stats user={user} />
          </ProtectedRoute>
        } />
        <Route path="/trivia" element={
          <ProtectedRoute user={user}>
            <Trivia/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
