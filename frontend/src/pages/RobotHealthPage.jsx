import React, { useEffect, useState } from 'react';
import { HeartPulse, AlertTriangle, Cpu, CheckCircle2 } from 'lucide-react';
import { getRobotPartsHealth } from '../services/api';

export default function RobotHealthPage() {
  const [healthData, setHealthData] = useState({
    partsHealth: {
      "Head (Camera & Thermal Array)": { score: 96, status: "Healthy" },
      "Segment 1 (Drive Motors & MCU)": { score: 94, status: "Healthy" },
      "Segment 2 (Gas Sensor Payload)": { score: 92, status: "Healthy" },
      "Tail (TTE Communication Antenna)": { score: 91, status: "Healthy" },
      "Motor / Joint Actuators": { score: 78, status: "Warning" }
    },
    overallHealth: 96,
    status: "Good"
  });

  useEffect(() => {
    getRobotPartsHealth().then(res => {
      if (res && res.partsHealth) setHealthData(res);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Robot Health & Hardware Diagnostics</h2>
          <p className="page-subtitle">Modular telemetry and joint actuator diagnostics for SLYTHERINE</p>
        </div>
      </div>

      <div className="full-page-grid-2col">
        {/* Left Column: Robot Showcase & Overall Health */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <Cpu size={16} color="#2563eb" />
              <span className="card-title">SLYTHERINE Modular Architecture Showcase</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '240px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/slytherine_robot.jpg" 
                alt="SLYTHERINE Snake Rescue Robot Diagnostics" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.src = "/slytherine_robot_gen.png";
                }}
              />
            </div>

            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Overall Diagnostic Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{healthData.overallHealth}%</span>
                  <span className="component-badge healthy" style={{ fontSize: '13px', padding: '4px 10px' }}>{healthData.status}</span>
                </div>
              </div>
              <div style={{ width: '64px', height: '64px', position: 'relative' }}>
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle-fill green" strokeDasharray={`${healthData.overallHealth}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Modular Health Breakdown & Warnings */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <HeartPulse size={16} color="#ef4444" />
              <span className="card-title">Modular Component Breakdown</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="robot-components-list">
              {Object.entries(healthData.partsHealth).map(([compName, compInfo]) => {
                const statusClass = compInfo.status.toLowerCase();
                return (
                  <div key={compName} className="component-item" style={{ padding: '12px 14px' }}>
                    <span className="component-name" style={{ fontSize: '13.5px' }}>{compName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="component-score" style={{ fontSize: '14px' }}>{compInfo.score}%</span>
                      <span className={`component-badge ${statusClass}`}>{compInfo.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="health-failure-alert" style={{ padding: '16px' }}>
              <div className="alert-icon-wrap">
                <AlertTriangle size={22} />
              </div>
              <div>
                <div className="alert-title" style={{ fontSize: '14px' }}>Segment 3 Joint Actuator Warning</div>
                <div className="alert-body" style={{ fontSize: '12px', marginTop: '4px', lineHeight: '1.5' }}>
                  Failure Detected: Increased mechanical resistance & motor temperature in Segment 3 joints.<br />
                  <strong>Recommended Action:</strong> Reduce locomotion speed to 0.5 m/s to prevent thermal throttling.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
