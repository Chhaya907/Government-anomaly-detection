import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RiskBadge from '../../components/cases/RiskBadge';
import { formatCurrency } from '../../utils/formatters';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      id: 'VEN-401',
      name: 'Apex Infra Projects Pvt Ltd',
      gstin: '09AAACA1122D1Z5',
      state: 'Uttar Pradesh',
      activeContracts: 14,
      totalAwarded: 480000000,
      riskLevel: 'HIGH',
      cartelFlag: true,
      anomalyCount: 5,
    },
    {
      id: 'VEN-402',
      name: 'Surya Green Tech Ltd',
      gstin: '10AABCS3311E1Z2',
      state: 'Bihar',
      activeContracts: 8,
      totalAwarded: 190000000,
      riskLevel: 'CRITICAL',
      cartelFlag: true,
      anomalyCount: 8,
    },
    {
      id: 'VEN-403',
      name: 'Urban Flow Engineering',
      gstin: '27AACCU8899F1Z0',
      state: 'Maharashtra',
      activeContracts: 19,
      totalAwarded: 840000000,
      riskLevel: 'MEDIUM',
      cartelFlag: false,
      anomalyCount: 2,
    },
    {
      id: 'VEN-404',
      name: 'MedTech Construction Corp',
      gstin: '23AABCM5544K1ZT',
      state: 'Madhya Pradesh',
      activeContracts: 6,
      totalAwarded: 210000000,
      riskLevel: 'LOW',
      cartelFlag: false,
      anomalyCount: 0,
    },
  ];

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.gstin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Contractor & Vendor Watchlist
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Cross-ministry intelligence on contractor shell entities, repeated bidding patterns, and cartel rings.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by contractor name or GSTIN number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor ID</th>
                <th>Contractor Legal Name</th>
                <th>GSTIN</th>
                <th>Active Works</th>
                <th>Total Value Awarded</th>
                <th>Cartel Ring Flag</th>
                <th>Risk Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ven) => (
                <tr key={ven.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{ven.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{ven.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ven.state}</div>
                  </td>
                  <td><code>{ven.gstin}</code></td>
                  <td>{ven.activeContracts}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(ven.totalAwarded)}</td>
                  <td>
                    {ven.cartelFlag ? (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#dc2626',
                          backgroundColor: '#fee2e2',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                        }}
                      >
                        ⚠️ Ring Flagged
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>Clean</span>
                    )}
                  </td>
                  <td>
                    <RiskBadge level={ven.riskLevel} />
                  </td>
                  <td>
                    <Link to={`/vendors/${ven.id}`} className="btn btn-outline btn-sm">
                      Dossier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
