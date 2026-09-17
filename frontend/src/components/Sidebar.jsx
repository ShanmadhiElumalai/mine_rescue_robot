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
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'sensor-simulation', label: 'Sensor Simulation', icon: Sliders },
    { id: 'safety-risk', label: 'Safety & Risk', icon: ShieldAlert },
    { id: 'robot-health', label: 'Robot Health', icon: HeartPulse },
    { id: 'underground-map', label: 'Underground Map', icon: Map },
    { id: 'communication', label: 'Communication', icon: Wifi },
    { id: 'mission-logs', label: 'Mission Logs', icon: FileText },
    { id: 'mission-replay', label: 'Mission Replay', icon: RotateCcw },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'camera', label: 'Camera', icon: Camera },
  ];

  return (
    <aside className="sidebar">
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
              <Icon size={18} className="nav-icon" />
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
