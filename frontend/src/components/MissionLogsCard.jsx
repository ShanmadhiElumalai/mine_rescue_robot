import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { getMissionLogs } from '../services/api';

export default function MissionLogsCard() {
  const [activeTab, setActiveTab] = useState('All');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getMissionLogs().then(data => {
      if (Array.isArray(data)) setLogs(data);
    });
  }, []);

  const tabs = ['All', 'Gas', 'Human', 'Robot', 'Communication', 'Failure', 'Command'];

  const filteredLogs = logs.filter(log => {
    if (activeTab === 'All') return true;
    return log.category?.toLowerCase() === activeTab.toLowerCase() || log.event?.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <FileText size={16} color="#2563eb" />
          <span className="card-title">8. Mission Logs</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body">
        <div className="logs-tabs-row">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`log-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto', maxHeight: '240px' }}>
          <table className="logs-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'monospace' }}>{log.time}</td>
                  <td style={{ fontWeight: 600 }}>{log.event}</td>
                  <td style={{ color: '#475569' }}>{log.details}</td>
                  <td>
                    <span className={`log-status-badge ${log.status.toLowerCase()}`}>
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
  );
}
