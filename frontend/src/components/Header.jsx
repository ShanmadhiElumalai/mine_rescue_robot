import React, { useState, useEffect } from 'react';
import { Shield, Calendar, Clock, Sun, Moon, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { subscribeBackendStatus } from '../services/api';

export default function Header() {
  const { theme, toggleTheme } = useApp();
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeBackendStatus((status) => {
      setIsOnline(status);
    });
    return unsubscribe;
  }, []);

  // Format date: e.g. "Fri, 12 Sep 2025"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time: e.g. "10:24:17 AM"
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const isDarkMode = theme === 'dark';

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="header-brand-icon">
          <Shield size={20} className="brand-shield-icon" />
        </div>
        <div className="header-title-group">
          <h1 className="header-app-name">Mine Rescue Robot</h1>
          <span className="header-robot-sub">SLYTHERINE</span>
        </div>
      </div>

      <div className="header-right">
        {/* Status Indicator */}
        <div className="header-status-pill">
          <span className="online-indicator-dot"></span>
          <span className="online-indicator-text">{isOnline ? 'Online' : 'Demo Mode'}</span>
        </div>

        {/* Date */}
        <div className="header-meta-pill">
          <Calendar size={14} className="meta-icon" />
          <span>{formatDate(currentTime)}</span>
        </div>

        {/* Time */}
        <div className="header-meta-pill">
          <Clock size={14} className="meta-icon" />
          <span className="time-display">{formatTime(currentTime)}</span>
        </div>

        {/* Theme Toggle Pill Switch */}
        <button
          className={`theme-toggle-switch ${isDarkMode ? 'dark-active' : 'light-active'}`}
          onClick={toggleTheme}
          type="button"
          role="switch"
          aria-checked={isDarkMode}
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        >
          <div className="toggle-track">
            <span className="toggle-icon sun-icon">
              <Sun size={13} />
            </span>
            <div className="toggle-thumb"></div>
            <span className="toggle-icon moon-icon">
              <Moon size={13} />
            </span>
          </div>
        </button>

        {/* User Profile */}
        <button className="header-avatar-btn" title="User Profile" type="button">
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
