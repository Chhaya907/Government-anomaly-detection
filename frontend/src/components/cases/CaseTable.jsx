import React from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from './RiskBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const CaseTable = ({ cases = [] }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Project Details</th>
            <th>District</th>
            <th>Primary Anomaly</th>
            <th>Financial Exposure</th>
            <th>Risk Level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{c.id}</td>
              <td>
                <div style={{ fontWeight: 600 }}>{c.projectName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.projectId}</div>
              </td>
              <td>{c.district}</td>
              <td style={{ maxWidth: '220px' }}>{c.primaryAnomaly}</td>
              <td style={{ fontWeight: 600, color: 'var(--risk-critical)' }}>
                {formatCurrency(c.financialExposure)}
              </td>
              <td>
                <RiskBadge level={c.riskLevel} />
              </td>
              <td>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: c.status === 'OPEN' ? 'var(--risk-critical)' : 'var(--text-main)',
                  }}
                >
                  {c.status}
                </span>
              </td>
              <td>
                <Link to={`/cases/${c.id}`} className="btn btn-outline btn-sm">
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
