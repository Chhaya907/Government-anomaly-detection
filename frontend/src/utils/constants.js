// Application Constants

export const ROLES = {
  MOSPI: 'MOSPI',
  DISTRICT: 'DISTRICT',
  AUDITOR: 'AUDITOR',
  MP: 'MP',
  CITIZEN: 'CITIZEN',
};

export const ROLE_LABELS = {
  [ROLES.MOSPI]: 'MoSPI Central Officer',
  [ROLES.DISTRICT]: 'District Magistrate / Officer',
  [ROLES.AUDITOR]: 'CAG / State Auditor',
  [ROLES.MP]: 'Member of Parliament (MP)',
  [ROLES.CITIZEN]: 'Citizen Monitor',
};

export const RISK_LEVELS = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

export const CASE_STATUS = {
  OPEN: 'OPEN',
  UNDER_INVESTIGATION: 'UNDER_INVESTIGATION',
  RESOLVED: 'RESOLVED',
  DISMISSED: 'DISMISSED',
  ESCALATED: 'ESCALATED',
};

export const PROJECT_STATUS = {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DELAYED: 'DELAYED',
  SUSPENDED: 'SUSPENDED',
};

export const SCHEMES = [
  'MPLADS',
  'PMGSY (Gram Sadak Yojana)',
  'Jal Jeevan Mission',
  'Smart Cities Mission',
  'MGNREGA',
  'Ayushman Bharat Infrastructure',
];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    SEND_OTP: '/auth/citizen/send-otp',
    VERIFY_OTP: '/auth/citizen/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id) => `/projects/${id}`,
    STATISTICS: '/projects/statistics',
  },
  CASES: {
    LIST: '/cases',
    DETAIL: (id) => `/cases/${id}`,
    UPDATE_STATUS: (id) => `/cases/${id}/status`,
    ANOMALIES: (id) => `/cases/${id}/anomalies`,
  },
  VENDORS: {
    LIST: '/vendors',
    DETAIL: (id) => `/vendors/${id}`,
  },
  REPORTS: {
    LIST: '/reports',
    GENERATE: '/reports/generate',
    DOWNLOAD: (id) => `/reports/${id}/download`,
  },
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    RECENT_ALERTS: '/dashboard/recent-alerts',
    RISK_DISTRIBUTION: '/dashboard/risk-distribution',
    DISTRICT_PERFORMANCE: '/dashboard/district-performance',
  },
};
