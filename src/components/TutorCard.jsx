import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';

/**
 * A card displaying a summary of a tutor. Includes their photo, name,
 * location, subjects, hourly rate, rating and a short description. It also
 * provides buttons to view the full profile and to open a booking form
 * modal. The card uses Framer Motion for a subtle hover lift effect.
 *
 * Props:
 *   tutor: tutor object containing id, name, location, subjects, rate,
 *          rating, description and image URL
 */
export default function TutorCard({ tutor }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white dark:bg-darkCard rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
        whileHover={{ y: -4 }}
      >
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-darkText">
            {tutor.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {tutor.location}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {tutor.subjects.join(', ')}
          </p>
          {/* Rating stars */}
          <div className="flex items-center mb-1 text-yellow-500 text-sm">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < Math.round(tutor.rating) ? '★' : '☆'}</span>
            ))}
            <span className="text-gray-400 dark:text-gray-500 text-xs ml-2">
              ({tutor.reviewsCount} reviews)
            </span>
          </div>
          <p className="text-primary dark:text-indigo-400 font-semibold text-md mb-2">
            ${tutor.rate}/hr
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {tutor.description}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/tutor/${tutor.id}`}
            className="flex-1 text-center px-3 py-2 rounded-md bg-primary text-white hover:bg-indigo-500 transition"
          >
            View profile
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 text-center px-3 py-2 rounded-md bg-accent text-white hover:bg-blue-900 transition"
          >
            Book
          </button>
        </div>
      </motion.div>
      {showModal && (
        <BookingModal
          tutorName={tutor.name}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}