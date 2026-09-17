import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useApp } from './context/AppContext';

import HomePage from './pages/HomePage';
import SensorSimulationPage from './pages/SensorSimulationPage';
import SafetyRiskPage from './pages/SafetyRiskPage';
import RobotHealthPage from './pages/RobotHealthPage';
import UndergroundMapPage from './pages/UndergroundMapPage';
import CommunicationPage from './pages/CommunicationPage';
import MissionLogsPage from './pages/MissionLogsPage';
import MissionReplayPage from './pages/MissionReplayPage';
import ReportsPage from './pages/ReportsPage';
import CameraPage from './pages/CameraPage';

import './styles/main.css';

export default function App() {
  const { activeNav, setActiveNav, theme } = useApp();

  const renderActivePage = () => {
    switch (activeNav) {
      case 'home':
        return <HomePage />;
      case 'sensor-simulation':
        return <SensorSimulationPage />;
      case 'safety-risk':
        return <SafetyRiskPage />;
      case 'robot-health':
        return <RobotHealthPage />;
      case 'underground-map':
        return <UndergroundMapPage />;
      case 'communication':
        return <CommunicationPage />;
      case 'mission-logs':
        return <MissionLogsPage />;
      case 'mission-replay':
        return <MissionReplayPage />;
      case 'reports':
        return <ReportsPage />;
      case 'camera':
        return <CameraPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="main-wrapper">
        <Header />
        {renderActivePage()}
      </div>
    </div>
  );
}
