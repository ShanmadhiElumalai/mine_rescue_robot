import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, Square, Download, Flame, Box, Maximize2, Minimize2 } from 'lucide-react';
import cameraFeedImg from '../assets/mine_tunnel_camera_feed_hd.jpg';

export default function CameraPage() {
  const [activeTab, setActiveTab] = useState('rgb');
  const [isRecording, setIsRecording] = useState(true);
  const [recordTime, setRecordTime] = useState(754); // 00:12:34
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewportRef = useRef(null);

  // Recording timer
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatRecTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (viewportRef.current?.requestFullscreen) {
        viewportRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cameraFeedImg;
    link.download = 'SLYTHERINE_CAM01_capture.jpg';
    link.click();
  };

  return (
    <div className="camera-page-wrapper">
      <p className="camera-page-subtext">
        High-definition RGB, thermal infrared, and LiDAR depth streams from SLYTHERINE
      </p>

      <div className="dash-card camera-console-card">
        <div className="card-header camera-card-header">
          <div className="card-title-group">
            <Camera size={18} color="#2563eb" />
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
              <Box size={13} style={{ display: 'inline', marginRight: '6px' }} />
              LiDAR / Depth
            </button>
          </div>
        </div>

        <div className="card-body camera-card-body">
          {/* Camera Viewport with 16:9 Aspect Ratio matching image */}
          <div className="camera-viewport-container" ref={viewportRef}>
            {/* Base Mine Tunnel Feed */}
            <img 
              src={cameraFeedImg} 
              alt="Live Mine Tunnel Camera Feed" 
              className={`camera-feed-img ${activeTab}`}
            />

            {/* Thermal Filter Overlay */}
            {activeTab === 'thermal' && (
              <div className="camera-thermal-overlay">
                <div className="thermal-crosshair-center"></div>
                <div className="thermal-heat-glow"></div>
                <div className="thermal-hud-text">
                  SURVIVOR HEAT SIGNATURE CONFIRMED (36.8°C)
                </div>
              </div>
            )}

            {/* LiDAR Pointcloud Overlay */}
            {activeTab === 'lidar' && (
              <div className="camera-lidar-overlay">
                <svg className="lidar-svg-mesh" viewBox="0 0 800 450" preserveAspectRatio="none">
                  {[...Array(90)].map((_, i) => (
                    <circle 
                      key={i} 
                      cx={(i * 43) % 760 + 20} 
                      cy={(i * 37) % 410 + 20} 
                      r={(i % 3) + 1.8} 
                      fill={i % 2 === 0 ? '#10b981' : '#34d399'} 
                      opacity={0.85}
                    />
                  ))}
                  <circle cx="400" cy="225" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="400" cy="225" r="180" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
                <div className="lidar-hud-text">
                  LiDAR 3D RANGE POINT CLOUD — SCAN RADIUS: 50m | OBSTACLE: 18.5m
                </div>
              </div>
            )}

            {/* Interactive Fullscreen trigger over top-right icon */}
            <button 
              className="camera-overlay-fullscreen-hitbox" 
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle Fullscreen"
            />
          </div>

          {/* Controls Bar */}
          <div className="camera-controls-row">
            <button 
              className={`btn-rec-start ${isRecording ? 'active' : ''}`} 
              onClick={() => setIsRecording(true)}
            >
              <Video size={16} />
              <span>Start Recording</span>
            </button>
            <button 
              className={`btn-rec-stop ${!isRecording ? 'active' : ''}`} 
              onClick={() => setIsRecording(false)}
            >
              <Square size={14} fill="currentColor" />
              <span>Stop</span>
            </button>
            <button 
              className="btn-download-video" 
              onClick={handleDownload}
            >
              <Download size={15} />
              <span>Download Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
