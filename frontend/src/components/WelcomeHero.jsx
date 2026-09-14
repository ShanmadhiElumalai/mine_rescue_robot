import React from 'react';
import { ShieldCheck, Compass, Wifi, BatteryCharging } from 'lucide-react';

export default function WelcomeHero() {
  return (
    <div className="dash-card col-12">
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-title">1. Home / Dashboard (simplified)</span>
        </div>
      </div>
      <div className="card-body hero-card-content">
        <div className="hero-banner">
          <div className="hero-text-side">
            <h2 className="hero-heading">Welcome to Mine Rescue Robot</h2>
            <p className="hero-subtitle">Monitoring. Detecting. Saving Lives.</p>
          </div>
          <div className="hero-robot-img-wrapper">
            <img 
              src="/slytherine_robot.jpg" 
              alt="SLYTHERINE Rescue Robot" 
              className="hero-robot-img"
              onError={(e) => {
                e.target.src = "/slytherine_robot_gen.png";
              }}
            />
          </div>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat-box">
            <div className="stat-icon-wrapper green">
              <ShieldCheck size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Safety Status</span>
              <span className="stat-value" style={{ color: '#10b981' }}>SAFE</span>
              <span className="stat-desc">No critical hazards</span>
            </div>
          </div>

          <div className="hero-stat-box">
            <div className="stat-icon-wrapper blue">
              <Compass size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Safe Entry</span>
              <span className="stat-value">92%</span>
              <span className="stat-desc">Safe for operation</span>
            </div>
          </div>

          <div className="hero-stat-box">
            <div className="stat-icon-wrapper purple">
              <Wifi size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Communication</span>
              <span className="stat-value">95%</span>
              <span className="stat-desc">Good signal</span>
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
      </div>
    </div>
  );
}
