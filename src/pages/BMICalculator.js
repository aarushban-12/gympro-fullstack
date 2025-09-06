import React, { useState } from "react";
import "./BMICalculator.css";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const f = parseFloat(feet);
    const i = parseFloat(inches);

    if (!isNaN(w) && !isNaN(f) && !isNaN(i)) {
      const totalInches = f * 12 + i;
      const heightInMeters = totalInches * 0.0254;
      const result = w / (heightInMeters * heightInMeters);
      setBmi(result.toFixed(2));
      classifyBMI(result);
    } else {
      setBmi(null);
      setCategory("");
    }
  };

  const classifyBMI = (bmiVal) => {
    if (bmiVal < 18.5) setCategory("Underweight");
    else if (bmiVal < 24.9) setCategory("Normal weight");
    else if (bmiVal < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div>
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg p-4 bmi-card">
        <h2 className="text-center mb-4">🧍 BMI Calculator</h2>

        <div className="mb-3">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Height (feet)</label>
            <input
              type="number"
              className="form-control"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div className="col">
            <label className="form-label">Height (inches)</label>
            <input
              type="number"
              className="form-control"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              placeholder="e.g., 7"
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={calculateBMI}>
          Calculate BMI
        </button>

        {bmi && (
          <div className="alert alert-info text-center mt-4">
            <p className="mb-1">Your BMI is: <strong>{bmi}</strong></p>
            <p className="mb-0">Category: <strong>{category}</strong></p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
