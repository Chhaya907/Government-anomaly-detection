import React, { useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import CaseCard from '../../components/cases/CaseCard';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CitizenDashboard = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const localCases = [
    {
      id: 'CASE-7801',
      projectId: 'PRJ-2024-001',
      projectName: 'District Rural Road Connectivity Phase II',
      district: 'Varanasi',
      primaryAnomaly: 'Sub-standard bitumen layer & unverified sub-base',
      financialExposure: 42000000,
      riskLevel: 'CRITICAL',
      status: 'OPEN',
      flaggedDate: '2024-04-12',
    },
    {
      id: 'CASE-7809',
      projectId: 'PRJ-2024-007',
      projectName: 'Ghat Cleanliness & Sensor Deployment',
      district: 'Varanasi',
      primaryAnomaly: 'Sensor non-functional since installation',
      financialExposure: 4500000,
      riskLevel: 'MEDIUM',
      status: 'OPEN',
      flaggedDate: '2024-04-02',
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
            Citizen Vigilance & Public Works Explorer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Inspect public infrastructure in your district, view allocated budgets, and report on-ground irregularities.
          </p>
        </div>
        <Button variant="accent" icon="📢" onClick={() => setIsReportModalOpen(true)}>
          Report Public Work Irregularity
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Verified Local Projects"
          value="48"
          trend="In your district"
          trendType="neutral"
          icon="📍"
        />
        <StatCard
          title="Public Budget Disbursed"
          value="₹186.4 Cr"
          trend="Tracked by citizens"
          trendType="neutral"
          icon="💰"
        />
        <StatCard
          title="Citizen Complaints Raised"
          value="29"
          trend="14 verified by engineers"
          trendType="positive"
          icon="👥"
        />
        <StatCard
          title="Resolved Inquiries"
          value="19"
          trend="65% resolution rate"
          trendType="positive"
          icon="✅"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Nearby Flagged Projects & Ground Discrepancies</h3>
            <p className="card-subtitle">Public works under official scrutiny in your jurisdiction</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
          {localCases.map((c) => (
            <CaseCard key={c.id} caseItem={c} />
          ))}
        </div>
      </div>

      {/* Citizen Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Public Work Irregularity / Anomaly"
      >
        {reportSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-green)' }}>
            <h4>Grievance Registered Successfully!</h4>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Your report token is <strong>#CIT-REP-8942</strong>. Our automated anomaly engine and district team
              will cross-verify satellite imagery and tender vouchers.
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
                Submit Citizen Report
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CitizenDashboard;
