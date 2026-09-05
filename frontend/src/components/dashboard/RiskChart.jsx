import React from 'react';

const RiskChart = ({ data }) => {
  const defaultData = [
    { level: 'Critical Risk', count: 18, percentage: 15, color: 'var(--risk-critical)' },
    { level: 'High Risk', count: 37, percentage: 31, color: 'var(--risk-high)' },
    { level: 'Medium Risk', count: 48, percentage: 40, color: 'var(--risk-medium)' },
    { level: 'Low Anomaly', count: 17, percentage: 14, color: 'var(--risk-low)' },
  ];

  const chartData = data || defaultData;
  const totalCases = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Risk Severity Distribution</h3>
          <p className="card-subtitle">Active anomaly indicators ({totalCases} cases total)</p>
        </div>
      </div>

      {/* Multi-segment distribution progress bar */}
      <div
        style={{
          display: 'flex',
          height: '14px',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          backgroundColor: '#e2e8f0',
        }}
      >
        {chartData.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
              transition: 'width 0.5s ease',
            }}
            title={`${item.level}: ${item.count} (${item.percentage}%)`}
          />
        ))}
      </div>

      {/* Breakdown list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {chartData.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  display: 'inline-block',
                }}
              />
              <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.level}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.count}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', width: '38px', textAlign: 'right' }}>
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskChart;
