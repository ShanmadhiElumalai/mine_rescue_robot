import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getMissionReplayData, playReplay, pauseReplay, setReplaySpeed } from '../services/api';

export default function MissionReplayCard() {
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
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <RotateCcw size={16} color="#2563eb" />
          <span className="card-title">9. Mission Replay</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body replay-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px' }}>
          {/* Replay Map Preview */}
          <div style={{ height: '180px', background: '#0f172a', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#0f172a" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.1)" />
              <polyline points="20,20 40,35 60,45 75,70" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="60" cy="45" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
            </svg>
            <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
              00:12:34 / 00:19:42
            </div>
          </div>

          {/* Event Timeline */}
          <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', maxHeight: '180px' }}>
            <div style={{ fontWeight: 700, color: '#64748b' }}>Event Timeline</div>
            {replayData.logs.map((log, idx) => (
              <div key={idx} style={{ padding: '4px 6px', background: '#f8fafc', borderRadius: '4px', borderLeft: '2px solid #2563eb' }}>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{log.event}</div>
                <div style={{ color: '#94a3b8', fontSize: '10px' }}>{log.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="replay-controls-bar">
          <button className="replay-play-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
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
              >
                {sp}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
