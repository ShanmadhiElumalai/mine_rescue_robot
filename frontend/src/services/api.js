// Centralized API Service with Single-Probe Backend Detection & Demo Mode Protection
const API_BASE = '/api';

let backendStatus = null; // null = unprobed, true = ONLINE, false = DEMO MODE
let probePromise = null;
const statusListeners = [];

export const checkBackendStatus = async () => {
  if (backendStatus !== null) return backendStatus;

  if (!probePromise) {
    probePromise = (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s quick probe timeout

        const response = await fetch(`${API_BASE}/simulation/continuous`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });

        clearTimeout(timeoutId);
        backendStatus = response.ok;
      } catch (err) {
        backendStatus = false;
      }
      statusListeners.forEach(fn => fn(backendStatus));
      return backendStatus;
    })();
  }

  return await probePromise;
};

export const subscribeBackendStatus = (callback) => {
  if (backendStatus !== null) {
    callback(backendStatus);
  } else {
    checkBackendStatus().then(status => callback(status));
  }
  statusListeners.push(callback);
  return () => {
    const idx = statusListeners.indexOf(callback);
    if (idx !== -1) statusListeners.splice(idx, 1);
  };
};

async function fetchApi(url, options = {}, fallbackData = null) {
  const online = await checkBackendStatus();
  if (!online) return fallbackData;

  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) return fallbackData;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.blob();
    }
  } catch (err) {
    backendStatus = false;
    statusListeners.forEach(fn => fn(backendStatus));
    return fallbackData;
  }
}

// REST API endpoint helpers mapping strictly to backend endpoints
export const getContinuousSensors = () => fetchApi('/simulation/continuous');
export const simulateManualSensors = (data) => fetchApi('/simulation/sensors/manual', { method: 'POST', body: JSON.stringify(data) });
export const simulateScenario = (scenario) => fetchApi('/simulation/scenario', { method: 'POST', body: JSON.stringify({ scenario }) });
export const getRobotPartsHealth = () => fetchApi('/robot/parts-health');
export const getHumanDetections = () => fetchApi('/simulation/detection/humans');
export const getHumanDetectionsApi = getHumanDetections;
export const getGasHazardMap = () => fetchApi('/simulation/gas-hazard/map');
export const getGasHazardMapApi = getGasHazardMap;
export const getCommunicationStatusApi = (depth = 245) => fetchApi(`/simulation/communication?depth=${depth}`);
export const getMissionLogs = (missionId = 1) => fetchApi(`/mission-logs?missionId=${missionId}`);
export const getMissionLogsApi = getMissionLogs;
export const getMissionReplayData = (missionId = 1) => fetchApi(`/mission-replay/${missionId}/timeline`);
export const getMissionReplayDataApi = getMissionReplayData;

export const playReplay = (missionId = 1) => fetchApi(`/mission-replay/${missionId}/play`, { method: 'POST' });
export const pauseReplay = (missionId = 1) => fetchApi(`/mission-replay/${missionId}/pause`, { method: 'POST' });
export const setReplaySpeed = (missionId = 1, speed = 1) => fetchApi(`/mission-replay/${missionId}/speed`, { method: 'POST', body: JSON.stringify({ speed }) });

export const downloadReport = async (reportType, missionId = 1) => {
  let endpoint = `/mission-reports/${missionId}/pdf`;
  if (reportType === 'gas-analysis') endpoint = `/mission-reports/${missionId}/gas-analysis-pdf`;
  if (reportType === 'replay') endpoint = `/mission-reports/${missionId}/replay-pdf`;
  if (reportType === 'mission-logs') endpoint = `/mission-reports/${missionId}/mission-logs-pdf`;
  if (reportType === 'sensor-csv') endpoint = `/mission-reports/${missionId}/sensor-data-export`;

  const online = await checkBackendStatus();
  if (online) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `slytherine-${reportType}-${missionId}.${reportType === 'sensor-csv' ? 'csv' : 'pdf'}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }
    } catch (e) {
      console.warn("Download endpoint fallback");
    }
  }

  // Demo fallback export
  const dummyContent = `MINE RESCUE ROBOT - SLYTHERINE REPORT\nReport Type: ${reportType.toUpperCase()}\nMission: MISSION-${missionId}\nGenerated: ${new Date().toLocaleString()}\nMode: DEMO / OFFLINE FALLBACK`;
  const blob = new Blob([dummyContent], { type: reportType === 'sensor-csv' ? 'text/csv' : 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `slytherine-${reportType}-${missionId}.${reportType === 'sensor-csv' ? 'csv' : 'txt'}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

