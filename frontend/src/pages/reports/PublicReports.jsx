import React, { useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatters';

const PublicReports = () => {
  const [selectedScheme, setSelectedScheme] = useState('ALL');

  const publicDisclosures = [
    {
      id: 'PUB-DISC-2024-01',
      title: 'Annual Public Works Delivery & Expenditure Summary 2023-24',
      date: 'April 2024',
      coverage: 'National Overview',
      totalWorks: '14,280 Projects',
      publicSpend: 52400000000,
      completionRate: '78.4%',
      type: 'Annual Transparency Disclosure',
    },
    {
      id: 'PUB-DISC-2024-02',
      title: 'Gram Sadak Rural Road Connectivity Progress Report',
      date: 'March 2024',
      coverage: 'PMGSY Scheme',
      totalWorks: '4,190 Kilometers',
      publicSpend: 18400000000,
      completionRate: '82.1%',
      type: 'Sectoral Physical Progress',
    },
    {
      id: 'PUB-DISC-2024-03',
      title: 'Clean Drinking Water & Sanitation Public Scorecard',
      date: 'February 2024',
      coverage: 'Jal Jeevan Mission',
      totalWorks: '2,850 Gram Panchayats',
      publicSpend: 14200000000,
      completionRate: '74.6%',
      type: 'Public Asset Verification',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Public Transparency & Expenditure Disclosures
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Open public data portal for citizen monitoring of government-funded development works and infrastructure outlays.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Public Projects"
          value="14,280"
          trend="Nationwide across 6 schemes"
          trendType="neutral"
          icon="🏛️"
        />
        <StatCard
          title="Sanctioned Public Outlay"
          value="₹5,240 Cr"
          trend="Disclosed for public audit"
          trendType="positive"
          icon="💰"
        />
        <StatCard
          title="Completed Physical Works"
          value="11,200"
          trend="78.4% delivery rate"
          trendType="positive"
          icon="✅"
        />
        <StatCard
          title="Citizen Inquiries Addressed"
          value="1,840"
          trend="Resolved by District Collectors"
          trendType="positive"
          icon="👥"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Verified Public Disclosures & Scorecards</h3>
            <p className="card-subtitle">Official public records published for civic audit</p>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Disclosure Title</th>
                <th>Sector / Scheme</th>
                <th>Public Outlay</th>
                <th>Completion</th>
                <th>Published Date</th>
                <th>Public Copy</th>
              </tr>
            </thead>
            <tbody>
              {publicDisclosures.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{item.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.type}</div>
                  </td>
                  <td>{item.coverage}</td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>
                    {formatCurrency(item.publicSpend)}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.completionRate}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Downloading public disclosure: ${item.title}`)}
                    >
                      Download PDF
                    </Button>
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

export default PublicReports;
