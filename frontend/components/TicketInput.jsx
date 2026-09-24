import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function TicketInput({ onAnalyze, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAnalyze(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="ticket-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Describe your support issue
        </label>
        <textarea
          id="ticket-text"
          rows={6}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-4 transition duration-150 ease-in-out"
          placeholder="e.g., My payment was deducted but the order is still pending. Can you please look into this?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
              Analyzing ticket...
            </>
          ) : (
            'Analyze Ticket'
          )}
        </button>
      </div>
    </form>
  );
}
