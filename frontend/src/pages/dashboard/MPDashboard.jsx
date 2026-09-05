import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import CaseTable from '../../components/cases/CaseTable';
import Button from '../../components/common/Button';

const MPDashboard = () => {
  const mpladsCases = [
    {
      id: 'CASE-7814',
      projectId: 'PRJ-2024-012',
      projectName: 'Constituency Community Library & Skill Center',
      district: 'Varanasi North',
      primaryAnomaly: 'Progress Milestone Lag (>180 Days)',
      financialExposure: 7500000,
      riskLevel: 'HIGH',
      status: 'UNDER_INVESTIGATION',
    },
    {
      id: 'CASE-7818',
      projectId: 'PRJ-2024-019',
      projectName: 'Solar Street Lights Phase IV',
      district: 'Varanasi South',
      primaryAnomaly: 'Vendor Delivery Count Discrepancy',
      financialExposure: 3200000,
      riskLevel: 'MEDIUM',
      status: 'OPEN',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Parliamentary Constituency Portal (MPLADS)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Constituency fund allocation tracking, project milestones, and public work integrity monitoring.
          </p>
        </div>
        <Button variant="primary" icon="📊">
          Download Constituency Report
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="MPLADS Fund Sanctioned"
          value="₹25.0 Cr"
          trend="Constituency quota"
          trendType="neutral"
          icon="🏛️"
        />
        <StatCard
          title="Funds Utilized"
          value="₹19.4 Cr"
          trend="77.6% utilization"
          trendType="positive"
          icon="📈"
        />
        <StatCard
          title="Recommended Projects"
          value="34"
          trend="28 completed"
          trendType="positive"
          icon="✅"
        />
        <StatCard
          title="Flagged Execution Delays"
          value="3"
          trend="Under DM inquiry"
          trendType="negative"
          icon="⚠️"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Constituency Works Requiring Parliamentary Follow-up</h3>
            <p className="card-subtitle">Identified implementation bottlenecks and contractor anomalies</p>
          </div>
        </div>
        <CaseTable cases={mpladsCases} />
      </div>
    </div>
  );
};

export default MPDashboard;
