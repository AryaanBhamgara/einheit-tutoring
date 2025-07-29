import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Simple 404 page to display when no matching route is found.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-darkBg text-gray-800 dark:text-darkText px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-indigo-500 transition"
      >
        Go back home
      </Link>
    </div>
  );
}