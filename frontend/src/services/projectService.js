import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const projectService = {
  /**
   * Get list of government projects with optional filters
   */
  async getProjects(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.LIST, { params });
      return response.data;
    } catch (error) {
      console.warn('API call failed, returning mock data for development', error);
      return [
        {
          id: 'PRJ-2024-001',
          name: 'District Rural Road Connectivity Phase II',
          scheme: 'PMGSY (Gram Sadak Yojana)',
          district: 'Varanasi',
          state: 'Uttar Pradesh',
          sanctionedAmount: 145000000,
          expenditure: 132000000,
          status: 'IN_PROGRESS',
          riskLevel: 'HIGH',
          anomalyScore: 78,
          vendorName: 'Apex Infra Projects Pvt Ltd',
          completionRate: 64,
          startDate: '2023-08-15',
          expectedEndDate: '2024-12-30',
        },
        {
          id: 'PRJ-2024-002',
          name: 'Solar Powered Drinking Water Units',
          scheme: 'Jal Jeevan Mission',
          district: 'Patna',
          state: 'Bihar',
          sanctionedAmount: 48000000,
          expenditure: 46500000,
          status: 'DELAYED',
          riskLevel: 'CRITICAL',
          anomalyScore: 92,
          vendorName: 'Surya Green Tech Ltd',
          completionRate: 41,
          startDate: '2023-11-01',
          expectedEndDate: '2024-06-30',
        },
        {
          id: 'PRJ-2024-003',
          name: 'Community Health Centre Modernisation',
          scheme: 'Ayushman Bharat Infrastructure',
          district: 'Indore',
          state: 'Madhya Pradesh',
          sanctionedAmount: 85000000,
          expenditure: 42000000,
          status: 'IN_PROGRESS',
          riskLevel: 'LOW',
          anomalyScore: 14,
          vendorName: 'MedTech Construction Corp',
          completionRate: 55,
          startDate: '2024-01-10',
          expectedEndDate: '2025-03-31',
        },
        {
          id: 'PRJ-2024-004',
          name: 'Smart Drainage & Stormwater Channel',
          scheme: 'Smart Cities Mission',
          district: 'Pune',
          state: 'Maharashtra',
          sanctionedAmount: 210000000,
          expenditure: 195000000,
          status: 'IN_PROGRESS',
          riskLevel: 'MEDIUM',
          anomalyScore: 56,
          vendorName: 'Urban Flow Engineering',
          completionRate: 80,
          startDate: '2023-04-01',
          expectedEndDate: '2024-11-15',
        },
      ];
    }
  },

  /**
   * Get single project details by ID
   */
  async getProjectById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.DETAIL(id));
      return response.data;
    } catch {
      return {
        id,
        name: 'District Rural Road Connectivity Phase II',
        scheme: 'PMGSY (Gram Sadak Yojana)',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        sanctionedAmount: 145000000,
        expenditure: 132000000,
        status: 'IN_PROGRESS',
        riskLevel: 'HIGH',
        anomalyScore: 78,
        vendorName: 'Apex Infra Projects Pvt Ltd',
        contractorGstin: '09AAACA1122D1Z5',
        completionRate: 64,
        startDate: '2023-08-15',
        expectedEndDate: '2024-12-30',
        flaggedAnomalies: [
          'Material cost inflation exceeding CPWD benchmark by 38%',
          'Duplicate billing identified in sub-base stone aggregates',
          'Vendor has 3 shell company ties flagged by MCA database',
        ],
      };
    }
  },

  /**
   * Get summary statistics across projects
   */
  async getStatistics() {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.STATISTICS);
      return response.data;
    } catch {
      return {
        totalProjects: 1420,
        totalBudgetSanctioned: 52400000000,
        highRiskProjects: 114,
        totalAnomaliesDetected: 328,
      };
    }
  },
};

export default projectService;
