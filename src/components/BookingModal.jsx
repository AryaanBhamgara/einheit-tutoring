import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// Read from .env / Vercel
const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function BookingModal({ open = false, onClose, tutorName }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSending(false);
      setError("Email service not configured. Please try again later.");
      console.warn("Missing EmailJS env vars (SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY).");
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSent(true);
      setTimeout(() => onClose?.(), 1200);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Couldn't send right now. Please try again in a minute.");
    } finally {
      setSending(false);
    }
  };

  // Close when clicking the backdrop
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-darkCard rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Book {tutorName}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="px-6 py-5 space-y-3">
          {/* These names MUST match your EmailJS template: tutor, name, email, slot, message */}
          <input type="hidden" name="tutor" value={tutorName || ""} />

          <div>
            <label className="block text-sm mb-1" htmlFor="name">Your name</label>
            <input id="name" name="name" required className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="slot">Preferred date/time</label>
            <input id="slot" name="slot" placeholder="e.g., Tue 6:30 PM" className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="message">Notes</label>
            <textarea id="message" name="message" rows={3} className="w-full border rounded-md px-3 py-2" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {sent && <p className="text-sm text-green-600">Your booking request has been sent ✓</p>}

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
