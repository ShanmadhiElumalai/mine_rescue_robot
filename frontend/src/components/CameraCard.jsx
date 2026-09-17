import React, { useState } from 'react';
import { Camera, Video, Square, Download, Flame, Box } from 'lucide-react';
import cameraFeedImg from '../assets/mine_tunnel_camera_feed_hd.jpg';

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
        <div className="camera-viewport" style={{ position: 'relative', overflow: 'hidden', height: '220px', borderRadius: '8px' }}>
          <img 
            src={cameraFeedImg} 
            alt="Mine Tunnel Camera Feed" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className={`camera-feed-img ${activeTab}`}
          />

          {isRecording && (
            <div className="camera-overlay-rec">
              <span className="rec-dot"></span>
              REC 00:12:34
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: '#ffffff', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            SLYTHERINE CAM-01
          </div>
          <div style={{ position: 'absolute', bottom: '8px', right: '10px', color: '#ffffff', fontSize: '10px', fontWeight: 600, fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            2026-09-17 12:34:56
          </div>
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
