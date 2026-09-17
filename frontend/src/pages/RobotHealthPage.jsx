import React, { useEffect, useState } from 'react';
import {
  Activity,
  Box,
  Layers,
  Camera,
  Settings,
  Wifi,
  Sliders,
  Radio,
  BatteryCharging,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getRobotPartsHealth } from '../services/api';

export default function RobotHealthPage() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  const [healthData, setHealthData] = useState({
    partsHealth: {
      "Head (Camera & Thermal Array)": { score: 96, status: "Healthy" },
      "Segment 1 (Drive Motors & MCU)": { score: 94, status: "Healthy" },
      "Segment 2 (Gas Sensor Payload)": { score: 92, status: "Healthy" },
      "Segment 3 (Joint Actuators)": { score: 78, status: "Warning" },
      "Tail (TTE Communication Antenna)": { score: 28, status: "Critical" },
      "Motor / Joint Actuators": { score: 89, status: "Healthy" }
    },
    overallHealth: 78,
    status: "Healthy"
  });

  useEffect(() => {
    getRobotPartsHealth().then(res => {
      if (res && res.partsHealth) {
        setHealthData(prev => ({
          ...prev,
          ...res,
          overallHealth: res.overallHealth || prev.overallHealth,
          partsHealth: { ...prev.partsHealth, ...res.partsHealth }
        }));
      }
    });
  }, []);

  // 3D Overview Callout Pins
  const calloutPins = [
    {
      id: 'head',
      label: 'Head Module',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '13%', top: '10%' },
      line: { x1: '19%', y1: '24%', x2: '23%', y2: '44%' },
      target: { x: '23%', y: '44%' }
    },
    {
      id: 'seg1',
      label: 'Segment 1',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '29%', top: '10%' },
      line: { x1: '35%', y1: '24%', x2: '37%', y2: '40%' },
      target: { x: '37%', y: '40%' }
    },
    {
      id: 'seg2',
      label: 'Segment 2',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '45%', top: '10%' },
      line: { x1: '51%', y1: '24%', x2: '50%', y2: '38%' },
      target: { x: '50%', y: '38%' }
    },
    {
      id: 'seg3',
      label: 'Segment 3',
      status: 'Warning',
      color: '#f59e0b',
      position: { left: '61%', top: '10%' },
      line: { x1: '67%', y1: '24%', x2: '65%', y2: '37%' },
      target: { x: '65%', y: '37%' }
    },
    {
      id: 'tail',
      label: 'Tail Module',
      status: 'Critical',
      color: '#ef4444',
      position: { right: '6%', top: '56%' },
      line: { x1: '86%', y1: '65%', x2: '84%', y2: '44%' },
      target: { x: '84%', y: '44%' }
    },
    {
      id: 'front-legs',
      label: 'Front Legs',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '19%', bottom: '8%' },
      line: { x1: '25%', y1: '78%', x2: '34%', y2: '59%' },
      target: { x: '34%', y: '59%' }
    },
    {
      id: 'mid-legs',
      label: 'Middle Legs',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '39%', bottom: '8%' },
      line: { x1: '45%', y1: '78%', x2: '49%', y2: '53%' },
      target: { x: '49%', y: '53%' }
    },
    {
      id: 'rear-legs',
      label: 'Rear Legs',
      status: 'Healthy',
      color: '#10b981',
      position: { left: '59%', bottom: '8%' },
      line: { x1: '65%', y1: '78%', x2: '67%', y2: '48%' },
      target: { x: '67%', y: '48%' }
    }
  ];

  // Component Status Breakdown List
  const componentsList = [
    {
      id: 'head-cam',
      name: 'Head (Camera & Thermal Array)',
      desc: 'All systems normal',
      status: 'Healthy',
      icon: Camera,
      iconColor: '#38bdf8',
      iconBg: isLight ? '#e0f2fe' : 'rgba(56, 189, 248, 0.15)'
    },
    {
      id: 'seg1-drive',
      name: 'Segment 1 (Drive Motors & MCU)',
      desc: 'No issues detected',
      status: 'Healthy',
      icon: Settings,
      iconColor: '#10b981',
      iconBg: isLight ? '#dcfce7' : 'rgba(16, 185, 129, 0.15)'
    },
    {
      id: 'seg2-gas',
      name: 'Segment 2 (Gas Sensor Payload)',
      desc: 'Sensors operational',
      status: 'Healthy',
      icon: Wifi,
      iconColor: '#06b6d4',
      iconBg: isLight ? '#cffafe' : 'rgba(6, 182, 212, 0.15)'
    },
    {
      id: 'seg3-actuators',
      name: 'Segment 3 (Joint Actuators)',
      desc: 'High temperature (42°C)',
      status: 'Warning',
      icon: Sliders,
      iconColor: '#f59e0b',
      iconBg: isLight ? '#fef3c7' : 'rgba(245, 158, 11, 0.15)'
    },
    {
      id: 'tail-antenna',
      name: 'Tail (TTE Communication Antenna)',
      desc: 'No signal / Disconnected',
      status: 'Critical',
      icon: Radio,
      iconColor: '#ef4444',
      iconBg: isLight ? '#fee2e2' : 'rgba(239, 68, 68, 0.15)'
    },
    {
      id: 'motor-joints',
      name: 'Motor / Joint Actuators',
      desc: 'All actuators functional',
      status: 'Healthy',
      icon: BatteryCharging,
      iconColor: '#38bdf8',
      iconBg: isLight ? '#e0f2fe' : 'rgba(56, 189, 248, 0.15)'
    }
  ];

  // Subsystem Tiles
  const subsystemTiles = [
    {
      id: 'power',
      name: 'Power System',
      score: '92%',
      status: 'Healthy',
      color: '#10b981',
      icon: BatteryCharging,
      iconBg: isLight ? '#dcfce7' : 'rgba(16, 185, 129, 0.15)'
    },
    {
      id: 'mobility',
      name: 'Mobility System',
      score: '88%',
      status: 'Healthy',
      color: '#10b981',
      icon: Settings,
      iconBg: isLight ? '#dcfce7' : 'rgba(16, 185, 129, 0.15)'
    },
    {
      id: 'sensor',
      name: 'Sensor System',
      score: '76%',
      status: 'Healthy',
      color: '#10b981',
      icon: Wifi,
      iconBg: isLight ? '#dcfce7' : 'rgba(16, 185, 129, 0.15)'
    },
    {
      id: 'comm',
      name: 'Communication',
      score: '65%',
      status: 'Warning',
      color: '#f59e0b',
      icon: Radio,
      iconBg: isLight ? '#fef3c7' : 'rgba(245, 158, 11, 0.15)'
    }
  ];

  const getStatusBadgeStyle = (status) => {
    if (status === 'Healthy') {
      return {
        bg: isLight ? '#ecfdf5' : 'rgba(16, 185, 129, 0.15)',
        color: '#10b981',
        border: isLight ? '#a7f3d0' : 'rgba(16, 185, 129, 0.35)'
      };
    }
    if (status === 'Warning') {
      return {
        bg: isLight ? '#fffbeb' : 'rgba(245, 158, 11, 0.15)',
        color: '#f59e0b',
        border: isLight ? '#fde68a' : 'rgba(245, 158, 11, 0.35)'
      };
    }
    return {
      bg: isLight ? '#fef2f2' : 'rgba(239, 68, 68, 0.15)',
      color: '#ef4444',
      border: isLight ? '#fecaca' : 'rgba(239, 68, 68, 0.35)'
    };
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner Card: Robot Health & Hardware Diagnostics */}
      <div
        className="dash-card"
        style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: isLight ? '#0284c7' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
            }}
          >
            <Activity size={24} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Robot Health & Hardware Diagnostics
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Component status, system health and real-time diagnostics for SLYTHERINE
            </p>
          </div>
        </div>

        {/* System Status Indicator Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 18px',
            borderRadius: '10px',
            backgroundColor: isLight ? '#f8fafc' : 'rgba(10, 17, 32, 0.6)',
            border: isLight ? '1px solid #e2e8f0' : '1px solid #17243b'
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              System Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginTop: '1px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#10b981', letterSpacing: '0.5px' }}>HEALTHY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: 3D Robot Overview (Left) + Component Breakdown (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)', gap: '16px' }}>
        {/* Left Card: Robot 3D Overview */}
        <div className="dash-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div className="card-title-group">
              <Box size={16} color="#0ea5e9" />
              <span className="card-title">Robot 3D Overview</span>
            </div>
          </div>
          <div
            className="card-body"
            style={{
              flex: 1,
              position: 'relative',
              padding: '12px',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 3D Viewport Box */}
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: '360px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#070d19',
                backgroundImage: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, rgba(7, 13, 25, 0.95) 85%)',
                border: isLight ? '1px solid #cbd5e1' : '1px solid #132038',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Robot 3D Render Image */}
              <img
                src="/slytherine_robot_3d.jpg"
                alt="SLYTHERINE 3D Modular Snake Rescue Robot Diagnostics"
                style={{
                  width: '92%',
                  height: '84%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.6))',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
                onError={(e) => {
                  e.target.src = '/slytherine_robot.jpg';
                }}
              />

              {/* Connecting Lines and Dots SVG Overlay */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              >
                {calloutPins.map(pin => (
                  <g key={`svg-${pin.id}`}>
                    <line
                      x1={pin.line.x1}
                      y1={pin.line.y1}
                      x2={pin.line.x2}
                      y2={pin.line.y2}
                      stroke={pin.color}
                      strokeWidth="0.4"
                      strokeDasharray="1.2 0.8"
                      opacity="0.85"
                    />
                    <circle cx={pin.target.x} cy={pin.target.y} r="0.9" fill={pin.color} />
                    <circle cx={pin.target.x} cy={pin.target.y} r="1.8" fill={pin.color} opacity="0.3" />
                  </g>
                ))}
              </svg>

              {/* Interactive Callout Badges */}
              {calloutPins.map(pin => {
                const isWarn = pin.status === 'Warning';
                const isCrit = pin.status === 'Critical';
                const badgeBorder = isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981';
                const badgeGlow = isCrit
                  ? 'rgba(239, 68, 68, 0.25)'
                  : isWarn
                  ? 'rgba(245, 158, 11, 0.25)'
                  : 'rgba(16, 185, 129, 0.25)';

                return (
                  <div
                    key={pin.id}
                    style={{
                      position: 'absolute',
                      ...pin.position,
                      zIndex: 3,
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(11, 20, 36, 0.92)',
                      border: `1px solid ${badgeBorder}`,
                      boxShadow: `0 4px 14px ${badgeGlow}`,
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isLight ? '#0f172a' : '#f8fafc',
                        letterSpacing: '0.2px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pin.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: pin.color,
                          boxShadow: `0 0 6px ${pin.color}`
                        }}
                      />
                      <span style={{ fontSize: '10.5px', fontWeight: 700, color: pin.color }}>
                        {pin.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Component Status Breakdown */}
        <div className="dash-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div className="card-title-group">
              <Layers size={16} color="#0ea5e9" />
              <span className="card-title">Component Status Breakdown</span>
            </div>
          </div>
          <div
            className="card-body"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'space-between',
              padding: '16px'
            }}
          >
            {componentsList.map(comp => {
              const IconComp = comp.icon;
              const badgeStyle = getStatusBadgeStyle(comp.status);

              return (
                <div
                  key={comp.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '9px',
                    backgroundColor: isLight ? '#f8fafc' : 'rgba(16, 25, 46, 0.75)',
                    border: isLight ? '1px solid #f1f5f9' : '1px solid #17243b',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: comp.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComp size={16} color={comp.iconColor} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {comp.name}
                      </div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          color: 'var(--text-muted)',
                          marginTop: '2px'
                        }}
                      >
                        {comp.desc}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '3px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.color,
                      border: `1px solid ${badgeStyle.border}`,
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {comp.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Overall Robot Health (Left) + Subsystem Tiles (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '16px' }}>
        {/* Overall Robot Health Card */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <ShieldCheck size={16} color="#10b981" />
              <span className="card-title">Overall Robot Health</span>
            </div>
          </div>
          <div
            className="card-body"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '18px 24px'
            }}
          >
            {/* Circular SVG Gauge */}
            <div style={{ width: '92px', height: '92px', position: 'relative', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '92px', height: '92px' }}>
                <path
                  className="circle-bg"
                  stroke={isLight ? '#e2e8f0' : '#152035'}
                  strokeWidth="3.4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle-fill"
                  stroke="#10b981"
                  strokeWidth="3.4"
                  strokeDasharray={`${healthData.overallHealth}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {healthData.overallHealth}%
                </div>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#10b981', marginTop: '2px', letterSpacing: '0.4px' }}>
                  HEALTHY
                </div>
              </div>
            </div>

            {/* Diagnostic readout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  System operating normally.
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                No critical faults detected.
              </p>
            </div>
          </div>
        </div>

        {/* Subsystem Tiles (4-Column Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {subsystemTiles.map(tile => {
            const TileIcon = tile.icon;
            return (
              <div
                key={tile.id}
                className="dash-card"
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: tile.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <TileIcon size={16} color={tile.color} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {tile.name}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {tile.score}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: tile.color,
                        boxShadow: `0 0 6px ${tile.color}`
                      }}
                    />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: tile.color }}>
                      {tile.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

