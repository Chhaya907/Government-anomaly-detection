import { ROLES, PERMISSIONS } from './constants';

/**
 * Granular permissions mapped to each system role
 */
export const ROLE_PERMISSIONS = {
  [ROLES.MOSPI]: [
    PERMISSIONS.VIEW_ALL_PROJECTS,
    PERMISSIONS.VIEW_CONFIDENTIAL_FINANCIALS,
    PERMISSIONS.APPROVE_PROJECT_REVISION,
    PERMISSIONS.VIEW_ALL_CASES,
    PERMISSIONS.VIEW_CONFIDENTIAL_EVIDENCE,
    PERMISSIONS.ASSIGN_INVESTIGATION,
    PERMISSIONS.VIEW_VENDOR_WATCHLIST,
    PERMISSIONS.VIEW_INTERNAL_AUDIT_REPORTS,
    PERMISSIONS.GENERATE_NATIONWIDE_REPORTS,
    PERMISSIONS.MANAGE_USERS_AND_ROLES,
    PERMISSIONS.CONFIGURE_SYSTEM_SETTINGS,
  ],
  [ROLES.DISTRICT]: [
    PERMISSIONS.VIEW_DISTRICT_PROJECTS,
    PERMISSIONS.VIEW_CONFIDENTIAL_FINANCIALS,
    PERMISSIONS.SUBMIT_PROJECT_REVISION,
    PERMISSIONS.VIEW_DISTRICT_CASES,
    PERMISSIONS.VIEW_CONFIDENTIAL_EVIDENCE,
    PERMISSIONS.UPDATE_INVESTIGATION,
    PERMISSIONS.VIEW_DISTRICT_REPORTS,
  ],
  [ROLES.AUDITOR]: [
    PERMISSIONS.VIEW_ASSIGNED_CASES,
    PERMISSIONS.VIEW_CONFIDENTIAL_EVIDENCE,
    PERMISSIONS.UPDATE_INVESTIGATION,
    PERMISSIONS.VIEW_VENDOR_WATCHLIST,
    PERMISSIONS.VIEW_INTERNAL_AUDIT_REPORTS,
  ],
  [ROLES.MP]: [
    PERMISSIONS.VIEW_CONSTITUENCY_PROJECTS,
    PERMISSIONS.VIEW_CONSTITUENCY_REPORTS,
  ],
  [ROLES.CITIZEN]: [
    PERMISSIONS.VIEW_PUBLIC_PROJECTS,
    PERMISSIONS.VIEW_PUBLIC_REPORTS,
    PERMISSIONS.SUBMIT_CITIZEN_GRIEVANCE,
  ],
};

/**
 * Returns the default home dashboard route for a given user role
 * @param {string} role
 * @returns {string}
 */
export const getHomeRouteForRole = (role) => {
  switch (role) {
    case ROLES.MOSPI:
      return '/dashboard/mospi';
    case ROLES.DISTRICT:
      return '/dashboard/district';
    case ROLES.AUDITOR:
      return '/dashboard/auditor';
    case ROLES.MP:
      return '/dashboard/mp';
    case ROLES.CITIZEN:
      return '/dashboard/citizen';
    default:
      return '/login';
  }
};

/**
 * Check if a user role has permission to access a specific feature
 * @param {string} userRole
 * @param {string[]} allowedRoles
 * @returns {boolean}
 */
export const hasPermission = (userRole, allowedRoles = []) => {
  if (!userRole) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(userRole);
};

/**
 * Check if a role possesses a specific granular permission
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export const hasGranularPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

/**
 * Check if the user is a citizen
 * @param {string} role
 * @returns {boolean}
 */
export const isCitizenRole = (role) => {
  return role === ROLES.CITIZEN;
};

/**
 * Check if the user is a central authority or auditor
 * @param {string} role
 * @returns {boolean}
 */
export const isAuthorityRole = (role) => {
  return [ROLES.MOSPI, ROLES.AUDITOR, ROLES.DISTRICT].includes(role);
};

/**
 * Returns the exact authorized sidebar navigation items tailored per role
 * @param {string} role
 * @returns {Array<{ sectionTitle: string, items: Array<{ path: string, label: string, icon: string }> }>}
 */
export const getNavItemsForRole = (role) => {
  switch (role) {
    case ROLES.CITIZEN:
      return [
        {
          sectionTitle: 'Public Transparency',
          items: [
            { path: '/dashboard/citizen', label: 'Citizen Dashboard', icon: '📊' },
            { path: '/projects', label: 'Public Projects', icon: '📁' },
            { path: '/public-reports', label: 'Public Reports', icon: '📈' },
          ],
        },
      ];

    case ROLES.DISTRICT:
      return [
        {
          sectionTitle: 'District Management',
          items: [
            { path: '/dashboard/district', label: 'District Dashboard', icon: '📊' },
          ],
        },
        {
          sectionTitle: 'Local Operations',
          items: [
            { path: '/projects', label: 'District Projects', icon: '📁' },
            { path: '/cases', label: 'Anomaly Inquiries', icon: '🚨' },
            { path: '/revisions', label: 'Revision Requests', icon: '📝' },
            { path: '/reports', label: 'District Reports', icon: '📄' },
          ],
        },
      ];

    case ROLES.AUDITOR:
      return [
        {
          sectionTitle: 'Investigation Console',
          items: [
            { path: '/dashboard/auditor', label: 'Auditor Dashboard', icon: '📊' },
          ],
        },
        {
          sectionTitle: 'Forensic Audit',
          items: [
            { path: '/cases', label: 'Assigned Cases', icon: '🚨' },
            { path: '/vendors', label: 'Contractor Dossiers', icon: '🏢' },
            { path: '/reports', label: 'Forensic Reports', icon: '📄' },
          ],
        },
      ];

    case ROLES.MP:
      return [
        {
          sectionTitle: 'Constituency Monitoring',
          items: [
            { path: '/dashboard/mp', label: 'Constituency Dashboard', icon: '📊' },
          ],
        },
        {
          sectionTitle: 'Constituency Works',
          items: [
            { path: '/projects', label: 'Constituency Projects', icon: '📁' },
            { path: '/reports', label: 'Constituency Reports', icon: '📄' },
          ],
        },
      ];

    case ROLES.MOSPI:
    default:
      return [
        {
          sectionTitle: 'National Oversight',
          items: [
            { path: '/dashboard/mospi', label: 'MoSPI Admin Dashboard', icon: '📊' },
          ],
        },
        {
          sectionTitle: 'Nationwide Audit',
          items: [
            { path: '/projects', label: 'Nationwide Projects', icon: '📁' },
            { path: '/cases', label: 'Anomaly Registry', icon: '🚨' },
            { path: '/vendors', label: 'Contractor Watch', icon: '🏢' },
            { path: '/revisions', label: 'Revision Approvals', icon: '📝' },
            { path: '/reports', label: 'National Reports', icon: '📄' },
          ],
        },
        {
          sectionTitle: 'Administration',
          items: [
            { path: '/settings', label: 'System Settings', icon: '⚙️' },
          ],
        },
      ];
  }
};
