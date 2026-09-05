import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-sidebar-header">
            <img src="/assets/logo.png" alt="Emblem" className="auth-sidebar-logo" />
            <div>
              <div className="auth-sidebar-title">Government of India</div>
              <div className="auth-sidebar-subtitle">Security & Password Recovery</div>
            </div>
          </div>
          <div className="auth-sidebar-body">
            <h2>Forgot Access Credentials?</h2>
            <p>
              Recovery instructions will be routed to your NIC or officially registered government email address.
            </p>
          </div>
          <div className="auth-sidebar-footer">
            NIC 24x7 Helpdesk: 1800-111-555
          </div>
        </div>

        <div className="auth-main">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Reset Password</h1>
              <p>Enter your verified email to receive a password reset token.</p>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--risk-low-bg)',
                  color: 'var(--accent-green)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <h4>Reset Link Dispatched</h4>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  If an active official profile exists for <strong>{email}</strong>, a secure reset link has been
                  transmitted.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link to="/login" className="btn btn-primary btn-sm">
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Input
                  label="Registered Official Email"
                  type="email"
                  placeholder="officer@nic.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" style={{ width: '100%' }} loading={loading}>
                  Send Recovery Link
                </Button>
              </form>
            )}

            <div className="auth-footer">
              Remember your password?
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
