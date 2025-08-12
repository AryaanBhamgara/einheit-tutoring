import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function BookingModal({ tutorName, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: `I would like to book a lesson with ${tutorName}`,
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus({ loading: false, success: true, error: false });
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus({ loading: false, success: false, error: true });
        }
      );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-darkCard p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Book {tutorName}</h2>

        {status.success && (
          <p className="text-green-500 mb-3">Your booking request was sent successfully!</p>
        )}
        {status.error && (
          <p className="text-red-500 mb-3">Something went wrong. Please try again.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border rounded p-2"
          />
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-500"
          >
            {status.loading ? "Sending..." : "Send Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

