'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import CategoryBadge from '../../components/CategoryBadge';
import PriorityBadge from '../../components/PriorityBadge';
import SentimentBadge from '../../components/SentimentBadge';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple filters
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPredictionHistory();
      // Assume API returns { items: [...] } or just an array
      setHistory(Array.isArray(data) ? data : (data.items || []));
    } catch (err) {
      setError(err.message || 'Failed to load ticket history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => {
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (priorityFilter && item.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            Prediction History
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            A list of all recently analyzed support tickets.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
           <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Categories</option>
            <option value="PAYMENT">Payment</option>
            <option value="ACCOUNT">Account</option>
            <option value="TECHNICAL">Technical</option>
            <option value="REFUND">Refund</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {loading && <LoadingState message="Loading history..." />}
      {error && <ErrorState message={error} onRetry={fetchHistory} />}

      {!loading && !error && (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Ticket Text
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Sentiment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredHistory.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-200 line-clamp-2 max-w-md">
                            {item.text}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <CategoryBadge category={item.category} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <PriorityBadge priority={item.priority} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <SentimentBadge sentiment={item.sentiment} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.timestamp || Date.now()).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {filteredHistory.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          No tickets found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
