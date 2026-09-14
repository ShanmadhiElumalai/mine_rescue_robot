import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getMissionReplayData, playReplay, pauseReplay, setReplaySpeed } from '../services/api';

export default function MissionReplayPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(35);
  const [replayData, setReplayData] = useState({
    logs: [
      { time: "00:00:00", event: "Mission Started" },
      { time: "00:06:12", event: "Gas Warning" },
      { time: "00:09:26", event: "Human Detected" },
      { time: "00:12:34", event: "Comm. Degrading" },
      { time: "00:16:48", event: "Robot Moved" },
      { time: "00:19:42", event: "Mission End" }
    ]
  });

  const [layers, setLayers] = useState({
    robotPath: true,
    gasChanges: true,
    humanDetections: true,
    hazards: true,
    communication: true,
    robotHealth: true,
  });

  useEffect(() => {
    getMissionReplayData(1).then(res => {
      if (res && res.logs) setReplayData(res);
    });
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      await pauseReplay(1);
      setIsPlaying(false);
    } else {
      await playReplay(1);
      setIsPlaying(true);
    }
  };

  const changeSpeed = async (sp) => {
    setSpeed(sp);
    await setReplaySpeed(1, sp);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Mission Historical Telemetry Replay</h2>
          <p className="page-subtitle">Replay mission events, telemetry timeline, path history, and hazard evolution</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="card-header">
          <div className="card-title-group">
            <RotateCcw size={16} color="#2563eb" />
            <span className="card-title">Mission Replay Control Center — MISSION-001</span>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Layer Toggles Row */}
          <div style={{ display: 'flex', gap: '14px', background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', fontSize: '12px' }}>
            <span style={{ fontWeight: 700, color: '#64748b' }}>Replay Layers:</span>
            {Object.keys(layers).map(key => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={layers[key]} 
                  onChange={() => setLayers(prev => ({ ...prev, [key]: !prev[key] }))} 
                />
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px' }}>
            {/* Historical Map Viewport */}
            <div style={{ height: '340px', background: '#0f172a', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#0f172a" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.1)" />
                <polyline points="20,20 40,35 60,45 75,70" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="60" cy="45" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
              </svg>
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '12px', padding: '4px 10px', borderRadius: '4px', fontFamily: 'monospace' }}>
                REPLAY TIME: 00:12:34 / 00:19:42
              </div>
            </div>

            {/* Event Timeline Sidebar */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '340px', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Event Timeline Log</h4>
              {replayData.logs.map((log, idx) => (
                <div key={idx} style={{ padding: '8px 10px', background: '#ffffff', borderRadius: '6px', borderLeft: '3px solid #2563eb', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#0f172a' }}>{log.event}</div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace', marginTop: '2px' }}>{log.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Player Scrubber Bar */}
          <div className="replay-controls-bar" style={{ padding: '12px 18px' }}>
            <button className="replay-play-btn" onClick={togglePlay} style={{ width: '40px', height: '40px' }}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <input 
              type="range" 
              className="replay-scrubber" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={e => setProgress(e.target.value)} 
            />

            <div className="replay-speed-btns">
              {[0.5, 1, 2, 4].map(sp => (
                <button 
                  key={sp} 
                  className={`speed-btn ${speed === sp ? 'active' : ''}`}
                  onClick={() => changeSpeed(sp)}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
