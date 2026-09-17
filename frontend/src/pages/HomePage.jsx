import React from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  User, 
  Wifi, 
  Battery, 
  CheckCircle2, 
  AlertTriangle, 
  Signal, 
  Cpu 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import tunnelRobotImg from '../assets/slytherine_tunnel_robot.jpg';

export default function HomePage() {
  const { safetyEngine, commState, batteryState, setActiveNav } = useApp();

  // Safety card dynamic mapping with reference defaults
  const safetyStatusLabel = safetyEngine?.overallSafetyStatus || 'SAFE';
  const isSafetySafe = safetyStatusLabel.toUpperCase() === 'SAFE';
  const safetyDesc = safetyEngine?.dangerousSensor || 'No critical hazards detected';

  // Safety Entry dynamic mapping with reference defaults
  const entryPercentage = safetyEngine?.safeEntryPercentage ?? 43;
  const entryDesc = 'Entry restricted';

  // Communication dynamic mapping with reference defaults
  const commPercentage = commState?.healthPercentage ?? 65;
  const commSignal = 'Moderate (-68 dBm)';

  // Battery dynamic mapping with reference defaults
  const batteryPct = batteryState?.percentage ?? 84;
  const batteryRemaining = batteryState?.timeRemaining ?? '~ 2h 36m remaining';

  return (
    <div className="overview-page-wrapper">
      {/* 1. Hero Section */}
      <section className="overview-hero-card">
        <div className="hero-content-column">
          <span className="hero-brand-eyebrow">SLYTHERINE</span>
          <h1 className="hero-heading">
            <span className="hero-heading-line">Welcome to</span>
            <span className="hero-heading-line">Mine Rescue Robot</span>
            <span className="hero-heading-brand">SLYTHERINE</span>
          </h1>
          <p className="hero-subtext">Monitoring. Detecting. Saving Lives.</p>
          <div className="hero-accent-divider"></div>
        </div>

        <div className="hero-tunnel-scene">
          <img
            src={tunnelRobotImg}
            alt="SLYTHERINE Rescue Robot in Mine Tunnel"
            className="hero-tunnel-image"
          />
          <div className="hero-tunnel-vignette"></div>
        </div>
      </section>

      {/* 2. Four Status / Metric Cards */}
      <section className="overview-metrics-grid">
        {/* Card 1: Safety Status */}
        <div 
          className="metric-card metric-card-safety"
          onClick={() => setActiveNav && setActiveNav('safety-risk')}
          role="button"
          tabIndex={0}
        >
          <div className="metric-card-header">
            <div className="metric-icon-box green">
              <ShieldCheck size={18} />
            </div>
            <span className="metric-arrow-btn">
              <ChevronRight size={16} />
            </span>
          </div>

          <div className="metric-card-content">
            <span className="metric-title">Safety Status</span>
            <div className="metric-primary-value green">{safetyStatusLabel}</div>
            <span className="metric-subtitle">{safetyDesc}</span>
          </div>

          <div className="metric-card-footer">
            <div className="metric-status-badge green">
              <CheckCircle2 size={13} />
              <span>{isSafetySafe ? 'System normal' : 'Hazard active'}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Safety Entry */}
        <div 
          className="metric-card metric-card-entry"
          onClick={() => setActiveNav && setActiveNav('safety-risk')}
          role="button"
          tabIndex={0}
        >
          <div className="metric-card-header">
            <div className="metric-icon-box amber">
              <User size={18} />
            </div>
            <span className="metric-arrow-btn">
              <ChevronRight size={16} />
            </span>
          </div>

          <div className="metric-card-content">
            <span className="metric-title">Safety Entry</span>
            <div className="metric-primary-value amber">{entryPercentage}%</div>
            <span className="metric-subtitle">{entryDesc}</span>
          </div>

          <div className="metric-card-footer">
            <div className="metric-status-badge amber">
              <AlertTriangle size={13} />
              <span>Keep monitoring</span>
            </div>
          </div>
        </div>

        {/* Card 3: Communication */}
        <div 
          className="metric-card metric-card-comm"
          onClick={() => setActiveNav && setActiveNav('communication')}
          role="button"
          tabIndex={0}
        >
          <div className="metric-card-header">
            <div className="metric-icon-box cyan">
              <Wifi size={18} />
            </div>
            <span className="metric-arrow-btn">
              <ChevronRight size={16} />
            </span>
          </div>

          <div className="metric-card-content">
            <span className="metric-title">Communication</span>
            <div className="metric-primary-value cyan">{commPercentage}%</div>
            <span className="metric-subtitle">{commSignal}</span>

            <div className="metric-progress-track">
              <div 
                className="metric-progress-fill cyan" 
                style={{ width: `${Math.min(100, Math.max(0, commPercentage))}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-card-footer">
            <div className="metric-status-badge cyan">
              <Signal size={13} />
              <span>Stable</span>
            </div>
          </div>
        </div>

        {/* Card 4: Battery */}
        <div 
          className="metric-card metric-card-battery"
          onClick={() => setActiveNav && setActiveNav('robot-health')}
          role="button"
          tabIndex={0}
        >
          <div className="metric-card-header">
            <div className="metric-icon-box purple">
              <Battery size={18} />
            </div>
            <span className="metric-arrow-btn">
              <ChevronRight size={16} />
            </span>
          </div>

          <div className="metric-card-content">
            <span className="metric-title">Battery</span>
            <div className="metric-primary-value purple">{batteryPct}%</div>
            <span className="metric-subtitle">{batteryRemaining}</span>

            <div className="metric-progress-track">
              <div 
                className="metric-progress-fill purple" 
                style={{ width: `${Math.min(100, Math.max(0, batteryPct))}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-card-footer">
            <div className="metric-status-badge purple">
              <Cpu size={13} />
              <span>Normal</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
