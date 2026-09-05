import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import CaseTable from '../../components/cases/CaseTable';
import RiskChart from '../../components/dashboard/RiskChart';
import Button from '../../components/common/Button';

const AuditorDashboard = () => {
  const auditCases = [
    {
      id: 'CASE-7801',
      projectId: 'PRJ-2024-001',
      projectName: 'District Rural Road Connectivity Phase II',
      district: 'Varanasi',
      primaryAnomaly: 'Cost Escalation & Collusive Bidding',
      financialExposure: 42000000,
      riskLevel: 'CRITICAL',
      status: 'OPEN',
    },
    {
      id: 'CASE-7802',
      projectId: 'PRJ-2024-002',
      projectName: 'Solar Powered Drinking Water Units',
      district: 'Patna',
      primaryAnomaly: 'Ghost Contractor & Unverified Invoices',
      financialExposure: 26000000,
      riskLevel: 'CRITICAL',
      status: 'UNDER_INVESTIGATION',
    },
    {
      id: 'CASE-7803',
      projectId: 'PRJ-2024-004',
      projectName: 'Smart Drainage & Stormwater Channel',
      district: 'Pune',
      primaryAnomaly: 'Unbalanced Bid Item Rates',
      financialExposure: 18500000,
      riskLevel: 'HIGH',
      status: 'ESCALATED',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            CAG & State Audit Investigation Console
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Forensic analysis, procurement cartel detection, invoice item rate benchmarking, and audit trail records.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="secondary" icon="📄">
            Export Audit Dossier
          </Button>
          <Button variant="primary" icon="🔬">
            Trigger Deep Forensic Scan
          </Button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Cases Under Forensic Audit"
          value="34"
          trend="12 critical priority"
          trendType="negative"
          icon="🔬"
        />
        <StatCard
          title="Recoverable Audit Queries"
          value="₹89.4 Cr"
          trend="Total contested vouchers"
          trendType="negative"
          icon="⚖️"
        />
        <StatCard
          title="Flagged Cartel Rings"
          value="6"
          trend="Collusive vendor clusters"
          trendType="negative"
          icon="🕸️"
        />
        <StatCard
          title="Audit Paras Dispatched"
          value="18"
          trend="Pending department replies"
          trendType="neutral"
          icon="📑"
        />
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Priority Audit Case File Queue</h3>
              <p className="card-subtitle">Automated evidence score &gt; 85%</p>
            </div>
          </div>
          <CaseTable cases={auditCases} />
        </div>
        <RiskChart />
      </div>
    </div>
  );
};

export default AuditorDashboard;
