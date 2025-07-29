import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.png';

/**
 * Hero section displayed at the top of the home page. It uses a full‑width
 * illustration as a background and overlays a headline and search inputs.
 * The motion component adds a gentle fade‑in when the component mounts.
 *
 * Props:
 *   searchSubject: current value of the subject search field
 *   searchLocation: current value of the location search field
 *   onSubjectChange: handler called when the subject field changes
 *   onLocationChange: handler called when the location field changes
 */
export default function HeroSection({
  searchSubject,
  searchLocation,
  onSubjectChange,
  onLocationChange,
}) {
  return (
    <motion.section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroImg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Overlay tint to enhance contrast */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto py-24 px-6 text-center flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Unlock your potential with the right tutor
        </h1>
        <p className="mb-8 text-lg sm:text-xl max-w-2xl">
          Search for expert instructors by subject and location to start
          learning today.
        </p>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Subject (e.g. Math)"
            value={searchSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="flex-1 p-3 rounded-md text-gray-900 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location (e.g. Winnipeg)"
            value={searchLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="flex-1 p-3 rounded-md text-gray-900 focus:outline-none"
          />
        </div>
      </div>
    </motion.section>
  );
}