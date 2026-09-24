import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700 dark:text-red-400">
            {message || 'Unable to process the request. Please try again.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 flex items-center text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
            >
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
