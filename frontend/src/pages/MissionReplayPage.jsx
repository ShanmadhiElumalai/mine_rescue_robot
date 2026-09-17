import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  VideoOff, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  MoreVertical, 
  Check 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MissionReplayPage() {
  const { setActiveNav } = useApp();

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // 00:00 default
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [status, setStatus] = useState('Online');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const cardRef = useRef(null);

  // Overlay Checkboxes matching the mockup default state:
  // Paths (checked), All Sensors (checked), Human Detections (unchecked), Animal Detections (unchecked), Device Actions (unchecked)
  const [overlays, setOverlays] = useState({
    paths: true,
    allSensors: true,
    humanDetections: false,
    animalDetections: false,
    deviceActions: false,
  });

  const toggleOverlay = (key) => {
    setOverlays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (cardRef.current?.requestFullscreen) {
        cardRef.current.requestFullscreen();
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

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Close popup menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.replay-status-dropdown-wrap')) {
        setShowStatusMenu(false);
      }
      if (!e.target.closest('.replay-more-dropdown-wrap')) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="replay-page-wrapper">
      {/* 1. Main Mission Replay Video Card */}
      <div className="replay-main-card" ref={cardRef}>
        {/* Header Section */}
        <div className="replay-card-header">
          <div className="replay-header-left">
            <button 
              className="replay-back-btn" 
              onClick={() => setActiveNav && setActiveNav('home')}
              title="Go back"
              aria-label="Back"
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>
            <div className="replay-title-group">
              <h2 className="replay-main-title">9. Mission Replay</h2>
              <p className="replay-sub-title">Review and analyze the recorded mission footage.</p>
            </div>
          </div>

          {/* Online Status Dropdown */}
          <div className="replay-status-dropdown-wrap">
            <button 
              className="replay-status-badge"
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusMenu(prev => !prev);
              }}
              title="Mission connection status"
            >
              <span className="status-dot-green"></span>
              <span className="status-text">{status}</span>
              <ChevronDown size={14} className="status-chevron" />
            </button>

            {showStatusMenu && (
              <div className="replay-dropdown-menu">
                <div 
                  className={`replay-dropdown-item ${status === 'Online' ? 'active' : ''}`}
                  onClick={() => { setStatus('Online'); setShowStatusMenu(false); }}
                >
                  <span className="status-dot-green mini"></span>
                  Online (Telemetry Active)
                </div>
                <div 
                  className={`replay-dropdown-item ${status === 'Replay Mode' ? 'active' : ''}`}
                  onClick={() => { setStatus('Replay Mode'); setShowStatusMenu(false); }}
                >
                  <span className="status-dot-blue mini"></span>
                  Replay Mode (Archived)
                </div>
                <div 
                  className={`replay-dropdown-item ${status === 'Offline Sync' ? 'active' : ''}`}
                  onClick={() => { setStatus('Offline Sync'); setShowStatusMenu(false); }}
                >
                  <span className="status-dot-gray mini"></span>
                  Offline Sync
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Viewport Area (Empty State) */}
        <div className="replay-video-viewport">
          <div className="replay-empty-state">
            <div className="replay-empty-icon-wrap">
              <VideoOff size={48} strokeWidth={1.4} className="replay-video-off-icon" />
            </div>
            <h3 className="replay-empty-title">No video available for this mission.</h3>
            <p className="replay-empty-desc">
              Video footage will be available once a mission is completed<br />and recordings are uploaded.
            </p>
          </div>
        </div>

        {/* Video Controls Bar */}
        <div className="replay-controls-bar">
          <div className="replay-controls-left">
            <button 
              className="replay-play-btn" 
              onClick={togglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" style={{ marginLeft: '1px' }} />
              )}
            </button>
            <span className="replay-time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Scrubber timeline */}
          <div className="replay-scrubber-track">
            <input 
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="replay-scrubber-input"
              aria-label="Video timeline scrubber"
            />
          </div>

          {/* Right controls */}
          <div className="replay-controls-right">
            <button 
              className="replay-icon-btn" 
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button 
              className="replay-icon-btn" 
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>

            <div className="replay-more-dropdown-wrap">
              <button 
                className="replay-icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreMenu(prev => !prev);
                }}
                title="More options"
                aria-label="More options"
              >
                <MoreVertical size={18} />
              </button>

              {showMoreMenu && (
                <div className="replay-dropdown-menu replay-more-menu">
                  <div className="menu-group-label">Playback Speed</div>
                  {[0.5, 1, 1.5, 2].map((spd) => (
                    <div 
                      key={spd}
                      className={`replay-dropdown-item ${playbackSpeed === spd ? 'active' : ''}`}
                      onClick={() => { setPlaybackSpeed(spd); setShowMoreMenu(false); }}
                    >
                      {spd}x {spd === 1 && '(Normal)'}
                    </div>
                  ))}
                  <div className="menu-divider"></div>
                  <div className="replay-dropdown-item" onClick={() => setShowMoreMenu(false)}>
                    Quality: 1080p HD
                  </div>
                  <div className="replay-dropdown-item" onClick={() => setShowMoreMenu(false)}>
                    Download Telemetry Log
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Show Overlays Card */}
      <div className="replay-overlays-card">
        <h4 className="replay-overlays-title">Show Overlays</h4>
        
        <div className="replay-overlays-list">
          {/* 1. Paths */}
          <label 
            className="replay-checkbox-row" 
            onClick={() => toggleOverlay('paths')}
          >
            <div className={`replay-checkbox-box ${overlays.paths ? 'checked' : ''}`}>
              {overlays.paths && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
            <span className="replay-checkbox-label">Paths</span>
          </label>

          {/* 2. All Sensors */}
          <label 
            className="replay-checkbox-row" 
            onClick={() => toggleOverlay('allSensors')}
          >
            <div className={`replay-checkbox-box ${overlays.allSensors ? 'checked' : ''}`}>
              {overlays.allSensors && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
            <span className="replay-checkbox-label">All Sensors</span>
          </label>

          {/* 3. Human Detections */}
          <label 
            className="replay-checkbox-row" 
            onClick={() => toggleOverlay('humanDetections')}
          >
            <div className={`replay-checkbox-box ${overlays.humanDetections ? 'checked' : ''}`}>
              {overlays.humanDetections && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
            <span className="replay-checkbox-label">Human Detections</span>
          </label>

          {/* 4. Animal Detections */}
          <label 
            className="replay-checkbox-row" 
            onClick={() => toggleOverlay('animalDetections')}
          >
            <div className={`replay-checkbox-box ${overlays.animalDetections ? 'checked' : ''}`}>
              {overlays.animalDetections && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
            <span className="replay-checkbox-label">Animal Detections</span>
          </label>

          {/* 5. Device Actions */}
          <label 
            className="replay-checkbox-row" 
            onClick={() => toggleOverlay('deviceActions')}
          >
            <div className={`replay-checkbox-box ${overlays.deviceActions ? 'checked' : ''}`}>
              {overlays.deviceActions && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
            <span className="replay-checkbox-label">Device Actions</span>
          </label>
        </div>
      </div>
    </div>
  );
}
