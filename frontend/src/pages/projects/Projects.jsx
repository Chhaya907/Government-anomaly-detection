import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../../services/projectService';
import RiskBadge from '../../components/cases/RiskBadge';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatters';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');

  useEffect(() => {
    projectService.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.scheme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || p.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  if (loading) return <Loader fullPage />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Public Infrastructure Projects
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Comprehensive register of monitored government procurement and civil works contracts.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by project name, district, or scheme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ width: '180px' }}>
            <select
              className="form-input"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name & Scheme</th>
                <th>Location</th>
                <th>Sanctioned Outlay</th>
                <th>Expenditure</th>
                <th>Progress</th>
                <th>Anomaly Index</th>
                <th>Risk Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => (
                <tr key={proj.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{proj.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{proj.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{proj.scheme}</div>
                  </td>
                  <td>{proj.district}, {proj.state}</td>
                  <td>{formatCurrency(proj.sanctionedAmount)}</td>
                  <td>{formatCurrency(proj.expenditure)}</td>
                  <td style={{ width: '130px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          flex: 1,
                          height: '6px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${proj.completionRate}%`,
                            height: '100%',
                            backgroundColor: 'var(--primary-navy)',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{proj.completionRate}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: proj.anomalyScore > 75 ? 'var(--risk-critical)' : 'inherit' }}>
                      {proj.anomalyScore}/100
                    </span>
                  </td>
                  <td>
                    <RiskBadge level={proj.riskLevel} />
                  </td>
                  <td>
                    <Link to={`/projects/${proj.id}`} className="btn btn-outline btn-sm">
                      Details
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

export default Projects;
