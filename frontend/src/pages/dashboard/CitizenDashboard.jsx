import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CITIZEN_PROJECT_STATUS } from '../../utils/constants';

const CitizenDashboard = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const localProjects = [
    {
      id: 'PRJ-2024-001',
      name: 'District Rural Road Connectivity Phase II',
      district: 'Varanasi',
      scheme: 'PMGSY (Gram Sadak Yojana)',
      publicBudget: 145000000,
      completionRate: 64,
      status: CITIZEN_PROJECT_STATUS.ONGOING,
      expectedHandover: '2024-12-30',
    },
    {
      id: 'PRJ-2024-003',
      name: 'Community Health Centre Modernisation',
      district: 'Varanasi',
      scheme: 'Ayushman Bharat Infrastructure',
      publicBudget: 85000000,
      completionRate: 100,
      status: CITIZEN_PROJECT_STATUS.COMPLETED,
      expectedHandover: '2024-03-31',
    },
    {
      id: 'PRJ-2024-007',
      name: 'Ghat Cleanliness & Sensor Deployment',
      district: 'Varanasi',
      scheme: 'Smart Cities Mission',
      publicBudget: 18000000,
      completionRate: 15,
      status: CITIZEN_PROJECT_STATUS.PENDING,
      expectedHandover: '2025-06-30',
    },
  ];

  const citizenComplaints = [
    {
      token: '#CIT-REP-8942',
      work: 'District Rural Road Connectivity Phase II',
      issue: 'Sub-standard bitumen thickness reported by villagers',
      date: '2024-04-12',
      status: 'Field Inspection Scheduled by Collector',
    },
    {
      token: '#CIT-REP-8120',
      work: 'Panchayat Community Solar Pump',
      issue: 'Pump operational delay beyond 90 days',
      date: '2024-03-18',
      status: 'Resolved & Energized',
    },
  ];

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Citizen Transparency Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Track local public works, inspect ongoing expenditures, and report ground-level execution discrepancies.
          </p>
        </div>
        <Button variant="accent" icon="📢" onClick={() => setIsReportModalOpen(true)}>
          Report Public Work Irregularity
        </Button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="Verified Local Projects"
          value="48"
          trend="In your district (Varanasi)"
          trendType="neutral"
          icon="📍"
        />
        <StatCard
          title="Total Public Budget"
          value="₹186.4 Cr"
          trend="Disclosed for civic audit"
          trendType="neutral"
          icon="💰"
        />
        <StatCard
          title="Completed Public Assets"
          value="31"
          trend="Delivered and functional"
          trendType="positive"
          icon="✅"
        />
        <StatCard
          title="Citizen Inquiries Addressed"
          value="19"
          trend="Handled by District Magistrate"
          trendType="positive"
          icon="👥"
        />
      </div>

      {/* Local Public Works Cards */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Nearby Development Works</h3>
            <p className="card-subtitle">Public infrastructure in your district available for citizen inspection</p>
          </div>
          <Link to="/projects" style={{ fontSize: '0.8125rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
            View All Projects →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {localProjects.map((p) => (
            <div
              key={p.id}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {p.id} • {p.scheme}
                  </span>
                  <span
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor:
                        p.status === CITIZEN_PROJECT_STATUS.COMPLETED
                          ? '#dcfce7'
                          : p.status === CITIZEN_PROJECT_STATUS.ONGOING
                          ? '#e0f2fe'
                          : '#fef3c7',
                      color:
                        p.status === CITIZEN_PROJECT_STATUS.COMPLETED
                          ? '#15803d'
                          : p.status === CITIZEN_PROJECT_STATUS.ONGOING
                          ? '#0369a1'
                          : '#b45309',
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  <Link to={`/projects/${p.id}`} style={{ color: 'inherit' }}>
                    {p.name}
                  </Link>
                </h4>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Public Outlay: <strong style={{ color: 'var(--text-main)' }}>{formatCurrency(p.publicBudget)}</strong>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span>Physical Progress</span>
                    <strong>{p.completionRate}%</strong>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${p.completionRate}%`, height: '100%', backgroundColor: 'var(--primary-navy)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Handover: {formatDate(p.expectedHandover)}
                </span>
                <Link to={`/projects/${p.id}`} className="btn btn-outline btn-sm">
                  Inspect Work →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Citizen Grievance Tracker */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Your Submitted Public Reports & Inquiries</h3>
            <p className="card-subtitle">Status of grievances reviewed by District Inspection Teams</p>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report Token</th>
                <th>Project / Work</th>
                <th>Observed Discrepancy</th>
                <th>Date Filed</th>
                <th>Action Status</th>
              </tr>
            </thead>
            <tbody>
              {citizenComplaints.map((comp) => (
                <tr key={comp.token}>
                  <td style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{comp.token}</td>
                  <td style={{ fontWeight: 600 }}>{comp.work}</td>
                  <td>{comp.issue}</td>
                  <td>{comp.date}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: comp.status.includes('Resolved') ? '#dcfce7' : '#e0f2fe',
                        color: comp.status.includes('Resolved') ? '#15803d' : '#0369a1',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {comp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Public Work Irregularity / Ground Discrepancy"
      >
        {reportSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-green)' }}>
            <h4>Grievance Registered Successfully!</h4>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Your tracking token is <strong>#CIT-REP-8943</strong>. This inquiry will be forwarded to the District
              Magistrate's inspection roster.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit}>
            <Input
              label="Select Project / Scheme"
              placeholder="e.g. District Rural Road Connectivity Phase II"
              required
            />
            <div className="form-group">
              <label className="form-label">Type of Discrepancy</label>
              <select className="form-input" required>
                <option value="">Choose issue category</option>
                <option value="ghost">Ghost Construction (Work not started on ground)</option>
                <option value="quality">Sub-standard Construction Material</option>
                <option value="delay">Extreme Unexplained Delay</option>
                <option value="signage">Missing Project Information Board</option>
                <option value="corruption">Bribery / Illegal Demands</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location / Landmark</label>
              <input type="text" className="form-input" placeholder="e.g. Near Shiv Mandir, Village Ramnagar" required />
            </div>
            <div className="form-group">
              <label className="form-label">Detailed Observation</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Describe what you observed on site..."
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent">
                Submit Public Report
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CitizenDashboard;
