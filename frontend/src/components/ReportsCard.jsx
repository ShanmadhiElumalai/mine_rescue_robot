import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { downloadReport } from '../services/api';

export default function ReportsCard() {
  const reportsList = [
    {
      id: 'mission-report',
      name: 'Mission Report',
      desc: 'Complete mission summary with key events and statistics.',
      type: 'pdf'
    },
    {
      id: 'gas-analysis',
      name: 'Gas Analysis Report',
      desc: 'Gas concentration and hazard analysis.',
      type: 'pdf'
    },
    {
      id: 'replay',
      name: 'Replay Report',
      desc: 'Timeline, events and analysis.',
      type: 'pdf'
    },
    {
      id: 'mission-logs',
      name: 'Mission Logs',
      desc: 'Full event logs and system activity report.',
      type: 'pdf'
    },
    {
      id: 'sensor-csv',
      name: 'Sensor Data Export',
      desc: 'Raw sensor data in CSV format.',
      type: 'csv'
    }
  ];

  const handleDownload = (id) => {
    downloadReport(id, 1);
  };

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <Download size={16} color="#2563eb" />
          <span className="card-title">10. Reports</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body">
        <div className="reports-list">
          {reportsList.map(rep => (
            <div key={rep.id} className="report-item">
              <div className="report-info">
                <div className="report-icon">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="report-name">{rep.name}</div>
                  <div className="report-desc">{rep.desc}</div>
                </div>
              </div>
              <div className="report-actions">
                <button className="btn-report-action" onClick={() => handleDownload(rep.id)}>
                  <Eye size={12} /> View
                </button>
                <button className="btn-report-action" style={{ backgroundColor: '#2563eb', color: 'white', borderColor: '#2563eb' }} onClick={() => handleDownload(rep.id)}>
                  <Download size={12} /> {rep.type === 'csv' ? 'Download CSV' : 'Download PDF'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
