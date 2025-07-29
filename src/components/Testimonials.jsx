import React from "react";

const testimonials = [
  {
    name: "Sophia Hernandez",
    quote: "Einheit Tutoring helped me finally pass college math. The tutors were so patient and kind!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    name: "Adam Singh",
    quote: "Super easy to use. I booked a physics tutor and got help the same evening!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Noor Khalid",
    quote: "Clean UI, amazing tutors, and great customer service. Highly recommend.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
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
            <div key={index} className="bg-white p-6 rounded-xl shadow text-center">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-yellow-400 mt-1">{"★".repeat(t.rating)}</p>
              <p className="text-sm text-gray-600 mt-4">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
