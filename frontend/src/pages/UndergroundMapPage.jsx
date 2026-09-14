import React, { useState } from 'react';
import { Map, UserCheck, Cpu, Compass, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UndergroundMapPage() {
  const { humanDetections, selectedHuman, setSelectedHuman, safetyEngine } = useApp();

  const [layers, setLayers] = useState({
    robotLocation: true,
    robotPath: true,
    exploredArea: true,
    unexploredArea: true,
    searchZones: true,
    gasHazards: true,
    humanDetection: true,
  });

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeGasColor = safetyEngine.overallSafetyStatus === 'CRITICAL' ? 'rgba(239, 68, 68, 0.5)' :
                         safetyEngine.overallSafetyStatus === 'HIGH' ? 'rgba(249, 115, 22, 0.5)' :
                         safetyEngine.overallSafetyStatus === 'WARNING' ? 'rgba(245, 158, 11, 0.4)' :
                         'rgba(16, 185, 129, 0.3)';

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Underground Map & Tactical Search Zones</h2>
          <p className="page-subtitle">Real-time LiDAR 3D terrain mapping and IMU orientation telemetry for SLYTHERINE</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="card-header">
          <div className="card-title-group">
            <Map size={16} color="#2563eb" />
            <span className="card-title">Underground Mine Shaft 3D Tactical Map</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span className="map-sensor-tag">
              <Cpu size={12} style={{ display: 'inline', marginRight: '4px' }} />
              LiDAR → Map Generation
            </span>
            <span className="map-sensor-tag">
              <Compass size={12} style={{ display: 'inline', marginRight: '4px' }} />
              IMU → 3D Movement & Orientation
            </span>
          </div>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px' }}>
            {/* Main Controlled Canvas Container */}
            <div className="map-container" style={{ height: '420px', position: 'relative' }}>
              {/* Map Layers Controls Checklist */}
              <div className="map-layers-panel">
                <div className="map-layers-title">Map Layers</div>
                {Object.keys(layers).map(key => (
                  <label key={key} className="layer-checkbox">
                    <input 
                      type="checkbox" 
                      checked={layers[key]} 
                      onChange={() => toggleLayer(key)} 
                    />
                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  </label>
                ))}
              </div>

              {/* Map Legend Overlay */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
                <span style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>Map Legend</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }}></span> Safe Gas Area</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }}></span> Warning Gas Area</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#f97316', borderRadius: '2px' }}></span> High Gas Area</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }}></span> Critical Gas Area</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#2563eb', borderRadius: '50%' }}></span> Robot Marker</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '1px solid white' }}></span> Human Survivor</div>
              </div>

              {/* SVG Map Canvas */}
              <svg className="map-canvas" viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#0f172a" />
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Unexplored Area */}
                {layers.unexploredArea && (
                  <rect x="0" y="55" width="100" height="45" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(255,255,255,0.1)" strokeDasharray="1 1" />
                )}

                {/* Explored Area */}
                {layers.exploredArea && (
                  <polygon points="10,10 85,10 92,55 25,55 10,10" fill="rgba(14, 165, 233, 0.15)" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="0.5" />
                )}

                {/* Search Zones */}
                {layers.searchZones && (
                  <>
                    <circle cx="30" cy="30" r="15" fill="rgba(59, 130, 246, 0.12)" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="1.5 1" />
                    <circle cx="65" cy="45" r="18" fill="rgba(59, 130, 246, 0.12)" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="1.5 1" />
                  </>
                )}

                {/* Gas Hazards */}
                {layers.gasHazards && (
                  <>
                    <circle cx="45" cy="32" r="12" fill={activeGasColor} stroke={safetyEngine.overallSafetyStatus === 'CRITICAL' ? '#ef4444' : '#f59e0b'} strokeWidth="0.8" />
                    <circle cx="75" cy="58" r="9" fill="rgba(239, 68, 68, 0.45)" stroke="#ef4444" strokeWidth="0.8" />
                  </>
                )}

                {/* Robot Path */}
                {layers.robotPath && (
                  <polyline points="15,15 25,30 45,40 62,48" fill="none" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 1" />
                )}

                {/* Robot Location */}
                {layers.robotLocation && (
                  <g transform="translate(62, 48)">
                    <circle r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.2" />
                    <circle r="7" fill="none" stroke="#60a5fa" strokeWidth="0.8">
                      <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}

                {/* Human Detection Markers */}
                {layers.humanDetection && humanDetections.map(human => (
                  <g 
                    key={human.id} 
                    transform={`translate(${human.x}, ${human.y})`}
                    onClick={() => setSelectedHuman(human)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    {human.severity === 'CRITICAL' && (
                      <circle r="7" fill="none" stroke="#ef4444" strokeWidth="0.8">
                        <animate attributeName="r" values="4;10;4" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text x="6" y="3" fill="#ffffff" fontSize="4" fontWeight="bold">{human.name}</text>
                  </g>
                ))}
              </svg>

              <div style={{ position: 'absolute', bottom: '12px', left: '14px', color: '#94a3b8', fontSize: '12px', fontWeight: 600, background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px' }}>
                Robot Location Depth: <strong>245 m</strong> | Coordinates: 12.9716° N, 77.5946° E
              </div>
            </div>

            {/* Selected Location Details Side Panel */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={18} color="#ef4444" />
                SELECTED LOCATION
              </div>

              {selectedHuman ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
                  <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '14px' }}>{selectedHuman.name}</div>
                  <div>Body Temperature: <strong style={{ color: '#0f172a' }}>{selectedHuman.bodyTemp}°C</strong></div>
                  <div>Environment Temp: <strong style={{ color: '#0f172a' }}>{selectedHuman.envTemp}°C</strong></div>
                  <div>Distance: <strong style={{ color: '#0f172a' }}>{selectedHuman.distance} m</strong></div>
                  <div>Confidence: <strong style={{ color: '#10b981' }}>{selectedHuman.confidence}%</strong></div>
                  <div>Severity: <strong style={{ color: selectedHuman.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b' }}>{selectedHuman.severity}</strong></div>
                  <div>Confirmation: <strong style={{ color: '#0f172a' }}>{selectedHuman.confirmationStatus}</strong></div>
                  <div>Sensor Count: <strong style={{ color: '#0f172a' }}>{selectedHuman.sensorCount}</strong></div>
                  <div>Detection Time: <strong style={{ color: '#64748b' }}>{selectedHuman.detectionTime}</strong></div>
                  <div>Latitude: <strong style={{ color: '#475569' }}>{selectedHuman.lat}</strong></div>
                  <div>Longitude: <strong style={{ color: '#475569' }}>{selectedHuman.lng}</strong></div>

                  <button className="btn-primary" style={{ marginTop: '8px', padding: '10px', width: '100%', fontSize: '13px' }}>
                    APPROACH SURVIVOR
                  </button>
                </div>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Select a human marker on the map to inspect telemetry details.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

