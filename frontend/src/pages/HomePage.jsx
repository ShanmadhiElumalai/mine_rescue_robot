import React from 'react';
import { ShieldCheck, Compass, Wifi, BatteryCharging, AlertTriangle, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { safetyEngine, commState, missionLogs, depth } = useApp();

  const getSafetyBadgeStyle = (status) => {
    switch (status) {
      case 'SAFE':
        return { color: '#10b981', label: 'SAFE' };
      case 'WARNING':
        return { color: '#f59e0b', label: 'WARNING' };
      case 'HIGH':
        return { color: '#f97316', label: 'HIGH RISK' };
      case 'CRITICAL':
        return { color: '#ef4444', label: 'CRITICAL' };
      default:
        return { color: '#10b981', label: 'SAFE' };
    }
  };

  const safetyStyle = getSafetyBadgeStyle(safetyEngine.overallSafetyStatus);
  const recentEvents = missionLogs.slice(0, 4);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Home / Overview Dashboard</h2>
          <p className="page-subtitle">Central mission landing page and status overview</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="home-hero-container">
        <div className="hero-left-content">
          <div className="hero-badge">SMART UNDERGROUND RESCUE ROBOT</div>
          <h1 className="hero-main-title">Welcome to Mine Rescue Robot</h1>
          <h2 className="hero-robot-name">SLYTHERINE</h2>
          <p className="hero-subtext">Monitoring. Detecting. Saving Lives.</p>
          <p className="hero-description">
            Autonomous multi-segmented snake rescue robot deployed for underground disaster response, environmental monitoring, gas hazard detection, and survivor search & rescue operations.
          </p>
        </div>

        <div className="hero-right-image">
          <img 
            src="/slytherine_robot.jpg" 
            alt="SLYTHERINE Snake Rescue Robot" 
            className="slytherine-large-img"
            onError={(e) => {
              e.target.src = "/slytherine_robot_gen.png";
            }}
          />
        </div>
      </div>

      {/* 4 Compact Overview Stats */}
      <div className="hero-stats-row">
        <div className="hero-stat-box">
          <div className={`stat-icon-wrapper ${safetyEngine.overallSafetyStatus.toLowerCase() === 'safe' ? 'green' : safetyEngine.overallSafetyStatus.toLowerCase() === 'warning' ? 'yellow' : 'red'}`}>
            <ShieldCheck size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Safety Status</span>
            <span className="stat-value" style={{ color: safetyStyle.color }}>{safetyStyle.label}</span>
            <span className="stat-desc">{safetyEngine.dangerousSensor || 'No critical hazards'}</span>
          </div>
        </div>

        <div className="hero-stat-box">
          <div className="stat-icon-wrapper blue">
            <Compass size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Safe Entry</span>
            <span className="stat-value">{safetyEngine.safeEntryPercentage}%</span>
            <span className="stat-desc">{safetyEngine.statusText}</span>
          </div>
        </div>

        <div className="hero-stat-box">
          <div className="stat-icon-wrapper purple">
            <Wifi size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Communication</span>
            <span className="stat-value">{commState.healthPercentage}%</span>
            <span className="stat-desc">{commState.connectionStatus} ({commState.signalStrength})</span>
          </div>
        </div>

        <div className="hero-stat-box">
          <div className="stat-icon-wrapper dark">
            <BatteryCharging size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Battery</span>
            <span className="stat-value">84%</span>
            <span className="stat-desc">4h 20m remaining</span>
          </div>
        </div>
      </div>

      {/* Overview Cards Row */}
      <div className="home-overview-grid">
        {/* Current Mission Overview */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <Activity size={16} color="#2563eb" />
              <span className="card-title">Current Mission Overview</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="overview-row">
              <span className="overview-lbl">Active Mission:</span>
              <span className="overview-val">MISSION-001</span>
            </div>
            <div className="overview-row">
              <span className="overview-lbl">Deployment Robot:</span>
              <span className="overview-val" style={{ color: '#2563eb' }}>SLYTHERINE</span>
            </div>
            <div className="overview-row">
              <span className="overview-lbl">Current Depth:</span>
              <span className="overview-val">{depth} m</span>
            </div>
            <div className="overview-row">
              <span className="overview-lbl">System Status:</span>
              <span className={`status-badge ${safetyEngine.overallSafetyStatus.toLowerCase()}`} style={{ fontSize: '11px' }}>
                {safetyEngine.statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Critical Events Summary */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <AlertTriangle size={16} color="#f59e0b" />
              <span className="card-title">Recent Critical Events Summary</span>
            </div>
          </div>
          <div className="card-body">
            <div className="events-summary-list">
              {recentEvents.map(evt => (
                <div key={evt.id} className="event-summary-item">
                  <span className="event-time">{evt.time}</span>
                  <span className={`event-badge ${evt.category?.toLowerCase() || 'info'}`}>{evt.event}</span>
                  <span className="event-details">{evt.details}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

