import React from 'react';

export default function ExplanationCard({ explanation }) {
  if (!explanation || !explanation.important_terms || explanation.important_terms.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mt-6">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Why did the model make this prediction?
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Key terms that influenced the prediction.
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {explanation.important_terms.map((term, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
            >
              {term.term || term}
              {term.weight && (
                <span className="ml-2 text-xs text-indigo-500 dark:text-indigo-400">
                  {term.weight.toFixed(2)}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
