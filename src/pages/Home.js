import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="container py-5">

      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-3 fw-bold text-gradient">GymPro</h1>
        <p className="lead text-muted mb-4">
          Train smarter, live healthier, and track your progress like a pro.
        </p>
        <a href="/register" className="btn btn-primary btn-lg px-4">
          Get Started
        </a>
      </section>

      {/* Feature Highlights */}
      <section className="row text-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="feature-box shadow-sm p-4 rounded bg-white h-100">
            <div className="icon mb-3 fs-2">💪</div>
            <h5 className="fw-semibold">Certified Coaches</h5>
            <p className="text-muted">
              Get guidance from experts who design routines just for your goals.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="feature-box shadow-sm p-4 rounded bg-white h-100">
            <div className="icon mb-3 fs-2">📊</div>
            <h5 className="fw-semibold">Progress Dashboard</h5>
            <p className="text-muted">
              View your weight, BMI, attendance, and more all in one place.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="feature-box shadow-sm p-4 rounded bg-white h-100">
            <div className="icon mb-3 fs-2">🥗</div>
            <h5 className="fw-semibold">Nutrition Tips</h5>
            <p className="text-muted">
              Stay fueled with healthy recipes and diet plans built for fitness.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section bg-light rounded p-4 text-center">
        <h4 className="mb-4 fw-bold text-dark">Our Community Stats</h4>
        <div className="row">
          <div className="col-sm-6 col-md-3 mb-3">
            <h2 className="text-primary">250+</h2>
            <p className="text-muted">Active Members</p>
          </div>
          <div className="col-sm-6 col-md-3 mb-3">
            <h2 className="text-primary">60+</h2>
            <p className="text-muted">Personalized Plans</p>
          </div>
          <div className="col-sm-6 col-md-3 mb-3">
            <h2 className="text-primary">12</h2>
            <p className="text-muted">Weekly Classes</p>
          </div>
          <div className="col-sm-6 col-md-3 mb-3">
            <h2 className="text-primary">4.9★</h2>
            <p className="text-muted">Avg Member Rating</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

  