import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const initialRevisions = [
  {
    id: 'REV-2024-001',
    projectId: 'PRJ-2024-001',
    projectName: 'District Rural Road Connectivity Phase II',
    district: 'Varanasi',
    field: 'Sanctioned Budget Allocation',
    oldValue: '₹14.50 Cr',
    newValue: '₹16.80 Cr',
    requestedBy: 'Executive Engineer (PWD Varanasi)',
    requesterEmail: 'ee.pwd.vns@gov.in',
    requestedAt: '2024-04-10T10:15:00Z',
    reason: 'Unexpected bedrock blasting requirements in Sector 4 and rising bitumen schedule rates.',
    status: 'PENDING', // 'PENDING' | 'APPROVED' | 'REJECTED'
    reviewedBy: null,
    reviewedAt: null,
    reviewNotes: '',
    versionNumber: 'v1.1',
  },
  {
    id: 'REV-2024-002',
    projectId: 'PRJ-2024-004',
    projectName: 'Smart Drainage & Stormwater Channel',
    district: 'Pune',
    field: 'Scheduled Completion Date',
    oldValue: '2024-11-15',
    newValue: '2025-03-31',
    requestedBy: 'District Urban Infrastructure Cell',
    requesterEmail: 'dm.pune@gov.in',
    requestedAt: '2024-03-25T14:30:00Z',
    reason: 'Heavy monsoon delays and utility cable realignment clearances from MSEDCL.',
    status: 'APPROVED',
    reviewedBy: 'Dr. Amitabh Verma, IAS (MoSPI)',
    reviewedAt: '2024-03-28T16:00:00Z',
    reviewNotes: 'Verified technical committee report. Extension sanctioned without cost escalation.',
    versionNumber: 'v1.2',
  },
];

const Revisions = () => {
  const { user } = useAuth();
  const [revisions, setRevisions] = useState(initialRevisions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: 'District Rural Road Connectivity Phase II',
    field: 'Sanctioned Budget Allocation',
    oldValue: '₹14.50 Cr',
    newValue: '',
    reason: '',
  });

  const isMoSPI = user?.role === ROLES.MOSPI;

  const handleApprove = (revId) => {
    const rev = revisions.find((r) => r.id === revId);
    if (rev && rev.requesterEmail === user?.email) {
      alert('Security Policy Violation: You cannot approve your own sensitive change under Global Data Protection Rules.');
      return;
    }

    setRevisions(
      revisions.map((r) =>
        r.id === revId
          ? {
              ...r,
              status: 'APPROVED',
              reviewedBy: `${user?.name || 'MoSPI Admin'} (${user?.role})`,
              reviewedAt: new Date().toISOString(),
              reviewNotes: 'Sanctioned under MoSPI administrative powers.',
            }
          : r
      )
    );
  };

  const handleReject = (revId) => {
    const reason = prompt('Please specify reason for rejection:');
    if (!reason) return;

    setRevisions(
      revisions.map((r) =>
        r.id === revId
          ? {
              ...r,
              status: 'REJECTED',
              reviewedBy: `${user?.name || 'MoSPI Admin'} (${user?.role})`,
              reviewedAt: new Date().toISOString(),
              reviewNotes: reason,
            }
          : r
      )
    );
  };

  const handleSubmitNewRevision = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `REV-2024-${String(revisions.length + 1).padStart(3, '0')}`,
      projectId: 'PRJ-2024-001',
      projectName: formData.projectName,
      district: 'Varanasi',
      field: formData.field,
      oldValue: formData.oldValue,
      newValue: formData.newValue,
      requestedBy: user?.name || 'District Officer',
      requesterEmail: user?.email || 'district@gov.in',
      requestedAt: new Date().toISOString(),
      reason: formData.reason,
      status: 'PENDING',
      reviewedBy: null,
      reviewedAt: null,
      reviewNotes: '',
      versionNumber: `v1.${revisions.length + 1}`,
    };

    setRevisions([newEntry, ...revisions]);
    setIsModalOpen(false);
    setFormData({
      projectName: 'District Rural Road Connectivity Phase II',
      field: 'Sanctioned Budget Allocation',
      oldValue: '₹14.50 Cr',
      newValue: '',
      reason: '',
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Project Revisions & Immutable Change Audit Log
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Under Global Data Protection Rules, original baseline data cannot be overwritten. Every modification creates a versioned revision with full audit provenance.
          </p>
        </div>
        <Button variant="primary" icon="📝" onClick={() => setIsModalOpen(true)}>
          Submit Revision Request
        </Button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rev ID / Ver</th>
                <th>Project Name</th>
                <th>Parameter Modified</th>
                <th>Original Baseline Value</th>
                <th>Proposed New Value</th>
                <th>Requested By</th>
                <th>Justification</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{rev.id}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.versionNumber}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{rev.projectName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.district}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{rev.field}</td>
                  <td>
                    <code style={{ color: '#64748b', textDecoration: 'line-through' }}>{rev.oldValue}</code>
                  </td>
                  <td>
                    <code style={{ color: '#047857', fontWeight: 700 }}>{rev.newValue}</code>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{rev.requestedBy}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatDateTime(rev.requestedAt)}</div>
                  </td>
                  <td style={{ maxWidth: '240px', fontSize: '0.8125rem' }}>{rev.reason}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          rev.status === 'APPROVED' ? '#dcfce7' : rev.status === 'REJECTED' ? '#fee2e2' : '#fef9c3',
                        color:
                          rev.status === 'APPROVED' ? '#15803d' : rev.status === 'REJECTED' ? '#b91c1c' : '#854d0e',
                      }}
                    >
                      {rev.status}
                    </span>
                    {rev.reviewedBy && (
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        By {rev.reviewedBy}
                      </div>
                    )}
                  </td>
                  <td>
                    {rev.status === 'PENDING' && isMoSPI ? (
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          style={{ backgroundColor: '#059669', borderColor: '#059669', padding: '0.2rem 0.5rem' }}
                          onClick={() => handleApprove(rev.id)}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          style={{ padding: '0.2rem 0.5rem' }}
                          onClick={() => handleReject(rev.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {rev.status === 'PENDING' ? 'Pending MoSPI Approval' : 'Archived in Audit Log'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Revision Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Project / Financial Revision Request"
      >
        <form onSubmit={handleSubmitNewRevision}>
          <div className="form-group">
            <label className="form-label">Selected Project</label>
            <input
              type="text"
              className="form-input"
              value={formData.projectName}
              disabled
              style={{ backgroundColor: '#f1f5f9' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Parameter to Revise</label>
            <select
              className="form-input"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            >
              <option value="Sanctioned Budget Allocation">Sanctioned Budget Allocation</option>
              <option value="Scheduled Completion Date">Scheduled Completion Date</option>
              <option value="Physical Milestone Scope">Physical Milestone Scope</option>
              <option value="Implementation Agency / Contractor">Implementation Agency / Contractor</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Current Baseline Value</label>
              <input
                type="text"
                className="form-input"
                value={formData.oldValue}
                disabled
                style={{ backgroundColor: '#f1f5f9' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Proposed New Value</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. ₹16.80 Cr"
                value={formData.newValue}
                onChange={(e) => setFormData({ ...formData, newValue: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Administrative Reason & Justification</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="State the technical reasons, site conditions, or committee approvals..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Log Revision & Request Approval
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Revisions;
