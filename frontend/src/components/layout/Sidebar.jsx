import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import { getNavItemsForRole } from '../../utils/roleUtils';
import logoImg from '../../assets/images/logo.png';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || ROLES.CITIZEN;
  const navSections = getNavItemsForRole(role);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logoImg} alt="National Emblem / Portal" className="sidebar-logo" />
        <div>
          <div className="sidebar-title">NPF-ADS</div>
          <div className="sidebar-subtitle">Finance Anomaly Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginTop: sIdx > 0 ? '1rem' : '0' }}>
            <div className="nav-section-title">{section.sectionTitle}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Portal User'}</div>
            <div className="user-role">{ROLE_LABELS[role] || role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
