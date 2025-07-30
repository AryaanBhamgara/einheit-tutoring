import React from "react";

const testimonials = [
  {
    name: "Leila R.",
    quote:
      "Einheit Tutoring helped me finally understand Grade 12 math. My tutor was patient and super clear.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Marcus T.",
    quote:
      "I improved my essay writing within just a few sessions. Great experience!",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Sofia D.",
    quote:
      "The IT sessions were hands-on and practical — exactly what I needed.",
    image: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "Amina S.",
    quote: "Guitar lessons reignited my passion for music!",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-white py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10">What Students Say</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-pink-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-pink-300"
            />
            <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
            <p className="font-semibold text-pink-600">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
