import React, { useState, useEffect } from 'react';
import { Sliders, ShieldCheck, Flame, Droplets, Thermometer, Wind, Camera, Cpu, Compass, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { simulateManualSensors, simulateScenario } from '../services/api';

// Safety calculation algorithm matching backend SafetyEngineService.java
const calculateOxygenRisk = (oxygen) => {
  if (oxygen >= 19.5) return 0.0;
  if (oxygen >= 18.0) return Math.round(((19.5 - oxygen) / 1.5 * 40.0) * 100) / 100;
  if (oxygen >= 16.0) return Math.round((40.0 + (18.0 - oxygen) / 2.0 * 40.0) * 100) / 100;
  return 100.0;
};

const calculateCORisk = (co) => {
  if (co <= 25.0) return 0.0;
  if (co <= 50.0) return Math.round(((co - 25.0) / 25.0 * 25.0) * 100) / 100;
  if (co <= 100.0) return Math.round((25.0 + (co - 50.0) / 50.0 * 35.0) * 100) / 100;
  if (co <= 200.0) return Math.round((60.0 + (co - 100.0) / 100.0 * 40.0) * 100) / 100;
  return 100.0;
};

const calculateCO2Risk = (co2) => {
  if (co2 <= 1000.0) return 0.0;
  if (co2 <= 1500.0) return Math.round(((co2 - 1000.0) / 500.0 * 30.0) * 100) / 100;
  if (co2 <= 2500.0) return Math.round((30.0 + (co2 - 1500.0) / 1000.0 * 40.0) * 100) / 100;
  return 100.0;
};

const calculateMethaneRisk = (methane) => {
  if (methane <= 0.5) return 0.0;
  if (methane <= 1.0) return Math.round(((methane - 0.5) / 0.5 * 25.0) * 100) / 100;
  if (methane <= 2.0) return Math.round((25.0 + (methane - 1.0) / 1.0 * 35.0) * 100) / 100;
  if (methane <= 4.0) return Math.round((60.0 + (methane - 2.0) / 2.0 * 30.0) * 100) / 100;
  return 100.0;
};

const calculateTemperatureRisk = (temperature) => {
  if (temperature <= 30.0) return 0.0;
  if (temperature <= 35.0) return Math.round(((temperature - 30.0) / 5.0 * 25.0) * 100) / 100;
  if (temperature <= 40.0) return Math.round((25.0 + (temperature - 35.0) / 5.0 * 35.0) * 100) / 100;
  if (temperature <= 50.0) return Math.round((60.0 + (temperature - 40.0) / 10.0 * 40.0) * 100) / 100;
  return 100.0;
};

const calculateH2SRisk = (h2s) => {
  if (h2s <= 2.5) return 0.0;
  if (h2s <= 5.0) return Math.round(((h2s - 2.5) / 2.5 * 30.0) * 100) / 100;
  if (h2s <= 10.0) return Math.round((30.0 + (h2s - 5.0) / 5.0 * 40.0) * 100) / 100;
  return 100.0;
};

const calculateSafeEntry = (s) => {
  const oxygen = Number(s?.oxygen) || 0;
  const co = Number(s?.co) || 0;
  const co2 = Number(s?.co2) || 0;
  const methane = Number(s?.methane) || 0;
  const temperature = Number(s?.temperature) || 0;
  const h2s = Number(s?.h2s) || 0;

  const oxygenRisk = calculateOxygenRisk(oxygen);
  const coRisk = calculateCORisk(co);
  const co2Risk = calculateCO2Risk(co2);
  const methaneRisk = calculateMethaneRisk(methane);
  const tempRisk = calculateTemperatureRisk(temperature);
  const h2sRisk = calculateH2SRisk(h2s);

  const baseGasRisk = (oxygenRisk + coRisk + co2Risk + methaneRisk) / 4.0;
  const gasRisk = Math.max(baseGasRisk, h2sRisk);

  const overallRisk = Math.round((gasRisk * 0.85 + tempRisk * 0.15) * 100) / 100;
  const safeEntry = Math.max(0, Math.min(100, Math.round(100.0 - overallRisk)));

  return safeEntry;
};

const getSafeEntryState = (percentage) => {
  if (percentage >= 70) {
    return {
      statusText: 'SAFE',
      rangeText: 'Safe Range ≥ 70%',
      description: 'Safe entry percentage updates automatically when you change sensor values and apply them.',
      color: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.35)',
      cardBorder: 'rgba(16, 185, 129, 0.35)',
      cardGlow: '0 0 15px rgba(16, 185, 129, 0.1)',
      iconBg: 'rgba(16, 185, 129, 0.15)'
    };
  }
  if (percentage >= 50) {
    return {
      statusText: 'CAUTION',
      rangeText: 'Entry requires monitoring',
      description: 'Moderate environmental risk. Monitor all sensor telemetry closely.',
      color: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.35)',
      cardBorder: 'rgba(245, 158, 11, 0.35)',
      cardGlow: '0 0 15px rgba(245, 158, 11, 0.1)',
      iconBg: 'rgba(245, 158, 11, 0.15)'
    };
  }
  if (percentage >= 25) {
    return {
      statusText: 'HIGH RISK',
      rangeText: 'Entry restricted',
      description: 'Hazardous conditions detected. Human entry restricted.',
      color: '#f97316',
      badgeBg: 'rgba(249, 115, 22, 0.15)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      cardBorder: 'rgba(249, 115, 22, 0.35)',
      cardGlow: '0 0 15px rgba(249, 115, 22, 0.1)',
      iconBg: 'rgba(249, 115, 22, 0.15)'
    };
  }
  return {
    statusText: 'CRITICAL',
    rangeText: 'Do not enter',
    description: 'Critical environmental danger. Do not enter under any circumstances.',
    color: '#ef4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    badgeBorder: 'rgba(239, 68, 68, 0.35)',
    cardBorder: 'rgba(239, 68, 68, 0.35)',
    cardGlow: '0 0 15px rgba(239, 68, 68, 0.1)',
    iconBg: 'rgba(239, 68, 68, 0.15)'
  };
};

export default function SensorSimulationPage() {
  const { sensors, updateSensors, applyScenarioPreset } = useApp();
  const [localSensors, setLocalSensors] = useState(sensors);
  const [loading, setLoading] = useState(false);
  const [safeEntryPercentage, setSafeEntryPercentage] = useState(() => calculateSafeEntry(sensors));
  const entryState = getSafeEntryState(safeEntryPercentage);

  useEffect(() => {
    setLocalSensors(sensors);
    setSafeEntryPercentage(calculateSafeEntry(sensors));
  }, [sensors]);

  const handleChange = (field, val) => {
    setLocalSensors(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const handleApplyValues = async () => {
    setLoading(true);
    updateSensors(localSensors);
    const calculated = calculateSafeEntry(localSensors);
    setSafeEntryPercentage(calculated);
    try {
      const res = await simulateManualSensors(localSensors);
      if (res && res.safety && typeof res.safety.safeEntryPercentage === 'number') {
        let finalScore = res.safety.safeEntryPercentage;
        if (localSensors.h2s > 10) finalScore = Math.min(finalScore, 20);
        else if (localSensors.h2s > 5) finalScore = Math.min(finalScore, 55);
        setSafeEntryPercentage(Math.round(finalScore));
      }
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
      const res = await simulateScenario(preset);
      if (res && res.safety && typeof res.safety.safeEntryPercentage === 'number') {
        setSafeEntryPercentage(Math.round(res.safety.safeEntryPercentage));
      }
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

            {/* Safe Entry Percentage Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-input, #0c1424)',
                borderRadius: '12px',
                border: `1px solid ${entryState.cardBorder}`,
                boxShadow: entryState.cardGlow,
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: entryState.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={20} color={entryState.color} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary, #f8fafc)' }}>
                      Safe Entry Percentage
                    </span>
                    <Info size={13} color="var(--text-muted, #64748b)" style={{ cursor: 'pointer' }} title="Calculated safe entry percentage based on current environmental and gas telemetry." />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)' }}>
                    Based on current sensor values
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Radial / Circular Progress Indicator */}
                <div style={{ width: '84px', height: '84px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '84px', height: '84px' }}>
                    <path
                      className="circle-bg"
                      stroke="var(--progress-track-bg, #152035)"
                      strokeWidth="3.2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle-fill"
                      stroke={entryState.color}
                      strokeWidth="3.2"
                      strokeDasharray={`${safeEntryPercentage}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      style={{ transition: 'stroke-dasharray 0.6s ease, stroke 0.4s ease' }}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary, #f8fafc)', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                      {safeEntryPercentage}%
                    </div>
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: entryState.color, marginTop: '3px', letterSpacing: '0.4px' }}>
                      {entryState.statusText}
                    </div>
                  </div>
                </div>

                {/* Status & Supporting Message */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary, #f8fafc)' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: entryState.color,
                          display: 'inline-block',
                          boxShadow: `0 0 8px ${entryState.color}`
                        }}
                      />
                      <span>{entryState.rangeText}</span>
                    </div>
                    <span
                      style={{
                        padding: '2px 9px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: entryState.badgeBg,
                        color: entryState.color,
                        border: `1px solid ${entryState.badgeBorder}`
                      }}
                    >
                      {entryState.statusText}
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary, #94a3b8)', margin: 0, lineHeight: 1.4 }}>
                    {entryState.description}
                  </p>
                </div>
              </div>
            </div>

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

