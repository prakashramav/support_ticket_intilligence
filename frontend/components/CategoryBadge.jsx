import React from 'react';
import { cn } from '../lib/utils';

export default function CategoryBadge({ category, className }) {
  const colors = {
    'PAYMENT': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    'ACCOUNT': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    'TECHNICAL': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    'REFUND': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800',
    'BILLING': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  };

  const defaultColor = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  
  const categoryKey = Object.keys(colors).find(key => category?.toUpperCase().includes(key)) || 'DEFAULT';
  const colorClass = categoryKey !== 'DEFAULT' ? colors[categoryKey] : defaultColor;

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', colorClass, className)}>
      {category}
    </span>
  );
}
