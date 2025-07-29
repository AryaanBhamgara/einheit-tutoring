import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TutorProfile from './pages/TutorProfile';
import DarkModeToggle from './components/DarkModeToggle';
import NotFound from './pages/NotFound';
import Testimonials from "./components/Testimonials";

/**
 * The root component sets up routing and dark mode for the application.
 *
 * A class of `dark` is toggled on the `<html>` element to enable Tailwind's
 * dark mode styles. The toggle button lives in a fixed position in the top
 * right of the viewport so it's accessible on all pages.
 */
function App() {
  const [isDark, setIsDark] = useState(false);

  // Apply or remove the `dark` class on the <html> element when the theme
  // state changes. Tailwind will pick up this class to style elements.
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      {/* Dark mode toggle sits outside of the routed content so it's always visible */}
      <DarkModeToggle isDark={isDark} toggle={() => setIsDark((prev) => !prev)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;