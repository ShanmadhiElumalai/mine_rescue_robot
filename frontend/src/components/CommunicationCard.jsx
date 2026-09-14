import React from 'react';
import { Wifi, AlertTriangle } from 'lucide-react';

export default function CommunicationCard() {
  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <Wifi size={16} color="#f59e0b" />
          <span className="card-title">6. Communication</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body comm-layout">
        <div className="comm-top-row">
          <div className="safety-gauge-box" style={{ width: '110px', height: '110px' }}>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle-fill yellow" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="gauge-percentage">
              <div className="gauge-val" style={{ fontSize: '18px' }}>65%</div>
              <div className="gauge-lbl" style={{ color: '#f59e0b', fontSize: '9px' }}>MODERATE</div>
            </div>
          </div>

          <div className="comm-metrics-grid">
            <div className="comm-metric-tile">
              <div className="comm-metric-lbl">Signal Strength</div>
              <div className="comm-metric-val">-68 dBm</div>
            </div>
            <div className="comm-metric-tile">
              <div className="comm-metric-lbl">Latency</div>
              <div className="comm-metric-val">180 ms</div>
            </div>
            <div className="comm-metric-tile">
              <div className="comm-metric-lbl">Current Depth</div>
              <div className="comm-metric-val">245 m</div>
            </div>
            <div className="comm-metric-tile">
              <div className="comm-metric-lbl">Connection</div>
              <div className="comm-metric-val" style={{ color: '#ef4444' }}>DEGRADING</div>
            </div>
          </div>
        </div>

        {/* Signal vs Depth Chart Curve */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Signal vs Depth</div>
          <div style={{ height: '80px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '8px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 60">
              <path d="M 10,10 Q 80,15 120,35 T 190,55" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="120" cy="35" r="4" fill="#ef4444" />
              <text x="125" y="32" fill="#ef4444" fontSize="8" fontWeight="bold">Current (245m)</text>
            </svg>
          </div>
        </div>

        <div className="comm-alert-box">
          <AlertTriangle size={18} style={{ shrink: 0, marginTop: '2px' }} />
          <div>
            <strong>COMMUNICATION LOSS IMMINENT</strong><br />
            Robot depth: 420m | Estimated connection stability: <strong>CRITICAL</strong><br />
            <em>Recommendation: Return to safer depth.</em>
          </div>
        </div>
      </div>
    </div>
  );
}
