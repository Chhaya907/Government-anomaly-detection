import api from './api';

export const dashboardService = {
  getMetrics: async () => {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },

  getRecentAlerts: async () => {
    const response = await api.get('/dashboard/recent-alerts');
    return response.data;
  },

  getRiskDistribution: async () => {
    const response = await api.get('/dashboard/risk-distribution');
    return response.data;
  },

  getDistrictPerformance: async () => {
    const response = await api.get('/dashboard/district-performance');
    return response.data;
  },
};

export default dashboardService;
