import { ROLES } from './constants';

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
 * Check if the user is a central authority or auditor
 * @param {string} role
 * @returns {boolean}
 */
export const isAuthorityRole = (role) => {
  return [ROLES.MOSPI, ROLES.AUDITOR, ROLES.DISTRICT].includes(role);
};
