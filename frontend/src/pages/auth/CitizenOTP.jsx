import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CitizenOTP = () => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginAsCitizen } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    setLoading(true);
    try {
      await loginAsCitizen(mobile, enteredOtp);
      navigate('/dashboard/citizen');
    } catch {
      setError('Invalid OTP code. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-sidebar-header">
            <img src="/assets/logo.png" alt="Emblem" className="auth-sidebar-logo" />
            <div>
              <div className="auth-sidebar-title">Citizen Oversight Portal</div>
              <div className="auth-sidebar-subtitle">Transparent Public Spending</div>
            </div>
          </div>
          <div className="auth-sidebar-body">
            <h2>Public Finance In Your Hands</h2>
            <p>
              Inspect local district infrastructure, view sanctioned budgets, report ground-level discrepancies,
              and ensure every rupee is accounted for.
            </p>
          </div>
          <div className="auth-sidebar-footer">
            No password required • Secure Mobile OTP Authentication
          </div>
        </div>

        <div className="auth-main">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Citizen Sign In</h1>
              <p>Verify your mobile number to view and report local public projects.</p>
            </div>

            <div className="auth-tabs">
              <Link to="/login" className="auth-tab">
                Official Access
              </Link>
              <Link to="/citizen-otp" className="auth-tab active">
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

            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <Input
                  label="Enter 10-Digit Mobile Number"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                  required
                />
                <Button type="submit" variant="primary" style={{ width: '100%' }} loading={loading}>
                  Generate One-Time Password (OTP)
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  An OTP has been dispatched to <strong>+91 {mobile}</strong>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    style={{ display: 'block', margin: '0.35rem auto 0', color: 'var(--primary-navy)', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Change mobile number
                  </button>
                </div>

                <div className="otp-inputs">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      className="otp-digit"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      maxLength={1}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <Button type="submit" variant="primary" style={{ width: '100%' }} loading={loading}>
                  Verify & Enter Portal
                </Button>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}
                  >
                    Didn't receive code? Resend OTP
                  </button>
                </div>
              </form>
            )}

            <div className="auth-footer">
              Authorized Government Official?
              <Link to="/login">Official Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenOTP;
