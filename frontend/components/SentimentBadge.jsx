import React from 'react';
import { cn } from '../lib/utils';

export default function SentimentBadge({ sentiment, className }) {
  const colors = {
    POSITIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    NEGATIVE: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    NEUTRAL: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };

  const defaultColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  const colorClass = colors[sentiment?.toUpperCase()] || defaultColor;

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', colorClass, className)}>
      {sentiment}
    </span>
  );
}
