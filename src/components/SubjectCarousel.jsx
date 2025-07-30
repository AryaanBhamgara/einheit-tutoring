import React, { useRef } from "react";
import {
  FaCalculator,
  FaLanguage,
  FaSwimmer,
  FaBaseballBall,
  FaPiano,
  FaMicrophone,
  FaGuitar,
  FaDumbbell,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const subjects = [
  { icon: <FaCalculator size={22} />, name: "Math" },
  { icon: <FaLanguage size={22} />, name: "French" },
  { icon: <FaLanguage size={22} />, name: "English" },
  { icon: <FaSwimmer size={22} />, name: "Swimming" },
  { icon: <FaBaseballBall size={22} />, name: "Tennis" },
  { icon: <FaPiano size={22} />, name: "Piano" },
  { icon: <FaMicrophone size={22} />, name: "Singing" },
  { icon: <FaGuitar size={22} />, name: "Guitar" },
  { icon: <FaDumbbell size={22} />, name: "Personal Trainer" }
];

const SubjectCarousel = ({ onSubjectClick, selectedSubject }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-pink-100 to-pink-200 py-6 px-10 rounded-3xl shadow-inner my-6 mx-auto max-w-6xl">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* Scrollable subjects */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-8 scrollbar-hide px-6"
      >
        {subjects.map((subject, index) => {
          const isActive = selectedSubject === subject.name;
          return (
            <button
              key={index}
              onClick={() => onSubjectClick(subject.name)}
              className={`flex flex-col items-center min-w-[80px] text-center text-sm transition focus:outline-none ${
                isActive
                  ? "text-pink-600 font-bold"
                  : "text-gray-800 hover:text-pink-600"
              }`}
            >
              <div
                className={`p-3 rounded-full shadow mb-2 ${
                  isActive ? "bg-white border-2 border-pink-500" : "bg-white"
                }`}
              >
                {subject.icon}
              </div>
              <span className="font-medium">{subject.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default SubjectCarousel;
