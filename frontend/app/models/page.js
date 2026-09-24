'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { Database, Cpu, Activity } from 'lucide-react';

export default function ModelsPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getModels();
      // Ensure data is array
      setModels(Array.isArray(data) ? data : (data.models || []));
    } catch (err) {
      setError(err.message || 'Failed to load model information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  if (loading) return <div className="mt-20"><LoadingState message="Loading models..." /></div>;
  if (error) return <div className="mt-20 max-w-4xl mx-auto"><ErrorState message={error} onRetry={fetchModels} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
          Model Information
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Details about the machine learning models currently deployed in production.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-md p-3">
                  <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {model.name || 'Unknown Model'}
                  </dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    Version: {model.version || '1.0.0'}
                  </dd>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <Cpu className="mr-2 h-4 w-4" />
                      Model Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {model.model_type || 'Classification'}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Performance
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 mt-2">
                        {model.metrics && Object.entries(model.metrics).map(([key, value]) => (
                          <li key={key} className="pl-3 pr-4 py-2 flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">
                              {typeof value === 'number' ? value.toFixed(4) : value}
                            </span>
                          </li>
                        ))}
                        {(!model.metrics || Object.keys(model.metrics).length === 0) && (
                          <li className="pl-3 pr-4 py-2 text-sm text-gray-500 italic">No metrics available</li>
                        )}
                      </ul>
                    </dd>
                  </div>
                  
                  {model.features && (
                    <div className="sm:col-span-2 mt-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Features</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <div className="flex flex-wrap gap-2">
                          {model.features.map(f => (
                            <span key={f} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {f}
                            </span>
                          ))}
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        ))}
        {models.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
            No models found in the system.
          </div>
        )}
      </div>
    </div>
  );
}
