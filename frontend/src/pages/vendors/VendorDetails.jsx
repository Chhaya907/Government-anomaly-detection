import React from 'react';
import { useParams, Link } from 'react-router-dom';
import RiskBadge from '../../components/cases/RiskBadge';
import { formatCurrency } from '../../utils/formatters';

const VendorDetails = () => {
  const { id } = useParams();

  const vendor = {
    id: id || 'VEN-401',
    name: 'Apex Infra Projects Pvt Ltd',
    pan: 'AAACA1122D',
    gstin: '09AAACA1122D1Z5',
    cin: 'U45200UP2016PTC081234',
    incorporationDate: '2016-04-14',
    registeredOffice: 'Civil Lines, Varanasi, Uttar Pradesh - 221002',
    directorCount: 2,
    riskLevel: 'HIGH',
    cartelScore: '87/100',
    directors: ['Sunil Kumar Agarwal', 'Pramod Kumar Gupta'],
    associatedShells: [
      'Omkar Builders & Earthmovers (Shared Registered Address)',
      'Ganga Stone Crushing Co (Shared Common Director)',
    ],
    biddingHistory: [
      {
        tender: 'UP PWD Varanasi Road Widening (TND-894)',
        date: '2024-02-14',
        result: 'AWARDED',
        deviation: '+14% above state estimate',
      },
      {
        tender: 'PMGSY Package 44 Sub-base Stone Supply',
        date: '2023-11-20',
        result: 'AWARDED',
        deviation: '+28% above CPWD schedule',
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/vendors" style={{ fontSize: '0.8125rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
          ← Back to Contractor Watchlist
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            CIN: {vendor.cin}
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
            {vendor.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {vendor.registeredOffice}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RiskBadge level={vendor.riskLevel} />
          <button type="button" className="btn btn-danger btn-sm">
            Add to Debarment Registry
          </button>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Corporate & Registry Profile (MCA + GSTN)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>PAN Number:</span>
              <div style={{ fontWeight: 600 }}>{vendor.pan}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>GSTIN Identifier:</span>
              <div style={{ fontWeight: 600 }}>{vendor.gstin}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Incorporated:</span>
              <div style={{ fontWeight: 600 }}>{vendor.incorporationDate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Active Board Directors:</span>
              <div style={{ fontWeight: 600 }}>{vendor.directors.join(', ')}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Collusive Network Analysis</h3>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cartel Probability:</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--risk-critical)' }}>
              {vendor.cartelScore}
            </div>
          </div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Detected Interlocking Entities:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {vendor.associatedShells.map((shell, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#fff5f5',
                  borderLeft: '3px solid var(--risk-critical)',
                  fontSize: '0.8125rem',
                  color: '#991b1b',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {shell}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
