import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.png';

// Sample testimonials data. In a real application these could come from
// a database or CMS. Each testimonial includes a name, quote and a
// royalty‑free image URL from Unsplash.
const testimonials = [
  {
    name: 'Emily R.',
    quote:
      'Thanks to Einheit Tutoring I finally understood calculus. My tutor was patient and explained concepts in a way that made sense.',
    image:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Marcus T.',
    quote:
      'I improved my English writing skills dramatically. The online lessons were interactive and tailored to my needs.',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Sophia K.',
    quote:
      'The platform made it easy to find a nearby guitar tutor. Booking a lesson was simple and the experience exceeded my expectations.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

/**
 * A section showcasing testimonials from satisfied students. The section uses
 * a decorative abstract image as a background and displays testimonial
 * cards. Each card fades up into view when scrolled into the viewport.
 */
export default function TestimonialSection() {
  return (
    <section
      className="relative bg-cover bg-center py-16 text-gray-900 dark:text-darkText"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* overlay to soften the background */}
      <div className="absolute inset-0 bg-white/70 dark:bg-darkBg/70" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What our students say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-darkCard rounded-lg shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <p className="italic mb-2">“{t.quote}”</p>
              <p className="font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}