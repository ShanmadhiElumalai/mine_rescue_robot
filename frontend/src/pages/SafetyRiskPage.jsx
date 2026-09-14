import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SafetyRiskPage() {
  const { safetyEngine } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'SAFE':
        return '#10b981';
      case 'WARNING':
        return '#f59e0b';
      case 'HIGH':
        return '#f97316';
      case 'CRITICAL':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  const statusColor = getStatusColor(safetyEngine.overallSafetyStatus);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Safety & Risk Assessment</h2>
          <p className="page-subtitle">Real-time risk scoring engine and safe entry evaluation for underground search operations</p>
        </div>
      </div>

      <div className="full-page-grid-2col">
        {/* Left Column: Safety Gauge & Entry Recommendation */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <ShieldCheck size={16} color={statusColor} />
              <span className="card-title">Overall Safety & Safe Entry Engine</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="safety-top-row" style={{ justifyContent: 'space-around' }}>
              <div className="safety-gauge-box" style={{ width: '180px', height: '180px' }}>
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path 
                    className="circle-fill" 
                    stroke={statusColor}
                    strokeDasharray={`${safetyEngine.safeEntryPercentage}, 100`} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <div className="gauge-percentage">
                  <div className="gauge-val" style={{ fontSize: '28px', color: statusColor }}>{safetyEngine.safeEntryPercentage}%</div>
                  <div className="gauge-lbl" style={{ fontSize: '12px', color: statusColor }}>{safetyEngine.overallSafetyStatus}</div>
                </div>
              </div>

              <div className="safe-entry-recommendation-box" style={{ padding: '20px' }}>
                <div className="safe-entry-title" style={{ fontSize: '13px' }}>Safe Entry Percentage</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                  {safetyEngine.overallSafetyStatus === 'CRITICAL' ? (
                    <XCircle size={32} color="#ef4444" />
                  ) : safetyEngine.overallSafetyStatus === 'HIGH' || safetyEngine.overallSafetyStatus === 'WARNING' ? (
                    <AlertTriangle size={32} color="#f59e0b" />
                  ) : (
                    <CheckCircle2 size={32} color="#10b981" />
                  )}
                  <span className="safe-entry-score" style={{ fontSize: '36px', color: statusColor }}>{safetyEngine.safeEntryPercentage}%</span>
                </div>
                <div className="safe-entry-reason" style={{ fontSize: '13px', fontWeight: 700, color: statusColor }}>{safetyEngine.statusText}</div>
                <ul style={{ fontSize: '12px', color: '#334155', paddingLeft: '16px', marginTop: '6px', lineHeight: '1.6' }}>
                  {safetyEngine.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            {safetyEngine.dangerousSensor && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '14px 18px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <AlertTriangle size={18} color="#ef4444" />
                  <strong style={{ color: '#991b1b', fontSize: '13px' }}>Active Hazardous Threshold Exceeded:</strong>
                </div>
                <div style={{ color: '#7f1d1d', fontSize: '12.5px', fontWeight: 600 }}>
                  {safetyEngine.dangerousSensor}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Risk Breakdown */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <ShieldCheck size={16} color="#2563eb" />
              <span className="card-title">Risk Category Breakdown</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="risk-breakdown-list">
              <div className="risk-item" style={{ padding: '8px 0' }}>
                <span className="risk-label" style={{ fontSize: '13px' }}>Gas Hazard Risk</span>
                <div className="risk-bar-container" style={{ height: '12px' }}>
                  <div className="risk-bar-fill" style={{ width: `${safetyEngine.gasRisk}%`, backgroundColor: safetyEngine.gasRisk > 70 ? '#ef4444' : safetyEngine.gasRisk > 40 ? '#f59e0b' : '#10b981' }}></div>
                </div>
                <span className="risk-val" style={{ fontSize: '13px' }}>{safetyEngine.gasRisk}%</span>
              </div>

              <div className="risk-item" style={{ padding: '8px 0' }}>
                <span className="risk-label" style={{ fontSize: '13px' }}>Temperature Risk</span>
                <div className="risk-bar-container" style={{ height: '12px' }}>
                  <div className="risk-bar-fill" style={{ width: `${safetyEngine.tempRisk}%`, backgroundColor: safetyEngine.tempRisk > 70 ? '#ef4444' : safetyEngine.tempRisk > 40 ? '#f97316' : '#10b981' }}></div>
                </div>
                <span className="risk-val" style={{ fontSize: '13px' }}>{safetyEngine.tempRisk}%</span>
              </div>

              <div className="risk-item" style={{ padding: '8px 0' }}>
                <span className="risk-label" style={{ fontSize: '13px' }}>Communication Risk</span>
                <div className="risk-bar-container" style={{ height: '12px' }}>
                  <div className="risk-bar-fill" style={{ width: `${safetyEngine.commRisk}%`, backgroundColor: safetyEngine.commRisk > 70 ? '#ef4444' : safetyEngine.commRisk > 40 ? '#f59e0b' : '#10b981' }}></div>
                </div>
                <span className="risk-val" style={{ fontSize: '13px' }}>{safetyEngine.commRisk}%</span>
              </div>

              <div className="risk-item" style={{ padding: '8px 0' }}>
                <span className="risk-label" style={{ fontSize: '13px' }}>Robot Health Risk</span>
                <div className="risk-bar-container" style={{ height: '12px' }}>
                  <div className="risk-bar-fill" style={{ width: `${safetyEngine.robotHealthRisk}%`, backgroundColor: '#3b82f6' }}></div>
                </div>
                <span className="risk-val" style={{ fontSize: '13px' }}>{safetyEngine.robotHealthRisk}%</span>
              </div>

              <div className="risk-item" style={{ padding: '8px 0' }}>
                <span className="risk-label" style={{ fontSize: '13px' }}>Survivor Condition Risk</span>
                <div className="risk-bar-container" style={{ height: '12px' }}>
                  <div className="risk-bar-fill" style={{ width: `${safetyEngine.survivorRisk}%`, backgroundColor: '#f59e0b' }}></div>
                </div>
                <span className="risk-val" style={{ fontSize: '13px' }}>{safetyEngine.survivorRisk}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

