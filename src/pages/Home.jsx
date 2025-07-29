import React, { useState, useMemo } from 'react';
import tutorsData from '../data/tutors.json';
import HeroSection from '../components/HeroSection';
import Filters from '../components/Filters';
import TutorCard from '../components/TutorCard';
import Testimonials from "../components/Testimonials";

/**
 * The home page brings together the hero section, filtering controls and
 * listing of tutors. The search inputs in the hero as well as the filters
 * modify state at this level and are used to derive a filtered list of
 * tutors. The testimonial section at the bottom provides some social
 * proof and uses a decorative background.
 */
export default function Home() {
  const [searchSubject, setSearchSubject] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');

  // Compute list of unique subjects for the dropdown
  const subjects = useMemo(() => {
    const set = new Set();
    tutorsData.forEach((t) => t.subjects.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);

  // Filter tutors based on search and filter criteria
  const filteredTutors = useMemo(() => {
    return tutorsData.filter((tutor) => {
      const subjectMatch = searchSubject
        ? tutor.subjects.some((s) =>
            s.toLowerCase().includes(searchSubject.toLowerCase())
          )
        : true;
      const locationMatch = searchLocation
        ? tutor.location.toLowerCase().includes(searchLocation.toLowerCase())
        : true;
      const subjectFilterMatch = subjectFilter
        ? tutor.subjects.includes(subjectFilter)
        : true;
      const minMatch = minRate ? tutor.rate >= parseFloat(minRate) : true;
      const maxMatch = maxRate ? tutor.rate <= parseFloat(maxRate) : true;
      return subjectMatch && locationMatch && subjectFilterMatch && minMatch && maxMatch;
    });
  }, [searchSubject, searchLocation, subjectFilter, minRate, maxRate]);

  return (
    <div className="bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-darkText min-h-screen flex flex-col">
      {/* Hero with search inputs */}
      <HeroSection
        searchSubject={searchSubject}
        searchLocation={searchLocation}
        onSubjectChange={setSearchSubject}
        onLocationChange={setSearchLocation}
      />
      {/* Filters bar */}
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
      {/* Tutor list */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {filteredTutors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tutors match your criteria.
          </p>
        )}
      </main>
      {/* Testimonials */}
      <TestimonialSection />

      <Testimonials />

    </div>
  );
}