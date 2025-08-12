import React from "react";

const testimonials = [
  {
    name: "Aisha Rahman",
    quote:
      "I finally understood calculus and boosted my grade. The one-on-one sessions were a game changer.",
    image: "https://randomuser.me/api/portraits/women/82.jpg",
    rating: 5,
  },
  {
    name: "Mateo Alvarez",
    quote:
      "My writing improved in just a month. Clear feedback and practical exercises that actually helped.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5,
  },
  {
    name: "Emily Chen",
    quote:
      "Friendly and patient tutors. Booking a session was fast and the lessons were tailored to me.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-darkCard py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Students Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl border shadow-sm p-6 bg-white dark:bg-darkCard"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h3 className="font-semibold">{t.name}</h3>
                <div
                  className="text-yellow-500 my-1"
                  aria-label={`Rating ${t.rating} out of 5`}
                >
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  “{t.quote}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
