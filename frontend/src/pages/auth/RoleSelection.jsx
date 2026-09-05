import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import { getHomeRouteForRole } from '../../utils/roleUtils';
import logoImg from '../../assets/images/logo.png';

const RoleSelection = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    {
      role: ROLES.MOSPI,
      title: 'MoSPI Central Officer',
      icon: '🏛️',
      desc: 'National oversight, cross-state anomaly pattern analysis, and central ministry governance.',
    },
    {
      role: ROLES.DISTRICT,
      title: 'District Magistrate / Collector',
      icon: '📍',
      desc: 'Local project execution oversight, contractor verification, and ground-level alerts.',
    },
    {
      role: ROLES.AUDITOR,
      title: 'CAG / State Auditor',
      icon: '🔍',
      desc: 'Deep forensic investigation, invoice cross-matching, collusive bidding detection.',
    },
    {
      role: ROLES.MP,
      title: 'Member of Parliament (MP)',
      icon: '🇮🇳',
      desc: 'MPLADS scheme constituency allocation, progress metrics, and vendor accountability.',
    },
    {
      role: ROLES.CITIZEN,
      title: 'Citizen Monitor',
      icon: '👥',
      desc: 'Public finance transparency, local project ground reports, and anomaly reporting.',
    },
  ];

  const handleSelectRole = (role) => {
    switchRole(role);
    const destination = getHomeRouteForRole(role);
    navigate(destination);
  };

  return (
    <div className="auth-page" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={logoImg} alt="Emblem" style={{ width: '60px', marginBottom: '0.75rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Select Portal Persona
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Choose a role to preview tailored anomaly detection workflows and role-specific analytics.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {roleOptions.map((opt) => (
            <div
              key={opt.role}
              onClick={() => handleSelectRole(opt.role)}
              className="role-option-card"
              style={{
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{opt.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                {opt.title}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
                {opt.desc}
              </p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1rem', width: '100%' }}
              >
                Launch Dashboard →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
