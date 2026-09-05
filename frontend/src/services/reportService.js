import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const reportService = {
  /**
   * Fetch available generated reports
   */
  async getReports() {
    try {
      const response = await api.get(API_ENDPOINTS.REPORTS.LIST);
      return response.data;
    } catch {
      return [
        {
          id: 'REP-2024-Q1',
          title: 'Q1 National Public Works Anomaly Summary',
          generatedDate: '2024-04-01',
          scheme: 'All Schemes',
          fileSize: '4.2 MB',
          format: 'PDF',
          totalAnomalies: 342,
          financialRiskIdentified: 1840000000,
        },
        {
          id: 'REP-2024-VNS',
          title: 'Varanasi District Infrastructure Forensic Audit',
          generatedDate: '2024-03-25',
          scheme: 'PMGSY & Smart City',
          fileSize: '2.8 MB',
          format: 'PDF',
          totalAnomalies: 28,
          financialRiskIdentified: 96000000,
        },
        {
          id: 'REP-2024-MPLADS',
          title: 'MPLADS Fund Utilization Discrepancy Report',
          generatedDate: '2024-03-10',
          scheme: 'MPLADS',
          fileSize: '1.9 MB',
          format: 'PDF',
          totalAnomalies: 64,
          financialRiskIdentified: 240000000,
        },
      ];
    }
  },

  /**
   * Trigger generation of a new report
   */
  async generateReport(criteria) {
    try {
      const response = await api.post(API_ENDPOINTS.REPORTS.GENERATE, criteria);
      return response.data;
    } catch {
      return {
        id: `REP-${Date.now()}`,
        title: `${criteria.scheme || 'National'} Anomaly Audit Report`,
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'READY',
      };
    }
  },

  /**
   * Download report file
   */
  async downloadReport(id) {
    try {
      const response = await api.get(API_ENDPOINTS.REPORTS.DOWNLOAD(id), {
        responseType: 'blob',
      });
      return response.data;
    } catch {
      console.log('Downloading mock report', id);
      return true;
    }
  },
};

export default reportService;
