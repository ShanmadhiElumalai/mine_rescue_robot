import React from 'react';
import { 
  Home, 
  Sliders, 
  ShieldAlert, 
  HeartPulse, 
  Map, 
  Wifi, 
  FileText, 
  RotateCcw,
  Download, 
  Camera 
} from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'sensor-simulation', label: 'SENSOR SIMULATION', icon: Sliders },
    { id: 'safety-risk', label: 'SAFETY & RISK', icon: ShieldAlert },
    { id: 'robot-health', label: 'ROBOT HEALTH', icon: HeartPulse },
    { id: 'underground-map', label: 'UNDERGROUND MAP', icon: Map },
    { id: 'communication', label: 'COMMUNICATION', icon: Wifi },
    { id: 'mission-logs', label: 'MISSION LOGS', icon: FileText },
    { id: 'mission-replay', label: 'MISSION REPLAY', icon: RotateCcw },
    { id: 'reports', label: 'REPORTS', icon: Download },
    { id: 'camera', label: 'CAMERA', icon: Camera },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">S</div>
        <div>
          <div className="sidebar-title">Mine Rescue</div>
          <div className="sidebar-subtitle">SLYTHERINE System</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <p><strong>SLYTHERINE System v2.4</strong></p>
        <p>Smart Underground Rescue</p>
      </div>
    </aside>
  );
}
