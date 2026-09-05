import React from 'react';

const DistrictChart = ({ data }) => {
  const districts = data || [
    { name: 'Varanasi', cases: 24, riskIndex: 82, budgetUtil: 88 },
    { name: 'Patna', cases: 31, riskIndex: 91, budgetUtil: 94 },
    { name: 'Indore', cases: 9, riskIndex: 32, budgetUtil: 72 },
    { name: 'Pune', cases: 18, riskIndex: 68, budgetUtil: 84 },
    { name: 'Ranchi', cases: 14, riskIndex: 54, budgetUtil: 65 },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">District Anomaly Index Overview</h3>
          <p className="card-subtitle">Spending velocity vs. anomaly severity index</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {districts.map((d, index) => {
          const barColor =
            d.riskIndex >= 80
              ? 'var(--risk-critical)'
              : d.riskIndex >= 60
              ? 'var(--risk-high)'
              : d.riskIndex >= 40
              ? 'var(--risk-medium)'
              : 'var(--risk-low)';

          return (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                  fontSize: '0.8125rem',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{d.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {d.cases} flagged cases • Index: <strong style={{ color: barColor }}>{d.riskIndex}/100</strong>
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${d.riskIndex}%`,
                    backgroundColor: barColor,
                    height: '100%',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistrictChart;
