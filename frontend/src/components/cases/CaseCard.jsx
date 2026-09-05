import React from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from './RiskBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const CaseCard = ({ caseItem }) => {
  return (
    <div className="case-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {caseItem.id}
          </span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            <Link to={`/cases/${caseItem.id}`} style={{ color: 'inherit' }}>
              {caseItem.projectName}
            </Link>
          </h4>
        </div>
        <RiskBadge level={caseItem.riskLevel} />
      </div>

      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <strong>Primary Trigger:</strong> {caseItem.primaryAnomaly}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          padding: '0.75rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8125rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <div style={{ color: 'var(--text-muted)' }}>District</div>
          <div style={{ fontWeight: 600 }}>{caseItem.district}</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)' }}>Exposure</div>
          <div style={{ fontWeight: 600, color: 'var(--risk-critical)' }}>
            {formatCurrency(caseItem.financialExposure)}
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)' }}>Flagged On</div>
          <div style={{ fontWeight: 600 }}>{formatDate(caseItem.flaggedDate)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#e2e8f0',
            fontWeight: 600,
          }}
        >
          Status: {caseItem.status}
        </span>
        <Link
          to={`/cases/${caseItem.id}`}
          className="btn btn-outline btn-sm"
        >
          Examine Case →
        </Link>
      </div>
    </div>
  );
};

export default CaseCard;
