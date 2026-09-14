import React, { useState } from 'react';
import { Camera, Video, Square, Download } from 'lucide-react';

export default function CameraCard() {
  const [activeTab, setActiveTab] = useState('rgb');
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <Camera size={16} color="#2563eb" />
          <span className="card-title">11. Camera</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body camera-container">
        {/* Camera Feed Tabs */}
        <div className="camera-tabs">
          <button 
            className={`camera-tab ${activeTab === 'rgb' ? 'active' : ''}`}
            onClick={() => setActiveTab('rgb')}
          >
            RGB Camera
          </button>
          <button 
            className={`camera-tab ${activeTab === 'thermal' ? 'active' : ''}`}
            onClick={() => setActiveTab('thermal')}
          >
            Thermal Camera
          </button>
          <button 
            className={`camera-tab ${activeTab === 'lidar' ? 'active' : ''}`}
            onClick={() => setActiveTab('lidar')}
          >
            LiDAR / Depth
          </button>
        </div>

        {/* Viewport */}
        <div className="camera-viewport">
          {activeTab === 'rgb' && (
            <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ background: '#0f172a' }}>
              {/* Simulated Mine Shaft Feed */}
              <defs>
                <radialGradient id="lamp" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,248,220,0.8)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                </radialGradient>
              </defs>
              <rect width="400" height="250" fill="#0b1120" />
              <path d="M 0,250 L 120,80 L 280,80 L 400,250 Z" fill="#1e293b" />
              <ellipse cx="200" cy="80" rx="80" ry="20" fill="url(#lamp)" />
              <circle cx="200" cy="70" r="12" fill="#fef08a" />
              <text x="20" y="230" fill="#94a3b8" fontSize="12" fontFamily="monospace">HD RGB LIVE FEED - SLYTHERINE HEAD CAM</text>
            </svg>
          )}

          {activeTab === 'thermal' && (
            <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ background: '#090d16' }}>
              {/* Simulated Thermal InfraRed View */}
              <rect width="400" height="250" fill="#1e1b4b" />
              <circle cx="210" cy="130" r="35" fill="rgba(239, 68, 68, 0.8)" filter="blur(4px)" />
              <circle cx="210" cy="130" r="20" fill="rgba(250, 204, 21, 0.9)" />
              <circle cx="210" cy="130" r="8" fill="#ffffff" />
              <text x="20" y="230" fill="#f87171" fontSize="12" fontFamily="monospace">THERMAL INFRARED - SURVIVOR HEAT SIGNATURE (36.8°C)</text>
            </svg>
          )}

          {activeTab === 'lidar' && (
            <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ background: '#052e16' }}>
              {/* Simulated LiDAR Pointcloud Depth Map */}
              <rect width="400" height="250" fill="#022c22" />
              {[...Array(60)].map((_, i) => (
                <circle 
                  key={i} 
                  cx={(i * 17) % 380 + 10} 
                  cy={(i * 23) % 230 + 10} 
                  r={(i % 3) + 1} 
                  fill={i % 2 === 0 ? '#34d399' : '#059669'} 
                />
              ))}
              <text x="20" y="230" fill="#6ee7b7" fontSize="12" fontFamily="monospace">LiDAR 3D RANGE POINT CLOUD - DISTANCE: 18.5m</text>
            </svg>
          )}

          {isRecording && (
            <div className="camera-overlay-rec">
              <span className="rec-dot"></span>
              REC 00:12:34
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="camera-controls-row">
          <button className="btn-rec-start" onClick={() => setIsRecording(true)}>
            <Video size={14} style={{ display: 'inline', marginRight: '4px' }} /> Start Recording
          </button>
          <button className="btn-rec-stop" onClick={() => setIsRecording(false)}>
            <Square size={14} style={{ display: 'inline', marginRight: '4px' }} /> Stop
          </button>
          <button className="btn-download-video">
            <Download size={14} style={{ display: 'inline', marginRight: '4px' }} /> Download Video
          </button>
        </div>
      </div>
    </div>
  );
}
