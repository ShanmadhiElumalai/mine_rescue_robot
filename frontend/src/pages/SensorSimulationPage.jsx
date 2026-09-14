import React, { useState, useEffect } from 'react';
import { Sliders, ShieldCheck, Flame, Droplets, Thermometer, Wind, Camera, Cpu, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { simulateManualSensors, simulateScenario } from '../services/api';

export default function SensorSimulationPage() {
  const { sensors, updateSensors, applyScenarioPreset } = useApp();
  const [localSensors, setLocalSensors] = useState(sensors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalSensors(sensors);
  }, [sensors]);

  const handleChange = (field, val) => {
    setLocalSensors(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const handleApplyValues = async () => {
    setLoading(true);
    updateSensors(localSensors);
    try {
      await simulateManualSensors(localSensors);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = async (preset) => {
    setLoading(true);
    applyScenarioPreset(preset);
    try {
      await simulateScenario(preset);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSensorStatus = (name, val) => {
    if (name === 'oxygen') {
      if (val < 18) return { text: 'Critical Deficiency', class: 'critical' };
      if (val < 19.5) return { text: 'Low Oxygen', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    if (name === 'co') {
      if (val > 100) return { text: 'Lethal Hazard', class: 'critical' };
      if (val > 50) return { text: 'Warning Level', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    if (name === 'methane') {
      if (val > 2.0) return { text: 'Explosive Danger', class: 'critical' };
      if (val > 1.0) return { text: 'Elevated Methane', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    if (name === 'h2s') {
      if (val > 10.0) return { text: 'Toxic Hazard', class: 'critical' };
      if (val > 5.0) return { text: 'Warning Level', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    if (name === 'co2') {
      if (val > 2000) return { text: 'High CO₂', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    if (name === 'temperature') {
      if (val > 50) return { text: 'Extreme Heat', class: 'critical' };
      if (val > 40) return { text: 'High Temp', class: 'warning' };
      return { text: 'Normal', class: 'normal' };
    }
    return { text: 'Normal', class: 'normal' };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Sensor Simulation Lab</h2>
          <p className="page-subtitle">Configure, test, and monitor SLYTHERINE's complete 12-sensor suite</p>
        </div>
      </div>

      <div className="full-page-grid-2col">
        {/* Left Column: Sensor Control Panel & Presets */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <Sliders size={16} color="#2563eb" />
              <span className="card-title">Gas & Environmental Sensor Controls</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="sensor-input-grid">
              <div className="sensor-field">
                <label>Oxygen (O₂)</label>
                <div className="sensor-input-group">
                  <input type="number" step="0.1" value={localSensors.oxygen} onChange={e => handleChange('oxygen', e.target.value)} />
                  <span className="sensor-unit">%</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Carbon Monoxide (CO)</label>
                <div className="sensor-input-group">
                  <input type="number" value={localSensors.co} onChange={e => handleChange('co', e.target.value)} />
                  <span className="sensor-unit">ppm</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Carbon Dioxide (CO₂)</label>
                <div className="sensor-input-group">
                  <input type="number" value={localSensors.co2} onChange={e => handleChange('co2', e.target.value)} />
                  <span className="sensor-unit">ppm</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Methane (CH₄)</label>
                <div className="sensor-input-group">
                  <input type="number" step="0.1" value={localSensors.methane} onChange={e => handleChange('methane', e.target.value)} />
                  <span className="sensor-unit">%</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Hydrogen Sulfide (H₂S)</label>
                <div className="sensor-input-group">
                  <input type="number" step="0.1" value={localSensors.h2s} onChange={e => handleChange('h2s', e.target.value)} />
                  <span className="sensor-unit">ppm</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>VOC Sensor</label>
                <div className="sensor-input-group">
                  <input type="number" value={localSensors.voc} onChange={e => handleChange('voc', e.target.value)} />
                  <span className="sensor-unit">ppm</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Temperature</label>
                <div className="sensor-input-group">
                  <input type="number" value={localSensors.temperature} onChange={e => handleChange('temperature', e.target.value)} />
                  <span className="sensor-unit">°C</span>
                </div>
              </div>

              <div className="sensor-field">
                <label>Humidity</label>
                <div className="sensor-input-group">
                  <input type="number" value={localSensors.humidity} onChange={e => handleChange('humidity', e.target.value)} />
                  <span className="sensor-unit">%</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleApplyValues} disabled={loading} style={{ padding: '10px' }}>
              {loading ? 'Applying Sensor Values...' : 'APPLY VALUES'}
            </button>

            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>Scenario Presets</div>
              <div className="preset-buttons-row">
                <button className="btn-preset safe" onClick={() => handlePreset('SAFE')}>SAFE</button>
                <button className="btn-preset warning" onClick={() => handlePreset('WARNING')}>WARNING</button>
                <button className="btn-preset danger" onClick={() => handlePreset('DANGER')}>DANGER</button>
                <button className="btn-preset critical" onClick={() => handlePreset('CRITICAL')}>CRITICAL</button>
                <button className="btn-preset recovery" onClick={() => handlePreset('RECOVERY')}>RECOVERY</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Sensor Suite Monitoring */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title-group">
              <ShieldCheck size={16} color="#10b981" />
              <span className="card-title">Live 12-Sensor Architecture Telemetry</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Camera & Motion Sensors Section */}
            <div>
              <h4 className="sensor-group-title">Camera / Mapping / Motion Modules</h4>
              <div className="sensor-readings-grid-2col">
                <div className="reading-pill">
                  <span className="reading-name"><Camera size={14} color="#2563eb" /> RGB Camera</span>
                  <span className="reading-status normal">Active Feed</span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Camera size={14} color="#ef4444" /> Thermal Camera</span>
                  <span className="reading-status normal">IR Scanning</span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Cpu size={14} color="#10b981" /> LiDAR</span>
                  <span className="reading-status normal">Map Gen Active</span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Compass size={14} color="#8b5cf6" /> IMU Sensor</span>
                  <span className="reading-status normal">3D Motion Tracking</span>
                </div>
              </div>
            </div>

            {/* Gas Sensors Section */}
            <div>
              <h4 className="sensor-group-title">Gas Sensors</h4>
              <div className="sensor-readings-grid-2col">
                <div className="reading-pill">
                  <span className="reading-name"><ShieldCheck size={14} color="#10b981" /> O₂ (Oxygen)</span>
                  <span className="reading-val">{sensors.oxygen}%</span>
                  <span className={`reading-status ${getSensorStatus('oxygen', sensors.oxygen).class}`}>
                    {getSensorStatus('oxygen', sensors.oxygen).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Wind size={14} color="#3b82f6" /> Electrochemical CO</span>
                  <span className="reading-val">{sensors.co} ppm</span>
                  <span className={`reading-status ${getSensorStatus('co', sensors.co).class}`}>
                    {getSensorStatus('co', sensors.co).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Wind size={14} color="#64748b" /> NDIR CO₂</span>
                  <span className="reading-val">{sensors.co2} ppm</span>
                  <span className={`reading-status ${getSensorStatus('co2', sensors.co2).class}`}>
                    {getSensorStatus('co2', sensors.co2).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Flame size={14} color="#f59e0b" /> Methane (CH₄)</span>
                  <span className="reading-val">{sensors.methane}%</span>
                  <span className={`reading-status ${getSensorStatus('methane', sensors.methane).class}`}>
                    {getSensorStatus('methane', sensors.methane).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Flame size={14} color="#ef4444" /> Electrochemical H₂S</span>
                  <span className="reading-val">{sensors.h2s} ppm</span>
                  <span className={`reading-status ${getSensorStatus('h2s', sensors.h2s).class}`}>
                    {getSensorStatus('h2s', sensors.h2s).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Wind size={14} color="#8b5cf6" /> VOC Sensor</span>
                  <span className="reading-val">{sensors.voc} ppm</span>
                  <span className="reading-status normal">Normal</span>
                </div>
              </div>
            </div>

            {/* Environmental Sensors Section */}
            <div>
              <h4 className="sensor-group-title">Environmental Sensors</h4>
              <div className="sensor-readings-grid-2col">
                <div className="reading-pill">
                  <span className="reading-name"><Thermometer size={14} color="#ef4444" /> Temperature</span>
                  <span className="reading-val">{sensors.temperature}°C</span>
                  <span className={`reading-status ${getSensorStatus('temperature', sensors.temperature).class}`}>
                    {getSensorStatus('temperature', sensors.temperature).text}
                  </span>
                </div>
                <div className="reading-pill">
                  <span className="reading-name"><Droplets size={14} color="#06b6d4" /> Humidity</span>
                  <span className="reading-val">{sensors.humidity}%</span>
                  <span className="reading-status normal">Normal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

