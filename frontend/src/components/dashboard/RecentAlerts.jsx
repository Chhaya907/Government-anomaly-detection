import React from 'react';
import { Link } from 'react-router-dom';

const RecentAlerts = ({ alerts }) => {
  const defaultAlerts = [
    {
      id: 'CASE-7801',
      title: 'Cost Escalation & Collusive Bidding Detected',
      district: 'Varanasi',
      scheme: 'PMGSY Phase II',
      time: '12 mins ago',
      level: 'critical',
    },
    {
      id: 'CASE-7802',
      title: 'Ghost Contractor & Unverified Invoices',
      district: 'Patna',
      scheme: 'Jal Jeevan Mission',
      time: '45 mins ago',
      level: 'critical',
    },
    {
      id: 'CASE-7803',
      title: 'Unbalanced Bid Item Rates (38% deviation)',
      district: 'Pune',
      scheme: 'Smart Cities Mission',
      time: '2 hours ago',
      level: 'high',
    },
    {
      id: 'CASE-7804',
      title: 'Abnormal Delivery Gap Timing Flagged',
      district: 'Ranchi',
      scheme: 'MGNREGA',
      time: '5 hours ago',
      level: 'medium',
    },
  ];

  const items = alerts || defaultAlerts;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Recent Automated Alerts</h3>
          <p className="card-subtitle">Real-time alerts triggered by rule engine</p>
        </div>
        <Link to="/cases" style={{ fontSize: '0.8125rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
          View All →
        </Link>
      </div>

      <div className="alerts-list">
        {items.map((alert) => (
          <Link to={`/cases/${alert.id}`} key={alert.id} className={`alert-item ${alert.level}`}>
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {alert.district} • {alert.scheme}
              </div>
            </div>
            <span className="alert-time">{alert.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;
