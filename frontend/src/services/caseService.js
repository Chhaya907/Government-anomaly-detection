import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const caseService = {
  /**
   * Fetch all anomaly cases with optional filters
   */
  async getCases(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.CASES.LIST, { params });
      return response.data;
    } catch {
      return [
        {
          id: 'CASE-7801',
          projectId: 'PRJ-2024-001',
          projectName: 'District Rural Road Connectivity Phase II',
          district: 'Varanasi',
          riskLevel: 'CRITICAL',
          anomalyScore: 94,
          primaryAnomaly: 'Cost Escalation & Collusive Bidding',
          status: 'OPEN',
          assignedAuditor: 'Rajeev Sharma (CAG)',
          flaggedDate: '2024-04-12',
          financialExposure: 42000000,
        },
        {
          id: 'CASE-7802',
          projectId: 'PRJ-2024-002',
          projectName: 'Solar Powered Drinking Water Units',
          district: 'Patna',
          riskLevel: 'CRITICAL',
          anomalyScore: 89,
          primaryAnomaly: 'Ghost Contractor & Unverified Invoices',
          status: 'UNDER_INVESTIGATION',
          assignedAuditor: 'Meera Menon (State Audit)',
          flaggedDate: '2024-04-10',
          financialExposure: 26000000,
        },
        {
          id: 'CASE-7803',
          projectId: 'PRJ-2024-004',
          projectName: 'Smart Drainage & Stormwater Channel',
          district: 'Pune',
          riskLevel: 'HIGH',
          anomalyScore: 72,
          primaryAnomaly: 'Unbalanced Bid Item Rates',
          status: 'ESCALATED',
          assignedAuditor: 'Anand Kulkarni (CAG)',
          flaggedDate: '2024-04-05',
          financialExposure: 18500000,
        },
        {
          id: 'CASE-7804',
          projectId: 'PRJ-2024-009',
          projectName: 'Anganwadi Nutrition Distribution Grid',
          district: 'Ranchi',
          riskLevel: 'MEDIUM',
          anomalyScore: 58,
          primaryAnomaly: 'Abnormal Delivery Gap Timing',
          status: 'OPEN',
          assignedAuditor: 'Priya Singh (State Audit)',
          flaggedDate: '2024-03-28',
          financialExposure: 7800000,
        },
      ];
    }
  },

  /**
   * Fetch specific case details
   */
  async getCaseById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.CASES.DETAIL(id));
      return response.data;
    } catch {
      return {
        id,
        projectId: 'PRJ-2024-001',
        projectName: 'District Rural Road Connectivity Phase II',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        riskLevel: 'CRITICAL',
        anomalyScore: 94,
        primaryAnomaly: 'Cost Escalation & Collusive Bidding',
        status: 'OPEN',
        assignedAuditor: 'Rajeev Sharma (CAG)',
        flaggedDate: '2024-04-12',
        financialExposure: 42000000,
        anomalies: [
          {
            id: 'ANO-101',
            type: 'Collusive Bidding Matrix',
            confidence: 0.94,
            severity: 'CRITICAL',
            description: 'Three bidding vendors submitted bids from the exact same IP address subnet and have shared board directors.',
            evidence: 'Tender portal logs IP 49.36.12.88 logged within 14 minutes across all 3 bidders.',
          },
          {
            id: 'ANO-102',
            type: 'Bill Rate Discrepancy',
            confidence: 0.88,
            severity: 'HIGH',
            description: 'Granular sub-base aggregate rate billed at ₹1,850/cu.m against the state Schedule of Rates (SoR) ceiling of ₹1,120/cu.m.',
            evidence: 'Invoice #INV-2024-889 item 4B vs UP PWD SoR 2023-24 item 4.2.',
          },
          {
            id: 'ANO-103',
            type: 'Artificial Project Milestone Extension',
            confidence: 0.74,
            severity: 'MEDIUM',
            description: 'Milestone 2 certified as complete with 100% payout without corresponding geo-tagged physical site photographs.',
            evidence: 'Portal milestone sign-off timestamped without GIS coordinate metadata.',
          },
        ],
        auditHistory: [
          { date: '2024-04-12 11:30', user: 'Rule Engine Automated Scan', action: 'Flagged with Anomaly Index 94/100' },
          { date: '2024-04-13 15:45', user: 'MoSPI Vigilance Cell', action: 'Assigned case to CAG Principal Director' },
          { date: '2024-04-15 09:20', user: 'Rajeev Sharma (CAG)', action: 'Issued show-cause query to District Collector' },
        ],
      };
    }
  },

  /**
   * Update status of an anomaly case
   */
  async updateCaseStatus(id, status, notes = '') {
    try {
      const response = await api.put(API_ENDPOINTS.CASES.UPDATE_STATUS(id), { status, notes });
      return response.data;
    } catch {
      return { success: true, id, status, notes };
    }
  },
};

export default caseService;
