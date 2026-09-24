const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: response.statusText };
      }
      
      const errorMessage = errorData.error?.message || errorData.detail || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  analyzeTicket: async (text) => {
    return fetchAPI('/api/v1/predict', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
  
  analyzeBatch: async (tickets) => {
    return fetchAPI('/api/v1/predict/batch', {
      method: 'POST',
      body: JSON.stringify(tickets),
    });
  },

  getPredictionHistory: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/v1/predictions/history${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  getAnalytics: async () => {
    return fetchAPI('/api/v1/analytics/summary');
  },

  getModels: async () => {
    return fetchAPI('/api/v1/models');
  },

  getHealth: async () => {
    return fetchAPI('/api/v1/health');
  },
};
