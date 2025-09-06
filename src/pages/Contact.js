import React from "react";

function Contact() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Contact Us</h1>
        <p className="lead text-muted">We’re here to support your fitness journey!</p>
      </div>

      <div className="row">
        {/* Contact Info */}
        <div className="col-md-6 mb-4">
          <h5 className="fw-semibold">📍 GymPro Headquarters</h5>
          <p>123 Fitness Blvd, Wellness City, FitState, 99999</p>

          <h5 className="fw-semibold mt-4">📞 Phone</h5>
          <p>+1 (123) 456-7890</p>

          <h5 className="fw-semibold mt-4">✉️ Email</h5>
          <p>support@gympro.com</p>

          <h5 className="fw-semibold mt-4">⏰ Hours</h5>
          <p>Mon–Sat: 6am – 10pm<br />Sunday: Closed</p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Your full name" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="How can we help?"></textarea>
            </div>

            <button type="submit" className="btn btn-primary px-4">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
