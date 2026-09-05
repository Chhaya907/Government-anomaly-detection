import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import caseService from '../../services/caseService';
import RiskBadge from '../../components/cases/RiskBadge';
import AnomalyCard from '../../components/cases/AnomalyCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

const CaseDetails = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    caseService.getCaseById(id).then((data) => {
      setCaseData(data);
      setCurrentStatus(data.status);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    await caseService.updateCaseStatus(id, newStatus);
  };

  if (loading) return <Loader fullPage />;
  if (!caseData) return <div>Case record not found.</div>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/cases" style={{ fontSize: '0.8125rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
          ← Back to Anomaly Case Registry
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
              {caseData.id}
            </span>
            <RiskBadge level={caseData.riskLevel} />
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              Status: {currentStatus}
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            {caseData.primaryAnomaly}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Flagged Project: <strong>{caseData.projectName}</strong> ({caseData.district}, {caseData.state})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            className="form-input"
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{ width: 'auto', fontSize: '0.8125rem' }}
          >
            <option value="OPEN">Mark OPEN</option>
            <option value="UNDER_INVESTIGATION">Under Investigation</option>
            <option value="ESCALATED">Escalate to Vigilance</option>
            <option value="RESOLVED">Mark Resolved</option>
            <option value="DISMISSED">Dismiss (False Positive)</option>
          </select>
          <Button variant="primary" icon="📥" size="sm">
            Export Evidence ZIP
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card">
          <div className="stat-title">Financial Exposure</div>
          <div className="stat-value" style={{ fontSize: '1.35rem', color: 'var(--risk-critical)' }}>
            {formatCurrency(caseData.financialExposure)}
          </div>
        </div>
        <div className="card">
          <div className="stat-title">Composite Anomaly Score</div>
          <div className="stat-value" style={{ fontSize: '1.35rem' }}>
            {caseData.anomalyScore}/100
          </div>
        </div>
        <div className="card">
          <div className="stat-title">Lead Investigator</div>
          <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{caseData.assignedAuditor}</div>
        </div>
        <div className="card">
          <div className="stat-title">Flagged Date</div>
          <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{formatDate(caseData.flaggedDate)}</div>
        </div>
      </div>

      {/* Anomalies List & Audit Trail */}
      <div className="dashboard-grid-2">
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-navy)' }}>
            Detected Rule Violations & Evidence ({caseData.anomalies?.length || 0})
          </h3>
          {caseData.anomalies?.map((ano) => (
            <AnomalyCard key={ano.id} anomaly={ano} />
          ))}
        </div>

        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Chain of Custody & Audit Trail</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {caseData.auditHistory?.map((hist, idx) => (
                <div
                  key={idx}
                  style={{
                    borderLeft: '2px solid var(--border-color)',
                    paddingLeft: '1rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '-5px',
                      top: '0',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-navy)',
                    }}
                  />
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{hist.date}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)' }}>{hist.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By: {hist.user}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
