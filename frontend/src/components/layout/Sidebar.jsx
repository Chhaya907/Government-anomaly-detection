import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || ROLES.MOSPI;

  const getDashboardPath = () => {
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
        return '/dashboard/mospi';
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo.png" alt="National Emblem / Portal" className="sidebar-logo" />
        <div>
          <div className="sidebar-title">NPF-ADS</div>
          <div className="sidebar-subtitle">Finance Anomaly Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Core Overview</div>
        <NavLink
          to={getDashboardPath()}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">📊</span>
          <span>Role Dashboard</span>
        </NavLink>

        <div className="nav-section-title" style={{ marginTop: '1rem' }}>Investigation & Audit</div>
        <NavLink
          to="/projects"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">📁</span>
          <span>Public Projects</span>
        </NavLink>

        <NavLink
          to="/cases"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">🚨</span>
          <span>Anomaly Cases</span>
        </NavLink>

        <NavLink
          to="/vendors"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">🏢</span>
          <span>Contractor Watch</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">📄</span>
          <span>Audit Reports</span>
        </NavLink>

        <div className="nav-section-title" style={{ marginTop: '1rem' }}>Preferences</div>
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">⚙️</span>
          <span>System Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Authorized Officer'}</div>
            <div className="user-role">{role} Access</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
