import React from 'react';
import CategoryBadge from './CategoryBadge';
import PriorityBadge from './PriorityBadge';
import SentimentBadge from './SentimentBadge';
import ConfidenceScore from './ConfidenceScore';

export default function PredictionCard({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Analysis Results
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Machine learning predictions for this ticket.
        </p>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <CategoryBadge category={prediction.category} />
              <div className="mt-2">
                <ConfidenceScore score={prediction.confidence?.category || prediction.confidence || 0} />
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <PriorityBadge priority={prediction.priority} />
              <div className="mt-2">
                <ConfidenceScore score={prediction.confidence?.priority || prediction.confidence || 0} />
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Sentiment</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <SentimentBadge sentiment={prediction.sentiment} />
              <div className="mt-2">
                <ConfidenceScore score={prediction.confidence?.sentiment || prediction.confidence || 0} />
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
