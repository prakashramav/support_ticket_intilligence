import React from 'react';

export default function ConfidenceScore({ score, className }) {
  const percentage = Math.round(score * 100);
  
  let colorClass = 'text-green-600 dark:text-green-400';
  let barColor = 'bg-green-500';
  
  if (percentage < 60) {
    colorClass = 'text-red-600 dark:text-red-400';
    barColor = 'bg-red-500';
  } else if (percentage < 80) {
    colorClass = 'text-yellow-600 dark:text-yellow-400';
    barColor = 'bg-yellow-500';
  }

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <div className="flex-grow bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 max-w-[100px]">
        <div className={`h-2.5 rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className={`text-sm font-medium ${colorClass}`}>{percentage}%</span>
    </div>
  );
}
