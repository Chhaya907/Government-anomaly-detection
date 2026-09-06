import React, { useEffect, useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import RiskChart from '../../components/dashboard/RiskChart';
import DistrictChart from '../../components/dashboard/DistrictChart';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import CaseTable from '../../components/cases/CaseTable';
import api from '../../services/api';

const MoSPIDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [flaggedCases, setFlaggedCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [metricsResponse, alertsResponse] = await Promise.all([
          api.get('/dashboard/metrics'),
          api.get('/dashboard/recent-alerts'),
        ]);

        setMetrics(metricsResponse.data);

        const formattedCases = alertsResponse.data.map((alert) => ({
          id: alert.case_id,
          projectId: 'PROJECT-' + alert.case_id,
          projectName: alert.project,
          district: alert.district,
          primaryAnomaly: 'Financial anomaly detected',
          financialExposure: alert.financial_exposure * 10000000,
          riskLevel: alert.risk_level,
          status: alert.status,
        }));

        setFlaggedCases(formattedCases);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  }

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

      <div className="stats-grid">
        <StatCard
          title="Monitored Projects"
          value={metrics?.monitored_projects?.toLocaleString() || '0'}
          trend="Live backend data"
          trendType="neutral"
          icon="📊"
        />

        <StatCard
          title="Sanctioned Outlay"
          value={`₹${metrics?.sanctioned_outlay || 0} Cr`}
          trend="Live backend data"
          trendType="neutral"
          icon="💰"
        />

        <StatCard
          title="Flagged Anomalies"
          value={metrics?.flagged_anomalies || 0}
          trend="Live backend data"
          trendType="negative"
          icon="🚨"
        />

        <StatCard
          title="Potential Financial Risk"
          value={`₹${metrics?.potential_financial_risk || 0} Cr`}
          trend="Requires investigation"
          trendType="negative"
          icon="⚠️"
        />
      </div>

      <div className="dashboard-grid-2">
        <RiskChart />
        <DistrictChart />
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                Priority Anomalies Requiring Inter-Ministry Action
              </h3>
              <p className="card-subtitle">
                Live anomaly data from backend
              </p>
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
