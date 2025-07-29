import React from 'react';

/**
 * A set of filters allowing the user to narrow tutor results by subject and
 * hourly rate. The component expects the caller to manage state and pass
 * handlers for updates.
 *
 * Props:
 *   subjects: array of unique subjects to populate the dropdown
 *   selectedSubject: currently selected subject filter or '' for all
 *   onSubjectChange: callback for when the subject filter changes
 *   minRate: minimum hourly rate filter
 *   maxRate: maximum hourly rate filter
 *   onMinRateChange: callback for min rate change
 *   onMaxRateChange: callback for max rate change
 */
export default function Filters({
  subjects,
  selectedSubject,
  onSubjectChange,
  minRate,
  maxRate,
  onMinRateChange,
  onMaxRateChange,
}) {
  return (
    <div className="bg-white dark:bg-darkCard rounded-lg shadow p-4 flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Subject</label>
        <select
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          <option value="">All subjects</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Min rate ($)</label>
        <input
          type="number"
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
          placeholder="0"
          value={minRate}
          onChange={(e) => onMinRateChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Max rate ($)</label>
        <input
          type="number"
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-darkBg"
          placeholder="100"
          value={maxRate}
          onChange={(e) => onMaxRateChange(e.target.value)}
        />
      </div>
    </div>
  );
}