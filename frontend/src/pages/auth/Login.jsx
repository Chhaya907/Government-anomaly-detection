import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import { getHomeRouteForRole } from '../../utils/roleUtils';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logoImg from '../../assets/images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(ROLES.MOSPI);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authenticatedUser = await login({ email, password });
      const targetRoute = getHomeRouteForRole(authenticatedUser.role);
      navigate(targetRoute);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-sidebar-header">
            <img src={logoImg} alt="Emblem" className="auth-sidebar-logo" />
            <div>
              <div className="auth-sidebar-title">Government of India</div>
              <div className="auth-sidebar-subtitle">Ministry of Statistics & Programme Implementation</div>
            </div>
          </div>

          <div className="auth-sidebar-body">
            <h2>
              Public Finance <span>Anomaly</span> & Fraud Detection Portal
            </h2>
            <p>
              An automated, intelligence-driven oversight system designed to safeguard public expenditure,
              detect collusive procurement, and identify financial leakage across national and state schemes.
            </p>

          </div>

          <div className="auth-sidebar-footer">
            Official Portal for MoSPI, CAG Auditors, District Magistrates & Citizens.
          </div>
        </div>

        <div className="auth-main">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Officer Sign In</h1>
              <p>Enter your authorized government credentials to access the portal</p>
            </div>

            <div className="auth-tabs">
              <Link to="/login" className="auth-tab active">
                Official Access
              </Link>
              <Link to="/citizen-otp" className="auth-tab">
                Citizen Portal (OTP)
              </Link>
            </div>

            {error && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--risk-critical-bg)',
                  color: 'var(--risk-critical)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.8125rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Official Role</label>
                <select
                  className="form-input"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value={ROLES.MOSPI}>{ROLE_LABELS[ROLES.MOSPI]}</option>
                  <option value={ROLES.DISTRICT}>{ROLE_LABELS[ROLES.DISTRICT]}</option>
                  <option value={ROLES.AUDITOR}>{ROLE_LABELS[ROLES.AUDITOR]}</option>
                  <option value={ROLES.MP}>{ROLE_LABELS[ROLES.MP]}</option>
                </select>
              </div>

              <Input
                label="Official Email / SSO ID"
                type="email"
                placeholder="name@gov.in or nic.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Secure Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Remember session</span>
                </label>
                <Link to="/forgot-password" style={{ color: 'var(--primary-navy)', fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="primary" style={{ width: '100%' }} loading={loading}>
                Access Portal
              </Button>
            </form>

            <div className="auth-footer">
              Don't have an official account?
              <Link to="/register">Register Official</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

