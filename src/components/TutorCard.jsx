import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TutorCard({ tutor, onBook }) {
  return (
    <motion.div
      className="bg-white dark:bg-darkCard rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img
        src={tutor.image}
        alt={tutor.name}
        loading="lazy"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-darkText">{tutor.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tutor.location}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tutor.subjects.join(', ')}</p>

        <div className="flex items-center mb-1 text-yellow-500 text-sm" aria-label={`Rating ${tutor.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => <span key={i}>{i < Math.round(tutor.rating) ? '★' : '☆'}</span>)}
          <span className="text-gray-400 dark:text-gray-500 text-xs ml-2">({tutor.reviewsCount} reviews)</span>
        </div>

        <p className="text-primary dark:text-indigo-400 font-semibold text-md mb-2">${tutor.rate}/hr</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{tutor.description}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/tutor/${tutor.id}`} className="flex-1 text-center px-3 py-2 rounded-md bg-primary text-white hover:bg-indigo-500 transition">
          View profile
        </Link>
        <button
          onClick={onBook}
          className="flex-1 text-center px-3 py-2 rounded-md bg-accent text-white hover:bg-blue-900 transition"
          aria-label={`Book ${tutor.name}`}
        >
          Book
        </button>
      </div>
    </motion.div>
  );
}
