import React from 'react';

/**
 * A simple toggle switch for dark mode. When clicked it will call the
 * `toggle` prop to invert the current theme. We use inline SVG icons for
 * the sun and moon so there are no external dependencies. The component
 * is positioned fixed in the top‑right corner of the viewport.
 *
 * @param {boolean} isDark Whether the dark theme is active
 * @param {() => void} toggle Callback invoked when the toggle is clicked
 */
function DarkModeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="fixed z-50 top-4 right-4 p-2 rounded-full bg-white dark:bg-darkCard shadow-md hover:shadow-lg transition"
    >
      {isDark ? (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25M12 18.75V21M4.219 4.219l1.594 1.594M17.187 17.187l1.593 1.594M3 12h2.25M18.75 12H21M4.219 19.781l1.594-1.594M17.187 6.813l1.593-1.594M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-indigo-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112.75 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.366 2.996-8.033 7.105-9.288a.75.75 0 01.909.909 7.501 7.501 0 0010.738 8.131.75.75 0 01.0-.0z"
          />
        </svg>
      )}
    </button>
  );
}

export default DarkModeToggle;