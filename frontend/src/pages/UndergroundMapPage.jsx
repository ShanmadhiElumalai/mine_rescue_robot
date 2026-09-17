import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  AlertTriangle, 
  Compass, 
  Box, 
  Plus, 
  Minus, 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  X,
  Radio,
  Battery
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import mineMapImg from '../assets/underground_mine_3d_map.jpg';

export default function UndergroundMapPage() {
  const { depth, sensors, commState, batteryState } = useApp();

  const [activeView, setActiveView] = useState('3D'); // '3D', 'Top', '2D'
  const [zoomLevel, setZoomLevel] = useState(1);

  // Selected item state: can be 'robot', survivor, or gas zone
  const [selectedItem, setSelectedItem] = useState({
    type: 'robot',
    id: 'slytherine',
    name: 'SLYTHERINE (Rescue Robot)',
    status: 'Active Search & Rescue',
    location: 'Sector B — Central Chamber',
    depth: depth || 245,
    heading: '042° NE',
    bodyTemp: null,
    battery: batteryState?.percentage ?? 84,
    signal: commState?.signalStrength ?? '-68 dBm',
    timeDetected: 'Live Telemetry'
  });

  // Survivors list
  const survivors = [
    {
      id: 1,
      type: 'survivor',
      name: 'Survivor Alpha',
      category: 'normal',
      temp: 36.8,
      status: 'Stable',
      location: 'Sector A — Machinery Bay',
      timeDetected: '09:24 AM',
      x: 58,
      y: 44
    },
    {
      id: 2,
      type: 'survivor',
      name: 'Survivor Beta',
      category: 'critical',
      temp: 38.5,
      status: 'Critical',
      location: 'Sector B — Lower Vault',
      timeDetected: '09:22 AM',
      x: 36,
      y: 70
    },
    {
      id: 3,
      type: 'survivor',
      name: 'Survivor Gamma',
      category: 'low-temp',
      temp: 37.2,
      status: 'Stable',
      location: 'Sector D — East Chamber',
      timeDetected: '09:18 AM',
      x: 82,
      y: 54
    }
  ];

  // Gas Hazards
  const gasZones = [
    {
      id: 'gas-1',
      type: 'gas',
      name: 'High Gas Area (CH₄)',
      gasType: 'Methane (CH₄)',
      concentration: '25%',
      status: 'High',
      location: 'Sector C — Upper Chamber',
      x: 65,
      y: 22,
      w: 80,
      h: 60,
      color: '#ef4444'
    },
    {
      id: 'gas-2',
      type: 'gas',
      name: 'Gas Leak (CO)',
      gasType: 'Carbon Monoxide (CO)',
      concentration: '10%',
      status: 'Warning',
      location: 'Sector E — Ventilation Shaft',
      x: 71,
      y: 60,
      w: 65,
      h: 50,
      color: '#10b981'
    }
  ];

  // Robot live position
  const robotPosition = {
    x: 44,
    y: 52
  };

  const handleSelectRobot = () => {
    setSelectedItem({
      type: 'robot',
      id: 'slytherine',
      name: 'SLYTHERINE (Rescue Robot)',
      status: 'Active Search & Rescue',
      location: 'Sector B — Central Chamber',
      depth: depth || 245,
      heading: '042° NE',
      bodyTemp: null,
      battery: batteryState?.percentage ?? 84,
      signal: commState?.signalStrength ?? '-68 dBm',
      timeDetected: 'Live Telemetry'
    });
  };

  const handleSelectSurvivor = (survivor) => {
    setSelectedItem({
      type: 'survivor',
      id: survivor.id,
      name: survivor.name,
      status: survivor.status,
      category: survivor.category,
      location: survivor.location,
      bodyTemp: `${survivor.temp}°C`,
      timeDetected: survivor.timeDetected
    });
  };

  const handleSelectGasZone = (gas) => {
    setSelectedItem({
      type: 'gas',
      id: gas.id,
      name: gas.name,
      gasType: gas.gasType,
      concentration: gas.concentration,
      status: gas.status,
      location: gas.location,
      timeDetected: 'Continuous Monitoring'
    });
  };

  return (
    <div className="map-module-wrapper">
      {/* Page Title & View Switcher */}
      <div className="map-module-header">
        <div className="map-title-group">
          <h2 className="map-main-title">Underground Mine — Full View</h2>
          <p className="map-sub-title">Real-time 3D map with robot location, survivor tracking, hazard zones and environmental data</p>
        </div>

        <div className="map-view-toggle-group">
          <button 
            className={`map-view-btn ${activeView === '3D' ? 'active' : ''}`}
            onClick={() => setActiveView('3D')}
          >
            3D View
          </button>
          <button 
            className={`map-view-btn ${activeView === 'Top' ? 'active' : ''}`}
            onClick={() => setActiveView('Top')}
          >
            Top View
          </button>
          <button 
            className={`map-view-btn ${activeView === '2D' ? 'active' : ''}`}
            onClick={() => setActiveView('2D')}
          >
            2D View
          </button>
        </div>
      </div>

      {/* Main Map Layout: 2 Columns */}
      <div className="map-grid-layout">
        {/* Left Column: Interactive Map Viewport */}
        <div className="map-viewport-container">
          {/* Compass Rose */}
          <div className="map-compass-rose" title="Orientation: North">
            <Compass size={18} className="compass-icon" />
            <span className="compass-n">N</span>
          </div>

          {/* Map Surface Viewport with 3D transform */}
          <div 
            className={`map-interactive-canvas view-${activeView.toLowerCase()}`}
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Background 3D Mine Render */}
            <img 
              src={mineMapImg} 
              alt="Underground Mine 3D Layout" 
              className="map-base-3d-image"
            />

            {/* SVG Interactive Overlay Layers */}
            <svg className="map-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Cave Entrance Callout */}
              <g className="map-cave-entrance" transform="translate(18, 26)">
                <circle r="2.5" fill="#64748b" opacity="0.4" />
              </g>

              {/* Gas Hazard 1: High Gas Area (CH4) */}
              <g 
                className="gas-hazard-zone high-gas" 
                transform="translate(65, 20)"
                onClick={() => handleSelectGasZone(gasZones[0])}
                style={{ cursor: 'pointer' }}
              >
                <ellipse cx="6" cy="6" rx="9" ry="5.5" fill="rgba(239, 68, 68, 0.28)" stroke="#ef4444" strokeWidth="0.6" strokeDasharray="1.5 1" />
                <path d="M 0 0 L 12 12 M 0 6 L 6 12 M 0 12 L 12 0" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="0.4" />
              </g>

              {/* Gas Hazard 2: Gas Leak (CO) */}
              <g 
                className="gas-hazard-zone leak-gas" 
                transform="translate(71, 60)"
                onClick={() => handleSelectGasZone(gasZones[1])}
                style={{ cursor: 'pointer' }}
              >
                <ellipse cx="6" cy="5" rx="8" ry="5" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1.5 1" />
              </g>

              {/* Robot Trail Breadcrumb Path */}
              <polyline 
                points="18,26 26,36 34,44 44,52" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="0.8" 
                strokeDasharray="1.2 0.8" 
                opacity="0.8"
              />

              {/* 🤖 SPECIFIED ROBOT LOCATION (SLYTHERINE) */}
              <g 
                className="map-robot-location-marker"
                transform={`translate(${robotPosition.x}, ${robotPosition.y})`}
                onClick={handleSelectRobot}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulsing radar ring 1 */}
                <circle r="5.5" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="0.5">
                  <animate attributeName="r" values="3.5;8.5;3.5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.4s" repeatCount="indefinite" />
                </circle>

                {/* Radar ring 2 */}
                <circle r="3.5" fill="rgba(14, 165, 233, 0.4)" stroke="#0ea5e9" strokeWidth="0.6" />

                {/* Robot Core Marker Icon Circle */}
                <circle r="2.2" fill="#0284c7" stroke="#ffffff" strokeWidth="0.6" />

                {/* Directional Heading Arrow */}
                <polygon points="0,-3.2 1.2,-1.6 -1.2,-1.6" fill="#38bdf8" transform="rotate(42)" />
              </g>

              {/* Survivor Markers */}
              {survivors.map(survivor => (
                <g 
                  key={survivor.id} 
                  className={`map-survivor-pin pin-${survivor.category}`}
                  transform={`translate(${survivor.x}, ${survivor.y})`}
                  onClick={() => handleSelectSurvivor(survivor)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle 
                    r="4.5" 
                    fill={survivor.category === 'critical' ? 'rgba(239, 68, 68, 0.3)' : survivor.category === 'normal' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(168, 85, 247, 0.3)'} 
                    stroke={survivor.category === 'critical' ? '#ef4444' : survivor.category === 'normal' ? '#2563eb' : '#a855f7'} 
                    strokeWidth="0.5"
                  >
                    <animate attributeName="r" values="3.5;6.5;3.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle 
                    r="2.5" 
                    fill={survivor.category === 'critical' ? '#ef4444' : survivor.category === 'normal' ? '#2563eb' : '#a855f7'} 
                    stroke="#ffffff" 
                    strokeWidth="0.6" 
                  />
                </g>
              ))}
            </svg>

            {/* HTML Floating Tags on the Map */}

            {/* 🤖 ROBOT LOCATION CALLOUT BADGE */}
            <div 
              className="map-callout-badge robot-callout"
              style={{ left: `${robotPosition.x}%`, top: `${robotPosition.y - 7}%` }}
              onClick={handleSelectRobot}
            >
              <div className="robot-badge-pulse"></div>
              <Bot size={13} className="robot-badge-icon" />
              <div className="robot-badge-text">
                <strong>SLYTHERINE (Robot)</strong>
                <span>Depth: {depth || 245}m</span>
              </div>
            </div>

            {/* Hazard 1 Tag */}
            <div 
              className="map-callout-badge gas-callout red"
              style={{ left: '65%', top: '15%' }}
              onClick={() => handleSelectGasZone(gasZones[0])}
            >
              <AlertTriangle size={12} />
              <span>High Gas Area <strong>(25% CH₄)</strong></span>
            </div>

            {/* Hazard 2 Tag */}
            <div 
              className="map-callout-badge gas-callout green"
              style={{ left: '71%', top: '54%' }}
              onClick={() => handleSelectGasZone(gasZones[1])}
            >
              <AlertTriangle size={12} />
              <span>Gas Leak <strong>(10% CO)</strong></span>
            </div>

            {/* Survivor 1 Tag */}
            <div 
              className="map-callout-badge survivor-callout blue"
              style={{ left: '58%', top: '38%' }}
              onClick={() => handleSelectSurvivor(survivors[0])}
            >
              <User size={12} />
              <span>Survivor <strong>36.8°C</strong></span>
            </div>

            {/* Survivor 2 Tag */}
            <div 
              className="map-callout-badge survivor-callout red"
              style={{ left: '36%', top: '64%' }}
              onClick={() => handleSelectSurvivor(survivors[1])}
            >
              <User size={12} />
              <span>Survivor <strong>38.5°C</strong></span>
            </div>

            {/* Survivor 3 Tag */}
            <div 
              className="map-callout-badge survivor-callout purple"
              style={{ left: '82%', top: '48%' }}
              onClick={() => handleSelectSurvivor(survivors[2])}
            >
              <User size={12} />
              <span>Survivor <strong>37.2°C</strong></span>
            </div>
          </div>

          {/* Environmental Readings Bottom Bar */}
          <div className="map-bottom-env-bar">
            <div className="env-stat-item">
              <Wind size={13} className="env-icon" />
              <span className="env-lbl">O₂</span>
              <span className="env-val">{sensors?.oxygen ?? 20.9}%</span>
              <span className="env-pill green">Normal</span>
            </div>
            <div className="env-stat-item">
              <Activity size={13} className="env-icon" />
              <span className="env-lbl">CO</span>
              <span className="env-val">{sensors?.co ? (sensors.co / 10).toFixed(1) : '2.4'}%</span>
              <span className="env-pill green">Normal</span>
            </div>
            <div className="env-stat-item">
              <Flame size={13} className="env-icon amber" />
              <span className="env-lbl">CH₄</span>
              <span className="env-val">{sensors?.methane ? (sensors.methane * 10).toFixed(1) : '10.2'}%</span>
              <span className="env-pill amber">High</span>
            </div>
            <div className="env-stat-item">
              <Thermometer size={13} className="env-icon" />
              <span className="env-lbl">Temperature</span>
              <span className="env-val">{sensors?.temperature ?? 26.2}°C</span>
            </div>
            <div className="env-stat-item">
              <Droplets size={13} className="env-icon" />
              <span className="env-lbl">Humidity</span>
              <span className="env-val">{sensors?.humidity ?? 68}%</span>
            </div>
          </div>

          {/* Map Scale & Zoom Controls */}
          <div className="map-bottom-controls">
            <div className="map-scale-ruler">
              <span>0m</span>
              <div className="ruler-line"></div>
              <span>10m</span>
              <div className="ruler-line"></div>
              <span>20m</span>
              <div className="ruler-line"></div>
              <span>30m</span>
            </div>

            <div className="map-zoom-buttons">
              <button 
                className="zoom-btn" 
                onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
                title="Zoom In"
              >
                <Plus size={14} />
              </button>
              <button 
                className="zoom-btn" 
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
                title="Zoom Out"
              >
                <Minus size={14} />
              </button>
              <button 
                className="zoom-btn reset" 
                onClick={() => setZoomLevel(1)}
                title="Reset View"
              >
                <Box size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Map Legend & Selected Location Details */}
        <div className="map-side-column">
          {/* Map Legend Card */}
          <div className="map-side-card legend-card">
            <div className="side-card-title">Map Legend</div>
            <div className="legend-items-list">
              {/* 🤖 SPECIFIED ROBOT IN LEGEND */}
              <div 
                className="legend-row highlight-robot"
                onClick={handleSelectRobot}
                title="Click to view Rescue Robot location details"
              >
                <span className="legend-icon-badge robot-badge">
                  <Bot size={12} />
                </span>
                <span className="legend-label"><strong>Rescue Robot (SLYTHERINE)</strong></span>
                <span className="legend-pulse-dot"></span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-badge blue">
                  <User size={12} />
                </span>
                <span className="legend-label">Survivor (Normal)</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-badge red">
                  <User size={12} />
                </span>
                <span className="legend-label">Survivor (Critical)</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-badge purple">
                  <User size={12} />
                </span>
                <span className="legend-label">Survivor (Low Temp)</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape hazard-hatch"></span>
                <span className="legend-label">Hazard Zone</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape high-gas-color"></span>
                <span className="legend-label">High Gas Area (CH₄)</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape co-gas-color"></span>
                <span className="legend-label">CO Gas Area</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape blocked-path-color"></span>
                <span className="legend-label">Blocked Path</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape mine-struct-color"></span>
                <span className="legend-label">Mine Structure</span>
              </div>

              <div className="legend-row">
                <span className="legend-icon-shape tunnel-cave-color"></span>
                <span className="legend-label">Tunnel / Cave</span>
              </div>
            </div>
          </div>

          {/* Selected Location Card */}
          <div className="map-side-card selected-location-card">
            <div className="side-card-header">
              <div className="side-card-title">Selected Location</div>
              {selectedItem && (
                <span className={`selected-type-pill ${selectedItem.type}`}>
                  {selectedItem.type.toUpperCase()}
                </span>
              )}
            </div>

            {selectedItem?.type === 'robot' && (
              <div className="selected-details-content robot-details">
                <div className="selected-entity-heading">
                  <div className="entity-icon-wrap robot">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="entity-name">{selectedItem.name}</h3>
                    <span className="entity-status active">{selectedItem.status}</span>
                  </div>
                </div>

                <div className="entity-specs-grid">
                  <div className="spec-row">
                    <span className="spec-label">Location:</span>
                    <span className="spec-value">{selectedItem.location}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Shaft Depth:</span>
                    <span className="spec-value highlighted-blue">{selectedItem.depth} m</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Heading:</span>
                    <span className="spec-value">{selectedItem.heading}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Battery:</span>
                    <span className="spec-value highlighted-green">{selectedItem.battery}% (~ 2h 36m)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Telemetry Link:</span>
                    <span className="spec-value">{selectedItem.signal}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Locomotion:</span>
                    <span className="spec-value">Articulated Crawl</span>
                  </div>
                </div>

                <div className="robot-location-banner">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Robot is currently mapping Sector B. Path clear.</span>
                </div>
              </div>
            )}

            {selectedItem?.type === 'survivor' && (
              <div className="selected-details-content survivor-details">
                <div className="selected-entity-heading">
                  <div className={`entity-icon-wrap ${selectedItem.category || 'normal'}`}>
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="entity-name">{selectedItem.name}</h3>
                    <span className={`entity-status ${selectedItem.status.toLowerCase()}`}>
                      Status: <strong>{selectedItem.status}</strong>
                    </span>
                  </div>
                </div>

                <div className="entity-specs-grid">
                  <div className="spec-row">
                    <span className="spec-label">Body Temperature:</span>
                    <span className="spec-value highlighted-temp">{selectedItem.bodyTemp}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Location:</span>
                    <span className="spec-value">{selectedItem.location}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Time Detected:</span>
                    <span className="spec-value">{selectedItem.timeDetected}</span>
                  </div>
                </div>

                <button className="btn-approach-survivor" onClick={handleSelectRobot}>
                  DISPATCH ROBOT TO THIS SURVIVOR
                </button>
              </div>
            )}

            {selectedItem?.type === 'gas' && (
              <div className="selected-details-content gas-details">
                <div className="selected-entity-heading">
                  <div className="entity-icon-wrap gas">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h3 className="entity-name">{selectedItem.name}</h3>
                    <span className="entity-status warning">Hazard Level: {selectedItem.status}</span>
                  </div>
                </div>

                <div className="entity-specs-grid">
                  <div className="spec-row">
                    <span className="spec-label">Gas Type:</span>
                    <span className="spec-value">{selectedItem.gasType}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Concentration:</span>
                    <span className="spec-value highlighted-gas">{selectedItem.concentration}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Location:</span>
                    <span className="spec-value">{selectedItem.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
