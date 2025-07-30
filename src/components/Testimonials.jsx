import React from "react";

const testimonials = [
  {
    name: "Aisha Rahman",
    quote: "The tutoring helped me understand calculus in a way school never could. I finally passed with confidence!",
    image: "https://randomuser.me/api/portraits/women/82.jpg",
    rating: 5
  },
  {
    name: "Mateo Alvarez",
    quote: "I booked an English tutor and my writing has drastically improved. Super professional and easy to work with.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5
  },
  {
    name: "Emily Chen",
    quote: "Einheit matched me with a great physics tutor. The UI is clean and the experience was smooth from start to finish.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4
  }
];

function Testimonials() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow text-center transition hover:shadow-md"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-yellow-400 mt-1">
                {"★".repeat(t.rating)}{" "}
                <span className="text-gray-300">
                  {"★".repeat(5 - t.rating)}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-4 italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
