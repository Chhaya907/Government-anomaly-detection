import React, { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDate } from '../../utils/formatters';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    reportService.getReports().then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    const newReport = await reportService.generateReport({ scheme: 'All Schemes' });
    setReports([
      {
        ...newReport,
        fileSize: '3.1 MB',
        format: 'PDF',
        totalAnomalies: 114,
        financialRiskIdentified: 1420000000,
      },
      ...reports,
    ]);
    setGenerating(false);
  };

  if (loading) return <Loader fullPage />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            Statutory & Forensic Audit Reports
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Generate executive compliance summaries, PAC dossiers, and district anomaly reports.
          </p>
        </div>
        <Button variant="primary" icon="⚡" onClick={handleGenerate} loading={generating}>
          Generate New Audit Report
        </Button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Report Title</th>
                <th>Covered Scheme</th>
                <th>Date Generated</th>
                <th>Identified Anomalies</th>
                <th>Calculated Risk Exposure</th>
                <th>Format</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rep) => (
                <tr key={rep.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{rep.id}</td>
                  <td style={{ fontWeight: 600 }}>{rep.title}</td>
                  <td>{rep.scheme}</td>
                  <td>{formatDate(rep.generatedDate)}</td>
                  <td style={{ fontWeight: 600 }}>{rep.totalAnomalies}</td>
                  <td style={{ fontWeight: 600, color: 'var(--risk-critical)' }}>
                    {formatCurrency(rep.financialRiskIdentified)}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {rep.format} ({rep.fileSize})
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => alert(`Downloading report: ${rep.title}`)}
                    >
                      Download
                    </button>
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

export default Reports;
