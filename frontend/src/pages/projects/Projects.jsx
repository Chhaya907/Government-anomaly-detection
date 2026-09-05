import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, CITIZEN_PROJECT_STATUS } from '../../utils/constants';
import projectService from '../../services/projectService';
import RiskBadge from '../../components/cases/RiskBadge';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatters';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterCitizenStatus, setFilterCitizenStatus] = useState('ALL');

  const isCitizen = user?.role === ROLES.CITIZEN;
  const isDistrict = user?.role === ROLES.DISTRICT;
  const isMP = user?.role === ROLES.MP;

  useEffect(() => {
    projectService.getProjects().then((data) => {
      let scopedData = data;
      if (isDistrict && user?.district) {
        scopedData = data.filter((p) => p.district.toLowerCase() === user.district.toLowerCase());
      } else if (isMP) {
        // MP constituency filter (Varanasi in demo)
        scopedData = data.filter((p) => p.district === 'Varanasi');
      }
      setProjects(scopedData);
      setLoading(false);
    });
  }, [user, isDistrict, isMP]);

  const getCitizenStatus = (proj) => {
    if (proj.completionRate >= 100 || proj.status === 'COMPLETED') {
      return CITIZEN_PROJECT_STATUS.COMPLETED;
    }
    if (proj.status === 'PLANNED') {
      return CITIZEN_PROJECT_STATUS.PENDING;
    }
    return CITIZEN_PROJECT_STATUS.ONGOING;
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.scheme.toLowerCase().includes(searchTerm.toLowerCase());

    if (isCitizen) {
      const citizenStatus = getCitizenStatus(p);
      const matchesCitizenStatus =
        filterCitizenStatus === 'ALL' || citizenStatus === filterCitizenStatus;
      return matchesSearch && matchesCitizenStatus;
    }

    const matchesRisk = filterRisk === 'ALL' || p.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  if (loading) return <Loader fullPage />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            {isCitizen ? 'Public Infrastructure Projects Explorer' : 'Monitored Public Infrastructure Works'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {isCitizen
              ? 'Public transparency register of government development projects, sanctioned outlays, and execution progress.'
              : 'Comprehensive register of monitored government procurement and civil works contracts.'}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <input
              type="text"
              className="form-input"
              placeholder={
                isCitizen
                  ? 'Search by project name, district, or state...'
                  : 'Search by project name, district, or scheme...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isCitizen ? (
            <div style={{ width: '220px' }}>
              <select
                className="form-input"
                value={filterCitizenStatus}
                onChange={(e) => setFilterCitizenStatus(e.target.value)}
              >
                <option value="ALL">All Project Statuses</option>
                <option value={CITIZEN_PROJECT_STATUS.ONGOING}>Ongoing</option>
                <option value={CITIZEN_PROJECT_STATUS.COMPLETED}>Completed</option>
                <option value={CITIZEN_PROJECT_STATUS.PENDING}>Pending / Remaining</option>
              </select>
            </div>
          ) : (
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
          )}
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
                <th>Public Outlay</th>
                <th>Expenditure</th>
                <th>Physical Progress</th>
                <th>Status</th>
                {!isCitizen && <th>Anomaly Index</th>}
                {!isCitizen && <th>Risk Rating</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => {
                const citizenStatus = getCitizenStatus(proj);

                return (
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
                      <span
                        style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor:
                            citizenStatus === CITIZEN_PROJECT_STATUS.COMPLETED
                              ? '#dcfce7'
                              : citizenStatus === CITIZEN_PROJECT_STATUS.ONGOING
                              ? '#e0f2fe'
                              : '#fef3c7',
                          color:
                            citizenStatus === CITIZEN_PROJECT_STATUS.COMPLETED
                              ? '#15803d'
                              : citizenStatus === CITIZEN_PROJECT_STATUS.ONGOING
                              ? '#0369a1'
                              : '#b45309',
                        }}
                      >
                        {citizenStatus}
                      </span>
                    </td>
                    {!isCitizen && (
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            color: proj.anomalyScore > 75 ? 'var(--risk-critical)' : 'inherit',
                          }}
                        >
                          {proj.anomalyScore}/100
                        </span>
                      </td>
                    )}
                    {!isCitizen && (
                      <td>
                        <RiskBadge level={proj.riskLevel} />
                      </td>
                    )}
                    <td>
                      <Link to={`/projects/${proj.id}`} className="btn btn-outline btn-sm">
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
