import React from 'react';
import { Download, Eye, FileText, FileSpreadsheet } from 'lucide-react';
import { downloadReport } from '../services/api';

export default function ReportsPage() {
  const reportsList = [
    {
      id: 'mission-report',
      name: 'Mission Summary Report',
      desc: 'Complete mission summary with key events, survivor detections, and operational statistics.',
      type: 'pdf'
    },
    {
      id: 'gas-analysis',
      name: 'Gas & Environmental Hazard Analysis Report',
      desc: 'Detailed gas concentration logs (CH₄, CO, CO₂, H₂S, VOC) and hazard threshold analysis.',
      type: 'pdf'
    },
    {
      id: 'replay',
      name: 'Mission Replay Telemetry Analysis',
      desc: 'Sequential timeline events, robot locomotion path, and hazard zone evolution.',
      type: 'pdf'
    },
    {
      id: 'mission-logs',
      name: 'Full Mission Logs & System Diagnostics',
      desc: 'Unfiltered system event log report including error codes and resolution status.',
      type: 'pdf'
    },
    {
      id: 'sensor-csv',
      name: 'Sensor Data Export (CSV)',
      desc: 'Raw numerical sensor readings export formatted for external analysis software.',
      type: 'csv'
    }
  ];

  const handleDownload = (id) => {
    downloadReport(id, 1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Mission Reports & Sensor Exports</h2>
          <p className="page-subtitle">Generate, view, and export official mission documentation and sensor telemetry</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="card-header">
          <div className="card-title-group">
            <Download size={16} color="#2563eb" />
            <span className="card-title">Available Export Documents — MISSION-001</span>
          </div>
        </div>
        <div className="card-body">
          <div className="reports-list" style={{ gap: '14px' }}>
            {reportsList.map(rep => (
              <div key={rep.id} className="report-item" style={{ padding: '16px 20px' }}>
                <div className="report-info">
                  <div className="report-icon" style={{ width: '44px', height: '44px' }}>
                    {rep.type === 'csv' ? <FileSpreadsheet size={22} /> : <FileText size={22} />}
                  </div>
                  <div>
                    <div className="report-name" style={{ fontSize: '15px' }}>{rep.name}</div>
                    <div className="report-desc" style={{ fontSize: '12.5px', marginTop: '2px' }}>{rep.desc}</div>
                  </div>
                </div>
                <div className="report-actions">
                  <button className="btn-report-action" onClick={() => handleDownload(rep.id)} style={{ padding: '8px 14px', fontSize: '12.5px' }}>
                    <Eye size={14} /> View Document
                  </button>
                  <button className="btn-report-action" style={{ backgroundColor: '#2563eb', color: 'white', borderColor: '#2563eb', padding: '8px 14px', fontSize: '12.5px' }} onClick={() => handleDownload(rep.id)}>
                    <Download size={14} /> {rep.type === 'csv' ? 'Export CSV' : 'Download PDF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
