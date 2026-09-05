import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectService from '../../services/projectService';
import RiskBadge from '../../components/cases/RiskBadge';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDate } from '../../utils/formatters';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjectById(id).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader fullPage />;
  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/projects" style={{ fontSize: '0.8125rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
          ← Back to All Projects
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {project.id} • {project.scheme}
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
            {project.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Jurisdiction: {project.district}, {project.state}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiskBadge level={project.riskLevel} />
          <Link to={`/cases?projectId=${project.id}`} className="btn btn-primary btn-sm">
            View Anomaly Case Dossier
          </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div className="card">
          <div className="stat-title">Sanctioned Outlay</div>
          <div className="stat-value" style={{ fontSize: '1.35rem' }}>{formatCurrency(project.sanctionedAmount)}</div>
        </div>
        <div className="card">
          <div className="stat-title">Disbursed Expenditure</div>
          <div className="stat-value" style={{ fontSize: '1.35rem', color: 'var(--risk-critical)' }}>
            {formatCurrency(project.expenditure)}
          </div>
        </div>
        <div className="card">
          <div className="stat-title">Physical Progress</div>
          <div className="stat-value" style={{ fontSize: '1.35rem' }}>{project.completionRate}%</div>
        </div>
        <div className="card">
          <div className="stat-title">Calculated Anomaly Index</div>
          <div className="stat-value" style={{ fontSize: '1.35rem', color: 'var(--risk-critical)' }}>
            {project.anomalyScore}/100
          </div>
        </div>
      </div>

      {/* Flagged Rules & Contractor Details */}
      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Algorithmic Anomaly Flags</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.flaggedAnomalies?.map((flag, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#fef2f2',
                  borderLeft: '4px solid var(--risk-critical)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  color: '#991b1b',
                }}
              >
                <span>⚠️</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Contractor & Tender Metadata</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Prime Contractor:</span>
              <div style={{ fontWeight: 600 }}>{project.vendorName}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Contractor GSTIN:</span>
              <div style={{ fontWeight: 600 }}>{project.contractorGstin}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Work Commenced:</span>
              <div style={{ fontWeight: 600 }}>{formatDate(project.startDate)}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Scheduled Handover:</span>
              <div style={{ fontWeight: 600 }}>{formatDate(project.expectedEndDate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
