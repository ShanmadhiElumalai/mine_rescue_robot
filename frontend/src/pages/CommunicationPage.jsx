import React from 'react';
import { Wifi, AlertTriangle, Signal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CommunicationPage() {
  const { commState, depth, setDepth } = useApp();

  const getGaugeColor = (pct) => {
    if (pct < 35) return '#ef4444';
    if (pct < 60) return '#f59e0b';
    return '#10b981';
  };

  const gaugeColor = getGaugeColor(commState.healthPercentage);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Communication & Signal Monitoring</h2>
          <p className="page-subtitle">Through-The-Earth (TTE) wireless signal health and depth loss prediction</p>
        </div>
      </div>

      <div className="full-page-grid-2col">
        {/* Left Column: Communication Health Gauge & Metrics */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <Wifi size={16} color={gaugeColor} />
              <span className="card-title">TTE Communication Link Health</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="comm-top-row">
              <div className="safety-gauge-box" style={{ width: '160px', height: '160px' }}>
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path 
                    className="circle-fill" 
                    stroke={gaugeColor}
                    strokeDasharray={`${commState.healthPercentage}, 100`} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <div className="gauge-percentage">
                  <div className="gauge-val" style={{ fontSize: '24px', color: gaugeColor }}>{commState.healthPercentage}%</div>
                  <div className="gauge-lbl" style={{ color: gaugeColor, fontSize: '11px' }}>{commState.connectionStatus}</div>
                </div>
              </div>

              <div className="comm-metrics-grid" style={{ gap: '12px' }}>
                <div className="comm-metric-tile" style={{ padding: '12px' }}>
                  <div className="comm-metric-lbl">Signal Strength</div>
                  <div className="comm-metric-val" style={{ fontSize: '16px' }}>{commState.signalStrength}</div>
                </div>
                <div className="comm-metric-tile" style={{ padding: '12px' }}>
                  <div className="comm-metric-lbl">Latency</div>
                  <div className="comm-metric-val" style={{ fontSize: '16px' }}>{commState.latency}</div>
                </div>
                <div className="comm-metric-tile" style={{ padding: '12px' }}>
                  <div className="comm-metric-lbl">Current Depth</div>
                  <div className="comm-metric-val" style={{ fontSize: '16px' }}>{depth} m</div>
                </div>
                <div className="comm-metric-tile" style={{ padding: '12px' }}>
                  <div className="comm-metric-lbl">Connection Status</div>
                  <div className="comm-metric-val" style={{ color: gaugeColor, fontSize: '16px' }}>{commState.connectionStatus}</div>
                </div>
              </div>
            </div>

            {/* Simulated Depth Control Slider */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px', fontWeight: 600 }}>
                <span>Simulate Shaft Depth Locomotion:</span>
                <span style={{ color: '#2563eb' }}>{depth} meters</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="10" 
                value={depth} 
                onChange={e => setDepth(parseInt(e.target.value))} 
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                <span>50m (Optimal)</span>
                <span>200m (Moderate)</span>
                <span>350m (Weak)</span>
                <span>500m (Loss Imminent)</span>
              </div>
            </div>

            {commState.warning && (
              <div className="comm-alert-box" style={{ padding: '16px', backgroundColor: commState.healthPercentage < 35 ? '#fef2f2' : '#fffbeb', borderColor: commState.healthPercentage < 35 ? '#fecaca' : '#fef3c7' }}>
                <AlertTriangle size={22} style={{ shrink: 0, marginTop: '2px', color: commState.healthPercentage < 35 ? '#ef4444' : '#f59e0b' }} />
                <div style={{ fontSize: '12.5px', lineHeight: '1.6', color: commState.healthPercentage < 35 ? '#991b1b' : '#78350f' }}>
                  <strong style={{ fontSize: '14px' }}>CONNECTION WARNING — HIGH DEPTH ATTENUATION</strong><br />
                  Robot depth: {depth}m | Prediction: <strong>{commState.prediction}</strong> ({commState.confidence} confidence)<br />
                  <em>Recommendation: {commState.recommendation}</em>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Signal vs Depth Curve & Predictive Analytics */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <Signal size={16} color="#2563eb" />
              <span className="card-title">Signal Attenuation vs Depth Chart</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ height: '220px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 300 120">
                {/* Gridlines */}
                <line x1="20" y1="20" x2="280" y2="20" stroke="#e2e8f0" strokeDasharray="2 2" />
                <line x1="20" y1="60" x2="280" y2="60" stroke="#e2e8f0" strokeDasharray="2 2" />
                <line x1="20" y1="100" x2="280" y2="100" stroke="#e2e8f0" strokeDasharray="2 2" />
                {/* Curve */}
                <path d="M 20,20 Q 140,30 200,70 T 280,110" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx={Math.min(280, Math.max(20, (depth / 500) * 260 + 20))} cy={Math.min(110, Math.max(20, (depth / 500) * 90 + 20))} r="5" fill={gaugeColor} />
                <text x={Math.min(210, Math.max(20, (depth / 500) * 260 + 5))} y={Math.max(25, (depth / 500) * 90 + 10)} fill={gaugeColor} fontSize="10" fontWeight="bold">Current ({depth}m)</text>
              </svg>
            </div>

            <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '12px', color: '#475569' }}>
              <strong>Predictive Analysis:</strong> Wireless attenuation model predicts high probability of complete connection drop beyond 400 meters shaft depth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

