import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mb-4" />
      <p className="text-gray-600 dark:text-gray-300 font-medium">{message}</p>
    </div>
  );
}
