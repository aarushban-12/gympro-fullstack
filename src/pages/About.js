import React from "react";

function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About GymPro</h1>
        <p className="lead text-muted">Empowering healthier lifestyles since 2020</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h4 className="fw-semibold">🏋️‍♂️ Our Mission</h4>
          <p>
            At <strong>GymPro</strong>, our mission is to help you reach your full potential—physically and mentally. We blend cutting-edge training techniques with personalized coaching to help members achieve sustainable results.
          </p>
          <p>
            Whether you're just starting out or a seasoned athlete, our programs are built to grow with you.
          </p>
        </div>
        <div className="col-md-6 mb-4">
          <h4 className="fw-semibold">📌 What We Offer</h4>
          <ul className="list-group">
            <li className="list-group-item">✔ Personalized training plans</li>
            <li className="list-group-item">✔ Nutritional guidance & tracking</li>
            <li className="list-group-item">✔ Progress dashboards</li>
            <li className="list-group-item">✔ Monthly challenges and leaderboards</li>
            <li className="list-group-item">✔ Certified and supportive trainers</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 bg-light rounded">
        <h4 className="text-primary">💬 Why Members Love Us</h4>
        <p>
          "Joining GymPro was the best decision I made for my health. I lost 15 lbs in 3 months and gained so much confidence!" – <em>Priya R.</em>
        </p>
        <p>
          "The trainers are awesome, and the app makes tracking my workouts a breeze." – <em>Jason T.</em>
        </p>
      </div>
    </div>
  );
}

export default About;
