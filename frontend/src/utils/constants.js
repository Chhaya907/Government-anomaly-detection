// Application Constants

export const ROLES = {
  MOSPI: 'MOSPI',
  DISTRICT: 'DISTRICT',
  AUDITOR: 'AUDITOR',
  MP: 'MP',
  CITIZEN: 'CITIZEN',
};

export const ROLE_LABELS = {
  [ROLES.MOSPI]: 'MoSPI Central Admin',
  [ROLES.DISTRICT]: 'District Officer',
  [ROLES.AUDITOR]: 'Auditor / Investigator',
  [ROLES.MP]: 'Member of Parliament (MP)',
  [ROLES.CITIZEN]: 'Citizen (Public Transparency)',
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

// Citizen-Facing Simplified Project Status
export const CITIZEN_PROJECT_STATUS = {
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  PENDING: 'Pending / Remaining',
};

export const SCHEMES = [
  'MPLADS',
  'PMGSY (Gram Sadak Yojana)',
  'Jal Jeevan Mission',
  'Smart Cities Mission',
  'MGNREGA',
  'Ayushman Bharat Infrastructure',
];

export const PERMISSIONS = {
  // Projects
  VIEW_ALL_PROJECTS: 'VIEW_ALL_PROJECTS',
  VIEW_DISTRICT_PROJECTS: 'VIEW_DISTRICT_PROJECTS',
  VIEW_CONSTITUENCY_PROJECTS: 'VIEW_CONSTITUENCY_PROJECTS',
  VIEW_PUBLIC_PROJECTS: 'VIEW_PUBLIC_PROJECTS',
  VIEW_CONFIDENTIAL_FINANCIALS: 'VIEW_CONFIDENTIAL_FINANCIALS',
  SUBMIT_PROJECT_REVISION: 'SUBMIT_PROJECT_REVISION',
  APPROVE_PROJECT_REVISION: 'APPROVE_PROJECT_REVISION',

  // Anomaly Cases & Evidence
  VIEW_ALL_CASES: 'VIEW_ALL_CASES',
  VIEW_DISTRICT_CASES: 'VIEW_DISTRICT_CASES',
  VIEW_ASSIGNED_CASES: 'VIEW_ASSIGNED_CASES',
  VIEW_CONFIDENTIAL_EVIDENCE: 'VIEW_CONFIDENTIAL_EVIDENCE',
  UPDATE_INVESTIGATION: 'UPDATE_INVESTIGATION',
  ASSIGN_INVESTIGATION: 'ASSIGN_INVESTIGATION',

  // Vendors & Cartels
  VIEW_VENDOR_WATCHLIST: 'VIEW_VENDOR_WATCHLIST',

  // Reports
  VIEW_INTERNAL_AUDIT_REPORTS: 'VIEW_INTERNAL_AUDIT_REPORTS',
  VIEW_DISTRICT_REPORTS: 'VIEW_DISTRICT_REPORTS',
  VIEW_CONSTITUENCY_REPORTS: 'VIEW_CONSTITUENCY_REPORTS',
  VIEW_PUBLIC_REPORTS: 'VIEW_PUBLIC_REPORTS',
  GENERATE_NATIONWIDE_REPORTS: 'GENERATE_NATIONWIDE_REPORTS',

  // Administration & System
  MANAGE_USERS_AND_ROLES: 'MANAGE_USERS_AND_ROLES',
  CONFIGURE_SYSTEM_SETTINGS: 'CONFIGURE_SYSTEM_SETTINGS',

  // Citizen Actions
  SUBMIT_CITIZEN_GRIEVANCE: 'SUBMIT_CITIZEN_GRIEVANCE',
};

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
