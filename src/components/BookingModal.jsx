import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function BookingModal({ tutorName, onClose }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE,
      process.env.REACT_APP_EMAILJS_TEMPLATE,
      formRef.current,
      process.env.REACT_APP_EMAILJS_PUBLIC
    )
    .then(() => {
      setSent(true);
      setLoading(false);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      setLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book {tutorName}</h2>
        
        {!sent ? (
          <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
            <input type="hidden" name="tutor" value={tutorName} />
            <input name="name" placeholder="Your name" required className="border p-2 w-full" />
            <input name="email" type="email" placeholder="Your email" required className="border p-2 w-full" />
            <input name="slot" placeholder="Preferred date/time" className="border p-2 w-full" />
            <textarea name="message" placeholder="Notes" className="border p-2 w-full"></textarea>
            
            <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded w-full">
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        ) : (
          <p className="text-green-600">Your booking request has been sent!</p>
        )}

        <button onClick={onClose} className="mt-4 text-gray-500">Close</button>
      </div>
    </div>
  );
}
