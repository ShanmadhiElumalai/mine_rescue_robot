import React, { useState } from 'react';
import { Sliders, ShieldCheck, Flame, Droplets, Thermometer, Wind } from 'lucide-react';
import { simulateManualSensors, simulateScenario } from '../services/api';

export default function SensorSimulationCard({ onUpdateSensors }) {
  const [sensors, setSensors] = useState({
    oxygen: 20.5,
    co: 18,
    co2: 820,
    methane: 0.4,
    h2s: 2.1,
    voc: 12,
    temperature: 31,
    humidity: 58,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, val) => {
    setSensors(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const handleApplyValues = async () => {
    setLoading(true);
    try {
      const res = await simulateManualSensors(sensors);
      if (res && res.sensors) {
        setSensors(res.sensors);
        if (onUpdateSensors) onUpdateSensors(res);
      }
    } catch (err) {
      console.error("Failed to apply manual sensors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = async (preset) => {
    setLoading(true);
    try {
      const res = await simulateScenario(preset);
      if (res && res.sensors) {
        setSensors(prev => ({ ...prev, ...res.sensors }));
        if (onUpdateSensors) onUpdateSensors(res);
      }
    } catch (err) {
      console.error("Failed preset:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-card col-4">
      <div className="card-header">
        <div className="card-title-group">
          <Sliders size={16} color="#2563eb" />
          <span className="card-title">2. Sensor Simulation Lab</span>
        </div>
        <span className="status-badge online" style={{ fontSize: '11px' }}>● Online</span>
      </div>
      <div className="card-body">
        <div className="sensor-sim-layout">
          {/* Inputs Column */}
          <div className="sensor-inputs-column">
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Sensor Controls</h4>
            
            <div className="sensor-field">
              <label>Oxygen (O₂)</label>
              <div className="sensor-input-group">
                <input type="number" step="0.1" value={sensors.oxygen} onChange={e => handleChange('oxygen', e.target.value)} />
                <span className="sensor-unit">%</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Carbon Monoxide (CO)</label>
              <div className="sensor-input-group">
                <input type="number" value={sensors.co} onChange={e => handleChange('co', e.target.value)} />
                <span className="sensor-unit">ppm</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Carbon Dioxide (CO₂)</label>
              <div className="sensor-input-group">
                <input type="number" value={sensors.co2} onChange={e => handleChange('co2', e.target.value)} />
                <span className="sensor-unit">ppm</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Methane (CH₄)</label>
              <div className="sensor-input-group">
                <input type="number" step="0.1" value={sensors.methane} onChange={e => handleChange('methane', e.target.value)} />
                <span className="sensor-unit">%</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Hydrogen Sulfide (H₂S)</label>
              <div className="sensor-input-group">
                <input type="number" step="0.1" value={sensors.h2s} onChange={e => handleChange('h2s', e.target.value)} />
                <span className="sensor-unit">ppm</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>VOC Sensor</label>
              <div className="sensor-input-group">
                <input type="number" value={sensors.voc} onChange={e => handleChange('voc', e.target.value)} />
                <span className="sensor-unit">ppm</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Temperature</label>
              <div className="sensor-input-group">
                <input type="number" value={sensors.temperature} onChange={e => handleChange('temperature', e.target.value)} />
                <span className="sensor-unit">°C</span>
              </div>
            </div>

            <div className="sensor-field">
              <label>Humidity</label>
              <div className="sensor-input-group">
                <input type="number" value={sensors.humidity} onChange={e => handleChange('humidity', e.target.value)} />
                <span className="sensor-unit">%</span>
              </div>
            </div>

            <button className="btn-primary" onClick={handleApplyValues} disabled={loading}>
              {loading ? 'Applying...' : 'Apply Values'}
            </button>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Scenario Presets</div>
              <div className="preset-buttons-row">
                <button className="btn-preset safe" onClick={() => handlePreset('SAFE')}>SAFE</button>
                <button className="btn-preset warning" onClick={() => handlePreset('WARNING')}>WARNING</button>
                <button className="btn-preset danger" onClick={() => handlePreset('DANGER')}>DANGER</button>
                <button className="btn-preset critical" onClick={() => handlePreset('CRITICAL')}>CRITICAL</button>
                <button className="btn-preset recovery" onClick={() => handlePreset('RECOVERY')}>RECOVERY</button>
              </div>
            </div>
          </div>

          {/* Readings Column */}
          <div className="sensor-readings-column">
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Current Sensor Readings</h4>
            
            <div className="reading-pill">
              <span className="reading-name"><ShieldCheck size={14} color="#10b981" /> O₂</span>
              <span className="reading-val">{sensors.oxygen}%</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Wind size={14} color="#3b82f6" /> CO</span>
              <span className="reading-val">{sensors.co} ppm</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Wind size={14} color="#64748b" /> CO₂</span>
              <span className="reading-val">{sensors.co2} ppm</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Flame size={14} color="#f59e0b" /> CH₄</span>
              <span className="reading-val">{sensors.methane}%</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Flame size={14} color="#ef4444" /> H₂S</span>
              <span className="reading-val">{sensors.h2s} ppm</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Wind size={14} color="#8b5cf6" /> VOC</span>
              <span className="reading-val">{sensors.voc} ppm</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Thermometer size={14} color="#ef4444" /> Temp</span>
              <span className="reading-val">{sensors.temperature}°C</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="reading-pill">
              <span className="reading-name"><Droplets size={14} color="#06b6d4" /> Humidity</span>
              <span className="reading-val">{sensors.humidity}%</span>
              <span className="reading-status normal">Normal</span>
            </div>

            <div className="sensor-safety-summary">
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Safety Level</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981' }}>SAFE</div>
              </div>
              <div style={{ borderLeft: '1px solid #cbd5e1', height: '24px' }}></div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Safe Entry</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981' }}>92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
