import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const Settings = () => {
  const { user } = useAuth();
  const [sensitivity, setSensitivity] = useState(75);
  const [autoFlag, setAutoFlag] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
          System & Anomaly Model Settings
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Configure automated detection sensitivity, alert notification channels, and officer profile details.
        </p>
      </div>

      <div className="card" style={{ maxWidth: '700px' }}>
        {saved && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--risk-low-bg)',
              color: 'var(--accent-green)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            ✓ Settings successfully updated!
          </div>
        )}

        <form onSubmit={handleSave}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '1rem' }}>
            Anomaly Detection Sensitivity
          </h3>

          <div className="form-group">
            <label className="form-label">
              Anomaly Trigger Threshold: <strong>{sensitivity}/100</strong>
            </label>
            <input
              type="range"
              min="40"
              max="95"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--primary-navy)', margin: '0.5rem 0' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Strict (Flags minor deviations)</span>
              <span>Balanced (Recommended: 75)</span>
              <span>Permissive (High certainty only)</span>
            </div>
          </div>

          <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoFlag}
                onChange={(e) => setAutoFlag(e.target.checked)}
              />
              <span>Automatically escalate Critical cases to CAG Investigation Cell</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
              <span>Send daily digest of flagged projects to {user?.email || 'officer email'}</span>
            </label>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-navy)', margin: '1.5rem 0 1rem' }}>
            Officer Account Details
          </h3>

          <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Officer Name:</span>
              <strong style={{ marginLeft: '0.5rem' }}>{user?.name}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Official Role:</span>
              <strong style={{ marginLeft: '0.5rem' }}>{user?.role}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Department:</span>
              <strong style={{ marginLeft: '0.5rem' }}>{user?.department || 'Ministry of Statistics'}</strong>
            </div>
          </div>

          <Button type="submit" variant="primary">
            Save Preferences
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
