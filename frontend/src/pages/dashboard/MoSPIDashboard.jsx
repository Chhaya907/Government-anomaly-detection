import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import RiskChart from '../../components/dashboard/RiskChart';
import DistrictChart from '../../components/dashboard/DistrictChart';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import CaseTable from '../../components/cases/CaseTable';

const MoSPIDashboard = () => {
  const flaggedCases = [
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
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
          Ministry Oversight Dashboard (MoSPI)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          National overview of sanctioned schemes, cross-state anomaly indicators, and public expenditure risks.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Monitored Projects"
          value="1,420"
          trend="12 added this week"
          trendType="neutral"
          icon="🏛️"
        />
        <StatCard
          title="Sanctioned Outlay"
          value="₹5,240 Cr"
          trend="Across 6 schemes"
          trendType="neutral"
          icon="💰"
        />
        <StatCard
          title="Flagged Anomalies"
          value="114"
          trend="+8% from last month"
          trendType="negative"
          icon="🚨"
        />
        <StatCard
          title="Potential Financial Risk"
          value="₹142.6 Cr"
          trend="Requires CAG inquiry"
          trendType="negative"
          icon="⚠️"
        />
      </div>

      {/* Grid: Risk & District Charts */}
      <div className="dashboard-grid-2">
        <RiskChart />
        <DistrictChart />
      </div>

      {/* Recent Alerts & Table */}
      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Priority Anomalies Requiring Inter-Ministry Action</h3>
              <p className="card-subtitle">Showing cases with risk index &gt; 80</p>
            </div>
          </div>
          <CaseTable cases={flaggedCases} />
        </div>
        <RecentAlerts />
      </div>
    </div>
  );
};

export default MoSPIDashboard;
