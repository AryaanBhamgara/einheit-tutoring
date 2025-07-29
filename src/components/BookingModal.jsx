import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

/**
 * Modal presenting a booking form for a tutor. Uses react‑hook‑form for
 * validation and Framer Motion for a simple scale‑in animation. On submit
 * the form will display an alert summarising the booking; in a real app
 * this would send the data to a backend service.
 *
 * Props:
 *   tutorName: Name of the tutor being booked
 *   onClose: Callback invoked when the modal or backdrop is clicked
 */
export default function BookingModal({ tutorName, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(
      `Thank you, ${data.name}! Your request to book ${tutorName} on ${data.preferredTime} has been sent.`
    );
    reset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-darkCard rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-darkText">
          Book a lesson with {tutorName}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              {...register('name', { required: true })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">Name is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true, pattern: /.+@.+\..+/ })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Valid email is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="preferredTime">
              Preferred Time
            </label>
            <input
              id="preferredTime"
              type="datetime-local"
              {...register('preferredTime', { required: true })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
            />
            {errors.preferredTime && (
              <p className="text-red-500 text-xs mt-1">Please pick a date and time</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              {...register('message', { required: true })}
              className="w-full p-2 h-24 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">Please include a message</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-indigo-500 transition"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}