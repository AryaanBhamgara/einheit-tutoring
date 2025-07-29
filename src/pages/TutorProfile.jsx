import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import tutors from '../data/tutors.json';
import BookingModal from '../components/BookingModal';

/**
 * Page showing the full profile of a tutor. It displays their photo,
 * biography, subjects, location, rate and rating. A booking button opens
 * the booking form modal. If the tutor id in the URL does not exist in
 * the data set, the component redirects to a 404 page.
 */
export default function TutorProfile() {
  const { id } = useParams();
  const tutor = tutors.find((t) => String(t.id) === String(id));
  const [showModal, setShowModal] = useState(false);

  if (!tutor) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-darkText">
      {/* Hero image */}
      <div
        className="relative h-64 sm:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${tutor.image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-end p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {tutor.name}
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar details */}
          <div className="sm:w-1/3 bg-white dark:bg-darkCard rounded-lg shadow p-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Subjects</h2>
              <p>{tutor.subjects.join(', ')}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Location</h2>
              <p>{tutor.location}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Rate</h2>
              <p>${tutor.rate}/hr</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">Rating</h2>
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < Math.round(tutor.rating) ? '★' : '☆'}</span>
                ))}
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  ({tutor.reviewsCount} reviews)
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-indigo-500 transition"
            >
              Book a lesson
            </button>
          </div>
          {/* Main description */}
          <div className="flex-1 bg-white dark:bg-darkCard rounded-lg shadow p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">About {tutor.name}</h2>
            <p className="leading-relaxed whitespace-pre-line">
              {tutor.longDescription || tutor.description}
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-block text-primary dark:text-indigo-400 hover:underline"
        >
          ← Back to tutors
        </Link>
      </div>
      {showModal && (
        <BookingModal tutorName={tutor.name} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}