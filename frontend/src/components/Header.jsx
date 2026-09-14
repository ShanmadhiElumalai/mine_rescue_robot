import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { subscribeBackendStatus } from '../services/api';

export default function Header() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeBackendStatus((status) => {
      setIsOnline(status);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="header-app-name">Mine Rescue Robot</h1>
        <span className="header-tagline">Smart Search • Safer Tomorrow</span>
      </div>
      <div className="header-right">
        <div className={`status-badge ${isOnline ? 'online' : 'demo-mode'}`}>
          <span className="status-dot"></span>
          {isOnline ? 'ONLINE' : 'DEMO MODE'}
        </div>
        <div className="header-info-pill">
          Mission: <span>MISSION-001</span>
        </div>
        <div className="header-info-pill">
          Robot: <span>SLYTHERINE</span>
        </div>
        <div className="header-info-pill" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Activity size={13} color="#2563eb" />
          <span>10:32 AM</span>
        </div>
      </div>
    </header>
  );
}
