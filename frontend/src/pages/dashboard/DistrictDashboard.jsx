import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import CaseTable from '../../components/cases/CaseTable';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import Button from '../../components/common/Button';

const DistrictDashboard = () => {
  const districtCases = [
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
      id: 'CASE-7809',
      projectId: 'PRJ-2024-007',
      projectName: 'Ghat Cleanliness & Sensor Deployment',
      district: 'Varanasi',
      primaryAnomaly: 'Geo-tagging Coordinates Mismatch',
      financialExposure: 4500000,
      riskLevel: 'MEDIUM',
      status: 'OPEN',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            District Magistrate Portal: Varanasi
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            District-level project execution oversight, inspection scheduling, and contractor accountability.
          </p>
        </div>
        <Button variant="primary" icon="📋">
          Issue Inspection Notice
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="District Works Active"
          value="48"
          trend="8 under review"
          trendType="neutral"
          icon="🏗️"
        />
        <StatCard
          title="Disbursed Funds"
          value="₹186.4 Cr"
          trend="FY 2023-24"
          trendType="neutral"
          icon="💳"
        />
        <StatCard
          title="Red Flagged Contracts"
          value="7"
          trend="Immediate attention needed"
          trendType="negative"
          icon="🚩"
        />
        <StatCard
          title="Pending Inspections"
          value="12"
          trend="Field verification due"
          trendType="negative"
          icon="🔎"
        />
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Active District Anomaly Inquiries</h3>
              <p className="card-subtitle">Pending responses from Executive Engineers & Contractors</p>
            </div>
          </div>
          <CaseTable cases={districtCases} />
        </div>
        <RecentAlerts />
      </div>
    </div>
  );
};

export default DistrictDashboard;
