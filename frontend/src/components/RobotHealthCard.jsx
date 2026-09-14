import React, { useEffect, useState } from 'react';
import { HeartPulse, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getRobotPartsHealth } from '../services/api';

export default function RobotHealthCard() {
  const [healthData, setHealthData] = useState({
    partsHealth: {
      "Head (Camera/Sensors)": { score: 96, status: "Healthy" },
      "Segment 1 (Drive Motors)": { score: 94, status: "Healthy" },
      "Segment 2 (Sensory Array)": { score: 92, status: "Healthy" },
      "Tail (Comm Antenna)": { score: 91, status: "Healthy" },
      "Motor / Joint Actuators": { score: 78, status: "Warning" }
    },
    overallHealth: 96,
    status: "Good"
  });

  useEffect(() => {
    getRobotPartsHealth().then(res => {
      if (res && res.partsHealth) {
        setHealthData(res);
      }
    }).catch(err => console.error("Parts health fetch error:", err));
  }, []);

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <HeartPulse size={16} color="#ef4444" />
          <span className="card-title">4. Robot Health</span>
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
          Robot: <strong style={{ color: '#0f172a' }}>SLYTHERINE</strong>
        </div>
      </div>
      <div className="card-body robot-health-layout">
        <div className="robot-health-top">
          <div className="robot-health-img-container">
            <img 
              src="/slytherine_robot.jpg" 
              alt="SLYTHERINE Modular Structure" 
              className="robot-health-img"
              onError={(e) => {
                e.target.src = "/slytherine_robot_gen.png";
              }}
            />
          </div>

          <div className="robot-components-list">
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Modular Component Health
            </h4>
            {Object.entries(healthData.partsHealth).map(([compName, compInfo]) => {
              const statusClass = compInfo.status.toLowerCase();
              return (
                <div key={compName} className="component-item">
                  <span className="component-name">{compName}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="component-score">{compInfo.score}%</span>
                    <span className={`component-badge ${statusClass}`}>{compInfo.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Overall Health</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{healthData.overallHealth}%</span>
              <span className="component-badge healthy" style={{ fontSize: '12px', padding: '3px 8px' }}>{healthData.status}</span>
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', position: 'relative' }}>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle-fill green" strokeDasharray={`${healthData.overallHealth}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>

        <div className="health-failure-alert">
          <div className="alert-icon-wrap">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="alert-title">Motor / Joint Warning</div>
            <div className="alert-body">
              Failure: Motor/joint abnormality in Segment 3<br />
              <strong>Recommendation:</strong> Reduce movement speed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
