import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import tutorsData from '../data/tutors.json';
import HeroSection from '../components/HeroSection';
import Filters from '../components/Filters';
import TutorCard from '../components/TutorCard';
import Testimonials from '../components/Testimonials';
import SubjectCarousel from '../components/SubjectCarousel';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [searchSubject, setSearchSubject] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');

  // NEW: global booking state
  const [bookingTutor, setBookingTutor] = useState(null);

  const subjects = useMemo(() => {
    const set = new Set();
    tutorsData.forEach((t) => t.subjects.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);

  const filteredTutors = useMemo(() => {
    return tutorsData.filter((tutor) => {
      const subjectMatch = searchSubject
        ? tutor.subjects.some((s) => s.toLowerCase().includes(searchSubject.toLowerCase()))
        : true;
      const locationMatch = searchLocation
        ? tutor.location.toLowerCase().includes(searchLocation.toLowerCase())
        : true;
      const subjectFilterMatch = subjectFilter ? tutor.subjects.includes(subjectFilter) : true;
      const minMatch = minRate ? tutor.rate >= parseFloat(minRate) : true;
      const maxMatch = maxRate ? tutor.rate <= parseFloat(maxRate) : true;
      return subjectMatch && locationMatch && subjectFilterMatch && minMatch && maxMatch;
    });
  }, [searchSubject, searchLocation, subjectFilter, minRate, maxRate]);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } };

  return (
    <div className="bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-darkText min-h-screen flex flex-col">
      <Helmet>
        <title>Einheit Tutoring</title>
        <meta name="description" content="Einheit Tutoring — personalized lessons in English, Math, IT and more. Book a trial today." />
      </Helmet>

      <HeroSection
        searchSubject={searchSubject}
        searchLocation={searchLocation}
        onSubjectChange={setSearchSubject}
        onLocationChange={setSearchLocation}
      />

      <>
        <SubjectCarousel onSubjectClick={setSubjectFilter} selectedSubject={subjectFilter} />
        {subjectFilter && (
          <div className="text-center mt-2">
            <button onClick={() => setSubjectFilter('')} className="text-sm text-rose-600 underline hover:text-rose-800">
              Clear Subject Filter
            </button>
          </div>
        )}
      </>

      <div className="max-w-6xl mx-auto w-full px-6 -mt-8 relative z-20">
        <Filters
          subjects={subjects}
          selectedSubject={subjectFilter}
          onSubjectChange={setSubjectFilter}
          minRate={minRate}
          maxRate={maxRate}
          onMinRateChange={setMinRate}
          onMaxRateChange={setMaxRate}
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {filteredTutors.length > 0 ? (
          <motion.div variants={container} initial="hidden" animate="show"
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTutors.map((tutor) => (
              <motion.div key={tutor.id} variants={item}>
                {/* Pass a callback so each card can open the global modal */}
                <TutorCard tutor={tutor} onBook={() => setBookingTutor(tutor)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No tutors match your criteria.</p>
        )}
      </main>

      <Testimonials />

      {/* ONE global modal for all tutors */}
      <BookingModal
        open={!!bookingTutor}
        tutorName={bookingTutor?.name}
        onClose={() => setBookingTutor(null)}
      />
    </div>
  );
}
