import React, { useState } from 'react';
import { Camera, Video, Square, Download, Activity, Flame, Cpu } from 'lucide-react';

export default function CameraPage() {
  const [activeTab, setActiveTab] = useState('rgb');
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Camera Monitoring</h2>
          <p className="page-subtitle">High-definition RGB, thermal infrared, and LiDAR depth streams from SLYTHERINE</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="card-header">
          <div className="card-title-group">
            <Camera size={16} color="#2563eb" />
            <span className="card-title">Live Payload Vision Console</span>
          </div>
          {/* Camera Mode Tabs */}
          <div className="camera-tabs">
            <button 
              className={`camera-tab ${activeTab === 'rgb' ? 'active' : ''}`}
              onClick={() => setActiveTab('rgb')}
            >
              <Camera size={13} style={{ display: 'inline', marginRight: '6px' }} />
              RGB Camera
            </button>
            <button 
              className={`camera-tab ${activeTab === 'thermal' ? 'active' : ''}`}
              onClick={() => setActiveTab('thermal')}
            >
              <Flame size={13} style={{ display: 'inline', marginRight: '6px' }} />
              Thermal Camera
            </button>
            <button 
              className={`camera-tab ${activeTab === 'lidar' ? 'active' : ''}`}
              onClick={() => setActiveTab('lidar')}
            >
              <Cpu size={13} style={{ display: 'inline', marginRight: '6px' }} />
              LiDAR / Depth
            </button>
          </div>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Medium/Large Controlled Viewport (Height 400px - Not Fullscreen) */}
          <div className="camera-viewport" style={{ height: '400px', width: '100%', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
            {activeTab === 'rgb' && (
              <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ background: '#0b1120' }}>
                <defs>
                  <radialGradient id="lamp" cx="50%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,248,220,0.85)" />
                    <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                  </radialGradient>
                </defs>
                <rect width="800" height="450" fill="#0b1120" />
                <path d="M 0,450 L 240,150 L 560,150 L 800,450 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <ellipse cx="400" cy="150" rx="160" ry="40" fill="url(#lamp)" />
                <circle cx="400" cy="130" r="20" fill="#fef08a" />
                
                {/* Mine tunnel support beams */}
                <path d="M 120,300 L 120,200 L 280,200 L 280,300" fill="none" stroke="#475569" strokeWidth="4" />
                <path d="M 520,300 L 520,200 L 680,200 L 680,300" fill="none" stroke="#475569" strokeWidth="4" />

                <text x="30" y="420" fill="#94a3b8" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  HD RGB LIVE VISION STREAM — SLYTHERINE HEAD PAYLOAD (1080p 60FPS)
                </text>
              </svg>
            )}

            {activeTab === 'thermal' && (
              <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ background: '#090d16' }}>
                <rect width="800" height="450" fill="#1e1b4b" />
                <circle cx="420" cy="230" r="85" fill="rgba(239, 68, 68, 0.85)" />
                <circle cx="420" cy="230" r="50" fill="rgba(250, 204, 21, 0.95)" />
                <circle cx="420" cy="230" r="22" fill="#ffffff" />
                
                {/* Crosshairs */}
                <line x1="420" y1="110" x2="420" y2="350" stroke="#f87171" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="300" y1="230" x2="540" y2="230" stroke="#f87171" strokeWidth="1" strokeDasharray="4 4" />

                <text x="30" y="420" fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  THERMAL INFRARED SCANNER — SURVIVOR HEAT SIGNATURE CONFIRMED (36.8°C)
                </text>
              </svg>
            )}

            {activeTab === 'lidar' && (
              <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ background: '#022c22' }}>
                <rect width="800" height="450" fill="#022c22" />
                {[...Array(140)].map((_, i) => (
                  <circle 
                    key={i} 
                    cx={(i * 37) % 760 + 20} 
                    cy={(i * 29) % 410 + 20} 
                    r={(i % 4) + 1.5} 
                    fill={i % 2 === 0 ? '#34d399' : '#059669'} 
                  />
                ))}
                
                {/* Distance mesh rings */}
                <circle cx="400" cy="225" r="80" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" />
                <circle cx="400" cy="225" r="160" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" />

                <text x="30" y="420" fill="#6ee7b7" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  LiDAR 3D RANGE POINT CLOUD — SCAN RADIUS: 50m | DISTANCE TO OBSTACLE: 18.5m
                </text>
              </svg>
            )}

            {isRecording && (
              <div className="camera-overlay-rec" style={{ padding: '6px 14px', fontSize: '13px', position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
                <span className="rec-dot" style={{ width: '10px', height: '10px' }}></span>
                REC 00:12:34
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="camera-controls-row">
            <button className="btn-rec-start" onClick={() => setIsRecording(true)} style={{ padding: '8px 18px', fontSize: '13px' }}>
              <Video size={16} style={{ display: 'inline', marginRight: '6px' }} /> Start Recording
            </button>
            <button className="btn-rec-stop" onClick={() => setIsRecording(false)} style={{ padding: '8px 18px', fontSize: '13px' }}>
              <Square size={16} style={{ display: 'inline', marginRight: '6px' }} /> Stop
            </button>
            <button className="btn-download-video" style={{ padding: '8px 18px', fontSize: '13px' }}>
              <Download size={16} style={{ display: 'inline', marginRight: '6px' }} /> Download Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

