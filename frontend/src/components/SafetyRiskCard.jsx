import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SafetyRiskCard() {
  const safetyPercent = 72;
  const strokeDash = `${safetyPercent}, 100`;

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <ShieldCheck size={16} color="#10b981" />
          <span className="card-title">3. Safety & Risk</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body safety-risk-content">
        <div className="safety-top-row">
          <div className="safety-gauge-box">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle-fill green" strokeDasharray={strokeDash} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="gauge-percentage">
              <div className="gauge-val">72%</div>
              <div className="gauge-lbl">SAFE</div>
            </div>
          </div>

          <div className="safe-entry-recommendation-box">
            <div className="safe-entry-title">Safe Entry</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={24} color="#10b981" />
              <span className="safe-entry-score">92%</span>
            </div>
            <div className="safe-entry-reason">Entry Recommended</div>
            <ul style={{ fontSize: '11px', color: '#475569', paddingLeft: '14px', marginTop: '4px' }}>
              <li>All systems normal</li>
              <li>Reduced communication risk</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Risk Breakdown</h4>
          <div className="risk-breakdown-list">
            <div className="risk-item">
              <span className="risk-label">Gas Risk</span>
              <div className="risk-bar-container">
                <div className="risk-bar-fill" style={{ width: '82%', backgroundColor: '#ef4444' }}></div>
              </div>
              <span className="risk-val">82%</span>
            </div>

            <div className="risk-item">
              <span className="risk-label">Temperature Risk</span>
              <div className="risk-bar-container">
                <div className="risk-bar-fill" style={{ width: '35%', backgroundColor: '#f97316' }}></div>
              </div>
              <span className="risk-val">35%</span>
            </div>

            <div className="risk-item">
              <span className="risk-label">Communication Risk</span>
              <div className="risk-bar-container">
                <div className="risk-bar-fill" style={{ width: '28%', backgroundColor: '#10b981' }}></div>
              </div>
              <span className="risk-val">28%</span>
            </div>

            <div className="risk-item">
              <span className="risk-label">Robot Health Risk</span>
              <div className="risk-bar-container">
                <div className="risk-bar-fill" style={{ width: '15%', backgroundColor: '#3b82f6' }}></div>
              </div>
              <span className="risk-val">15%</span>
            </div>

            <div className="risk-item">
              <span className="risk-label">Survivor Risk</span>
              <div className="risk-bar-container">
                <div className="risk-bar-fill" style={{ width: '60%', backgroundColor: '#f59e0b' }}></div>
              </div>
              <span className="risk-val">60%</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', padding: '10px 12px', borderRadius: '8px', fontSize: '11.5px' }}>
          <strong style={{ color: '#b45309' }}>Recommendations:</strong>
          <ul style={{ color: '#78350f', paddingLeft: '16px', marginTop: '2px' }}>
            <li>Continue mission</li>
            <li>Monitor gas levels closely</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
