import React, { useState, useEffect } from 'react';
import { Map, UserCheck, AlertOctagon, Compass, Cpu } from 'lucide-react';
import { getHumanDetections, getGasHazardMap } from '../services/api';

export default function UndergroundMapCard() {
  const [layers, setLayers] = useState({
    robotLocation: true,
    robotPath: true,
    exploredArea: true,
    unexploredArea: true,
    searchZones: true,
    gasHazards: true,
    humanDetection: true,
  });

  const [humanDetections, setHumanDetections] = useState([]);
  const [gasHazards, setGasHazards] = useState([]);
  const [selectedHuman, setSelectedHuman] = useState({
    id: 1,
    name: "Survivor Alpha",
    bodyTemp: 36.8,
    envTemp: 28.5,
    distance: 18.5,
    confidence: 96.5,
    severity: "Moderate",
    confirmationStatus: "CONFIRMED",
    sensorCount: 4,
    detectionTime: "10:27:14",
    x: 62,
    y: 48
  });

  useEffect(() => {
    getHumanDetections().then(res => {
      if (res && Array.isArray(res) && res.length > 0) {
        setHumanDetections(res);
        setSelectedHuman(res[0]);
      }
    });
    getGasHazardMap().then(res => {
      if (res && Array.isArray(res)) {
        setGasHazards(res);
      }
    });
  }, []);

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <Map size={16} color="#2563eb" />
          <span className="card-title">5. Underground Map</span>
        </div>
        <div style={{ fontSize: '11px', color: '#64748b' }}>
          Mission: <strong>MISSION-001</strong>
        </div>
      </div>

      <div className="card-body map-card-body">
        {/* Map Canvas Box */}
        <div className="map-container">
          {/* Top Sensor Integration Badges */}
          <div className="map-sensor-badges">
            <span className="map-sensor-tag">
              <Cpu size={10} style={{ display: 'inline', marginRight: '4px' }} />
              LiDAR → Map Generation
            </span>
            <span className="map-sensor-tag">
              <Compass size={10} style={{ display: 'inline', marginRight: '4px' }} />
              IMU → 3D Movement & Orientation
            </span>
          </div>

          {/* Map Layer Controls Checklist */}
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

          {/* Simulated Underground SVG Map Render */}
          <svg className="map-canvas" viewBox="0 0 100 100">
            {/* Grid & Underground Mine Tunnels */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#0f172a" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Unexplored Area Layer */}
            {layers.unexploredArea && (
              <rect x="0" y="50" width="100" height="50" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255,255,255,0.1)" strokeDasharray="1 1" />
            )}

            {/* Explored Area Layer */}
            {layers.exploredArea && (
              <polygon points="10,10 80,10 90,50 30,60 10,10" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.5" />
            )}

            {/* Search Zones Layer */}
            {layers.searchZones && (
              <>
                <circle cx="30" cy="30" r="15" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1 1" />
                <circle cx="65" cy="45" r="18" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1 1" />
              </>
            )}

            {/* Gas Hazard Zones */}
            {layers.gasHazards && (
              <>
                <circle cx="45" cy="35" r="12" fill="rgba(245, 158, 11, 0.35)" stroke="#f59e0b" strokeWidth="0.8" />
                <circle cx="75" cy="60" r="9" fill="rgba(239, 68, 68, 0.45)" stroke="#ef4444" strokeWidth="0.8" />
              </>
            )}

            {/* Robot Path */}
            {layers.robotPath && (
              <polyline points="15,15 25,30 45,40 62,48" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="2 1" />
            )}

            {/* Robot Location Marker */}
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
                <text x="6" y="3" fill="#ffffff" fontSize="4" fontWeight="bold">{human.name}</text>
              </g>
            ))}
          </svg>

          <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>
            Depth: 126 m
          </div>
        </div>

        {/* Selected Human Detection Popup Card (INSIDE Map Component) */}
        {selectedHuman && (
          <div className="map-selected-popup">
            <div className="popup-info-column">
              <div className="popup-title">
                <UserCheck size={16} />
                Human Detected: {selectedHuman.name}
              </div>
              <div className="popup-stats">
                <span>Body Temp: <strong>{selectedHuman.bodyTemp}°C</strong></span>
                <span>Env Temp: <strong>{selectedHuman.envTemp}°C</strong></span>
                <span>Distance: <strong>{selectedHuman.distance} m</strong></span>
              </div>
              <div className="popup-stats" style={{ marginTop: '2px', color: '#64748b' }}>
                <span>Confidence: <strong>{selectedHuman.confidence}%</strong></span>
                <span>Status: <strong>{selectedHuman.confirmationStatus}</strong></span>
                <span>Sensors: <strong>{selectedHuman.sensorCount}</strong></span>
                <span>Time: <strong>{selectedHuman.detectionTime}</strong></span>
              </div>
            </div>

            <button className="btn-action-approach">
              APPROACH
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
