import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logoImg from '../../assets/images/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: ROLES.DISTRICT,
    department: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-sidebar-header">
            <img src={logoImg} alt="Emblem" className="auth-sidebar-logo" />
            <div>
              <div className="auth-sidebar-title">Government of India</div>
              <div className="auth-sidebar-subtitle">Officer Onboarding System</div>
            </div>
          </div>
          <div className="auth-sidebar-body">
            <h2>Official Registration</h2>
            <p>
              Register for verified departmental access to monitor project anomalies, review flagged vendor
              tenders, and generate CAG-standard compliance reports.
            </p>
          </div>
          <div className="auth-sidebar-footer">
            All registrations are subject to NIC and departmental verification.
          </div>
        </div>

        <div className="auth-main">
          <div className="auth-card" style={{ maxWidth: '520px' }}>
            <div className="auth-header">
              <h1>Register Official Account</h1>
              <p>Please enter your government service credentials.</p>
            </div>

            {success ? (
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--risk-low-bg)',
                  color: 'var(--accent-green)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <h4>Registration Submitted Successfully!</h4>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Your account is pending departmental verification. Redirecting to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Input
                  label="Full Name (with Designation)"
                  name="fullName"
                  placeholder="e.g. Rajesh Kumar, Executive Engineer"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <Input
                    label="Official Email"
                    type="email"
                    name="email"
                    placeholder="officer@nic.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Mobile Number"
                    name="mobile"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Jurisdiction / Role</label>
                  <select
                    className="form-input"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value={ROLES.DISTRICT}>{ROLE_LABELS[ROLES.DISTRICT]}</option>
                    <option value={ROLES.AUDITOR}>{ROLE_LABELS[ROLES.AUDITOR]}</option>
                    <option value={ROLES.MP}>{ROLE_LABELS[ROLES.MP]}</option>
                    <option value={ROLES.MOSPI}>{ROLE_LABELS[ROLES.MOSPI]}</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <Input
                    label="Department / Ministry"
                    name="department"
                    placeholder="e.g. Rural Development"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Government Employee ID"
                    name="employeeId"
                    placeholder="GOV-IND-4421"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }} loading={loading}>
                  Submit For Authorization
                </Button>
              </form>
            )}

            <div className="auth-footer">
              Already verified?
              <Link to="/login">Sign In Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
