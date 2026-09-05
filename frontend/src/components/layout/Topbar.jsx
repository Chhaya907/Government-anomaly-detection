import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import Button from '../common/Button';
import logoImg from '../../assets/images/logo.png';

const Topbar = () => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    switchRole(newRole);
    switch (newRole) {
      case ROLES.MOSPI:
        navigate('/dashboard/mospi');
        break;
      case ROLES.DISTRICT:
        navigate('/dashboard/district');
        break;
      case ROLES.AUDITOR:
        navigate('/dashboard/auditor');
        break;
      case ROLES.MP:
        navigate('/dashboard/mp');
        break;
      case ROLES.CITIZEN:
        navigate('/dashboard/citizen');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src={logoImg} alt="Portal Emblem" style={{ width: '32px', height: '32px', borderRadius: '4px' }} />
        <h1 className="page-title">National Public Finance Anomaly Portal</h1>
      </div>

      <div className="topbar-right">
        {/* Quick Role Switcher for previewing all dashboards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Switch Role:
          </span>
          <select
            value={user?.role || ROLES.MOSPI}
            onChange={handleRoleChange}
            className="form-input"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.8125rem', width: 'auto', cursor: 'pointer' }}
          >
            {Object.entries(ROLES).map(([key, val]) => (
              <option key={key} value={val}>
                {ROLE_LABELS[val] || val}
              </option>
            ))}
          </select>
        </div>

        <span className="role-tag">
          {user?.role || 'OFFICER'}
        </span>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
