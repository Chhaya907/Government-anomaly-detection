import React, { useEffect, useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import RiskChart from '../../components/dashboard/RiskChart';
import DistrictChart from '../../components/dashboard/DistrictChart';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import CaseTable from '../../components/cases/CaseTable';
import dashboardService from '../../services/dashboardService';

const MoSPIDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [metricsResponse, riskResponse, districtResponse, alertsResponse] =
          await Promise.all([
            dashboardService.getMetrics(),
            dashboardService.getRiskDistribution(),
            dashboardService.getDistrictPerformance(),
            dashboardService.getRecentAlerts(),
          ]);

        setMetrics(metricsResponse);
        setRiskData(riskResponse);
        setDistrictData(districtResponse);
        setAlerts(alertsResponse);
      } catch (error) {
        console.error('Dashboard API error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '?0 Cr';

    return `?${Number(value).toLocaleString('en-IN')} Cr`;
  };

  const formattedRiskData =
    riskData && !Array.isArray(riskData)
      ? [
          {
            level: 'Critical Risk',
            count: riskData.critical || 0,
            percentage: 15,
            color: 'var(--risk-critical)',
          },
          {
            level: 'High Risk',
            count: riskData.high || 0,
            percentage: 31,
            color: 'var(--risk-high)',
          },
          {
            level: 'Medium Risk',
            count: riskData.medium || 0,
            percentage: 40,
            color: 'var(--risk-medium)',
          },
          {
            level: 'Low Risk',
            count: riskData.low || 0,
            percentage: 14,
            color: 'var(--risk-low)',
          },
        ]
      : riskData;

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
        Loading national oversight data...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--primary-navy)',
          }}
        >
          Ministry Oversight Dashboard (MoSPI)
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
          }}
        >
          National overview of sanctioned schemes, cross-state anomaly indicators,
          and public expenditure risks.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Monitored Projects"
          value={metrics?.monitored_projects ?? '1,420'}
          trend="National monitoring coverage"
          trendType="neutral"
          icon="??"
        />

        <StatCard
          title="Sanctioned Outlay"
          value={formatCurrency(metrics?.sanctioned_outlay)}
          trend="Across government schemes"
          trendType="neutral"
          icon="??"
        />

        <StatCard
          title="Flagged Anomalies"
          value={metrics?.flagged_anomalies ?? '114'}
          trend="Requires monitoring"
          trendType="negative"
          icon="??"
        />

        <StatCard
          title="Potential Financial Risk"
          value={formatCurrency(metrics?.potential_financial_risk)}
          trend="Requires CAG inquiry"
          trendType="negative"
          icon="??"
        />
      </div>

      <div className="dashboard-grid-2">
        <RiskChart data={formattedRiskData} />
        <DistrictChart data={districtData} />
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                Priority Anomalies Requiring Inter-Ministry Action
              </h3>

              <p className="card-subtitle">
                Showing cases with high-risk indicators
              </p>
            </div>
          </div>

          <CaseTable cases={flaggedCases} />
        </div>

        <RecentAlerts alerts={alerts} />
      </div>
    </div>
  );
};

export default MoSPIDashboard;
