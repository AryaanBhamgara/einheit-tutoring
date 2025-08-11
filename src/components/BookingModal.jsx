import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function BookingModal({ open, onClose, tutorName }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      alert("Thanks! Your booking request was sent.");
      onClose?.();
    } catch (err) {
      alert("Oops—couldn’t send. Please try again.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Book {tutorName}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="px-6 py-5 space-y-3">
          {/* Hidden tutor field for the email template */}
          <input type="hidden" name="tutor" value={tutorName} />

          <div>
            <label className="block text-sm mb-1">Your name</label>
            <input name="name" required className="w-full border rounded-md px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" required className="w-full border rounded-md px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Preferred date/time</label>
            <input name="slot" placeholder="e.g., Tue 6:30 PM" className="w-full border rounded-md px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea name="message" rows={3} className="w-full border rounded-md px-3 py-2"/>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
