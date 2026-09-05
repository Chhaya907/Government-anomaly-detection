import React from 'react';
import RiskBadge from './RiskBadge';

const AnomalyCard = ({ anomaly }) => {
  return (
    <div
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginBottom: '1rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="anomaly-rule-tag">{anomaly.id}</span>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {anomaly.type}
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Model Confidence: <strong>{(anomaly.confidence * 100).toFixed(0)}%</strong>
          </span>
          <RiskBadge level={anomaly.severity} />
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
        {anomaly.description}
      </p>

      {anomaly.evidence && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#f8fafc',
            borderLeft: '3px solid var(--primary-navy)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <strong style={{ color: 'var(--text-main)' }}>Algorithmic Evidence: </strong>
          {anomaly.evidence}
        </div>
      )}
    </div>
  );
};

export default AnomalyCard;
