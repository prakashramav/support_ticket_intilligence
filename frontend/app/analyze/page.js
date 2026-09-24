'use client';

import React, { useState } from 'react';
import TicketInput from '../../components/TicketInput';
import PredictionCard from '../../components/PredictionCard';
import ExplanationCard from '../../components/ExplanationCard';
import ErrorState from '../../components/ErrorState';
import { api } from '../../lib/api';

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (text) => {
    setIsAnalyzing(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await api.analyzeTicket(text);
      setPrediction(result);
    } catch (err) {
      setError(err.message || 'Unable to analyze the ticket. Please check that the ML service is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            Analyze Support Ticket
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter a support ticket below to get ML-powered insights instantly.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <TicketInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
        </div>
      </div>

      {error && (
        <div className="mb-8">
          <ErrorState message={error} />
        </div>
      )}

      {prediction && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PredictionCard prediction={prediction} />
          {prediction.explanation && (
            <ExplanationCard explanation={prediction.explanation} />
          )}
        </div>
      )}
    </div>
  );
}
