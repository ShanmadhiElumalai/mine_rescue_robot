import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState('home');

  // 1. Centralized Sensor State
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

  // 2. Robot Depth & Locomotion State
  const [depth, setDepth] = useState(245); // meters

  // 3. Calculated Safety & Risk State
  const [safetyEngine, setSafetyEngine] = useState({
    overallSafetyStatus: 'SAFE',
    safeEntryPercentage: 92,
    statusText: 'ENTRY RECOMMENDED',
    gasRisk: 15,
    tempRisk: 15,
    commRisk: 35,
    robotHealthRisk: 15,
    survivorRisk: 60,
    dangerousSensor: null,
    recommendations: [
      'All environmental sensors within normal operating limits',
      'Continue standard underground search pattern'
    ]
  });

  // 4. Communication State
  const [commState, setCommState] = useState({
    healthPercentage: 65,
    signalStrength: '-68 dBm',
    latency: '180 ms',
    connectionStatus: 'MODERATE',
    prediction: 'HIGH RISK',
    confidence: '94%',
    warning: false,
    recommendation: 'Monitor connection as depth increases'
  });

  // 5. Mission Logs Stream State
  const [missionLogs, setMissionLogs] = useState([
    { id: 1, time: "10:31:22", event: "Mission Started", details: "Mission-001 initialized with SLYTHERINE", severity: "Info", status: "Resolved", category: "Command" },
    { id: 2, time: "10:29:44", event: "Robot Moved", details: "Depth reached 245m shaft depth", severity: "Info", status: "Resolved", category: "Robot" },
    { id: 3, time: "10:28:02", event: "Communication Degraded", details: "Signal dropped to -68 dBm at 245m depth", severity: "Warning", status: "Active", category: "Communication" },
    { id: 4, time: "10:27:14", event: "Human Detected", details: "Survivor Alpha detected, Body Temp: 36.8°C", severity: "Critical", status: "Resolved", category: "Human" },
    { id: 5, time: "10:25:42", event: "Gas Baseline Checked", details: "Baseline gas values established", severity: "Info", status: "Resolved", category: "Gas" },
    { id: 6, time: "10:23:10", event: "Robot Health Warning", details: "Segment 3 joint resistance nominal", severity: "Warning", status: "Resolved", category: "Failure" }
  ]);

  // 6. Human Detections List State
  const [humanDetections, setHumanDetections] = useState([
    {
      id: 1,
      name: "Survivor Alpha",
      bodyTemp: 36.8,
      envTemp: 28.5,
      distance: 18.5,
      confidence: 96.5,
      severity: "CRITICAL",
      confirmationStatus: "CONFIRMED",
      sensorCount: 4,
      detectionTime: "10:27:14",
      lat: 12.9716,
      lng: 77.5946,
      x: 62,
      y: 48
    },
    {
      id: 2,
      name: "Survivor Beta",
      bodyTemp: 35.2,
      envTemp: 29.1,
      distance: 34.0,
      confidence: 88.2,
      severity: "HIGH",
      confirmationStatus: "UNCONFIRMED",
      sensorCount: 3,
      detectionTime: "10:29:05",
      lat: 12.9720,
      lng: 77.5950,
      x: 38,
      y: 72
    }
  ]);

  const [selectedHuman, setSelectedHuman] = useState(humanDetections[0]);

  // Dynamic Safety & Communication Calculation Engine
  useEffect(() => {
    let gasRiskScore = 15;
    let dangerous = null;

    if (sensors.co > 100) {
      gasRiskScore = 95;
      dangerous = `CO (${sensors.co} ppm) exceeds lethal limit (100 ppm)`;
    } else if (sensors.co > 50) {
      gasRiskScore = 75;
      dangerous = `CO (${sensors.co} ppm) exceeds warning limit (50 ppm)`;
    } else if (sensors.co > 30) {
      gasRiskScore = 45;
      dangerous = `Elevated CO (${sensors.co} ppm)`;
    }

    if (sensors.methane > 2.0) {
      gasRiskScore = Math.max(gasRiskScore, 95);
      dangerous = `Explosive Methane CH₄ (${sensors.methane}%) detected`;
    } else if (sensors.methane > 1.0) {
      gasRiskScore = Math.max(gasRiskScore, 70);
      dangerous = `High Methane CH₄ (${sensors.methane}%)`;
    }

    if (sensors.oxygen < 18) {
      gasRiskScore = Math.max(gasRiskScore, 90);
      dangerous = `Severe Oxygen Deficiency (${sensors.oxygen}%)`;
    } else if (sensors.oxygen < 19.5) {
      gasRiskScore = Math.max(gasRiskScore, 60);
      dangerous = `Low Oxygen Level (${sensors.oxygen}%)`;
    }

    if (sensors.co2 > 2000) {
      gasRiskScore = Math.max(gasRiskScore, 85);
      dangerous = `High CO₂ (${sensors.co2} ppm)`;
    }

    if (sensors.h2s > 10) {
      gasRiskScore = Math.max(gasRiskScore, 90);
      dangerous = `Toxic H₂S (${sensors.h2s} ppm) detected`;
    }

    const tempRiskScore = sensors.temperature > 50 ? 90 : sensors.temperature > 40 ? 65 : sensors.temperature > 35 ? 35 : 15;
    
    // Communication calculations based on depth
    let commHealth = 95;
    let signalStr = '-52 dBm';
    let latMs = '65 ms';
    let connStat = 'EXCELLENT';
    let predRisk = 'LOW RISK';
    let confPct = '98%';
    let commRiskScore = 15;
    let commWarn = false;
    let commRec = 'Communication link stable';

    if (depth >= 400) {
      commHealth = 25;
      signalStr = '-92 dBm';
      latMs = '480 ms';
      connStat = 'LOSS IMMINENT';
      predRisk = 'CRITICAL RISK';
      confPct = '88%';
      commRiskScore = 95;
      commWarn = true;
      commRec = 'COMMUNICATION LOSS IMMINENT. Return robot to safer depth immediately.';
    } else if (depth >= 300) {
      commHealth = 48;
      signalStr = '-78 dBm';
      latMs = '290 ms';
      connStat = 'DEGRADING';
      predRisk = 'HIGH RISK';
      confPct = '91%';
      commRiskScore = 65;
      commWarn = true;
      commRec = 'Deploy TTE wireless relay node or reduce shaft depth.';
    } else if (depth >= 200) {
      commHealth = 65;
      signalStr = '-68 dBm';
      latMs = '180 ms';
      connStat = 'MODERATE';
      predRisk = 'MODERATE RISK';
      confPct = '94%';
      commRiskScore = 35;
      commWarn = false;
      commRec = 'Monitor signal attenuation as depth increases.';
    } else if (depth >= 100) {
      commHealth = 82;
      signalStr = '-62 dBm';
      latMs = '110 ms';
      connStat = 'GOOD';
      predRisk = 'LOW RISK';
      confPct = '96%';
      commRiskScore = 20;
    }

    setCommState({
      healthPercentage: commHealth,
      signalStrength: signalStr,
      latency: latMs,
      connectionStatus: connStat,
      prediction: predRisk,
      confidence: confPct,
      warning: commWarn,
      recommendation: commRec
    });

    const robotHealthRiskScore = 15;
    const survivorRiskScore = 60;

    const maxRisk = Math.max(gasRiskScore, tempRiskScore, commRiskScore, robotHealthRiskScore, survivorRiskScore);

    let status = 'SAFE';
    let entryText = 'ENTRY RECOMMENDED';

    if (maxRisk >= 80) {
      status = 'CRITICAL';
      entryText = 'UNSAFE — DO NOT ENTER';
    } else if (maxRisk >= 50) {
      status = 'HIGH';
      entryText = 'ENTRY RESTRICTED';
    } else if (maxRisk >= 35) {
      status = 'WARNING';
      entryText = 'ENTRY WITH CAUTION';
    }

    const safeEntryPct = Math.max(5, Math.round(100 - maxRisk * 0.95));

    const recs = [];
    if (status === 'SAFE') {
      recs.push('All environmental sensors within normal limits');
      recs.push('Continue mission search pattern');
    } else if (status === 'WARNING' || status === 'HIGH') {
      recs.push(`Monitor ${dangerous || 'environmental hazard'}`);
      recs.push('Reduce robot movement speed');
    } else {
      recs.push(`CRITICAL HAZARD: ${dangerous}`);
      recs.push('Evacuate rescue personnel immediately');
      recs.push('Deploy automated ventilation & gas abatement');
    }

    setSafetyEngine({
      overallSafetyStatus: status,
      safeEntryPercentage: safeEntryPct,
      statusText: entryText,
      gasRisk: gasRiskScore,
      tempRisk: tempRiskScore,
      commRisk: commRiskScore,
      robotHealthRisk: robotHealthRiskScore,
      survivorRisk: survivorRiskScore,
      dangerousSensor: dangerous,
      recommendations: recs
    });

    // Log dynamic warning event when hazard occurs
    if (dangerous) {
      const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      setMissionLogs(prev => {
        if (prev.some(l => l.details === dangerous)) return prev;
        return [
          {
            id: Date.now(),
            time: nowTime,
            event: status === 'CRITICAL' ? 'Gas Critical Hazard' : 'Gas Warning Alert',
            details: dangerous,
            severity: status === 'CRITICAL' ? 'Critical' : 'Warning',
            status: 'Active',
            category: 'Gas'
          },
          ...prev
        ];
      });
    }
  }, [sensors, depth]);

  const updateSensors = (newSensors) => {
    setSensors(prev => ({ ...prev, ...newSensors }));
  };

  const applyScenarioPreset = (preset) => {
    if (preset === 'SAFE') {
      setSensors({ oxygen: 20.5, co: 18, co2: 820, methane: 0.4, h2s: 2.1, voc: 12, temperature: 31, humidity: 58 });
    } else if (preset === 'WARNING') {
      setSensors({ oxygen: 19.2, co: 48, co2: 1200, methane: 1.2, h2s: 5.5, voc: 25, temperature: 38, humidity: 65 });
    } else if (preset === 'DANGER' || preset === 'HIGH') {
      setSensors({ oxygen: 18.1, co: 85, co2: 1800, methane: 1.8, h2s: 8.2, voc: 45, temperature: 44, humidity: 72 });
    } else if (preset === 'CRITICAL') {
      setSensors({ oxygen: 16.5, co: 135, co2: 2400, methane: 2.8, h2s: 14.0, voc: 80, temperature: 52, humidity: 82 });
    } else if (preset === 'RECOVERY') {
      setSensors({ oxygen: 20.5, co: 22, co2: 850, methane: 0.5, h2s: 2.5, voc: 14, temperature: 32, humidity: 60 });
    }
  };

  const addMissionLog = (newLog) => {
    setMissionLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      activeNav,
      setActiveNav,
      sensors,
      updateSensors,
      applyScenarioPreset,
      depth,
      setDepth,
      safetyEngine,
      commState,
      missionLogs,
      addMissionLog,
      humanDetections,
      selectedHuman,
      setSelectedHuman
    }}>
      {children}
    </AppContext.Provider>
  );
};

