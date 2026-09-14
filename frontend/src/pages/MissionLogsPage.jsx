import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MissionLogsPage() {
  const { missionLogs } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Gas', 'Human', 'Robot', 'Communication', 'Failure', 'Command'];

  const filteredLogs = missionLogs.filter(log => {
    if (activeTab === 'All') return true;
    return log.category?.toLowerCase() === activeTab.toLowerCase() || log.event?.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Mission Event Logs</h2>
          <p className="page-subtitle">Full system activity stream, event history, and fault diagnostics for MISSION-001</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="card-header">
          <div className="card-title-group">
            <FileText size={16} color="#2563eb" />
            <span className="card-title">Real-Time Event Stream</span>
          </div>
        </div>
        <div className="card-body">
          <div className="logs-tabs-row" style={{ marginBottom: '16px' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`log-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ padding: '6px 16px', fontSize: '13px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ overflowX: 'auto', minHeight: '360px' }}>
            <table className="logs-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>Time</th>
                  <th style={{ width: '220px' }}>Event Name</th>
                  <th>Event Details & Description</th>
                  <th style={{ width: '120px' }}>Severity</th>
                  <th style={{ width: '120px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#64748b' }}>{log.time}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{log.event}</td>
                    <td style={{ color: '#334155' }}>{log.details}</td>
                    <td>
                      <span className={`event-badge ${log.severity?.toLowerCase() || 'info'}`}>
                        {log.severity || 'Info'}
                      </span>
                    </td>
                    <td>
                      <span className={`log-status-badge ${log.status?.toLowerCase() || 'resolved'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

