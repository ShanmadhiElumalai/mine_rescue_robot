package com.rescuemission.backend.Service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class ScenarioSimulationService {

    public Map<String, Double> generateScenario(String scenario) {

        Map<String, Double> sensors = new LinkedHashMap<>();

        if (scenario == null) {
            scenario = "SAFE";
        }

        switch (scenario.toUpperCase()) {

            case "WARNING":
                sensors.put("oxygen", 18.8);
                sensors.put("co", 60.0);
                sensors.put("co2", 1600.0);
                sensors.put("methane", 1.5);
                sensors.put("temperature", 35.0);
                sensors.put("humidity", 65.0);
                break;

            case "DANGER":
                sensors.put("oxygen", 17.5);
                sensors.put("co", 120.0);
                sensors.put("co2", 2200.0);
                sensors.put("methane", 3.0);
                sensors.put("temperature", 42.0);
                sensors.put("humidity", 75.0);
                break;

            case "CRITICAL":
                sensors.put("oxygen", 15.5);
                sensors.put("co", 180.0);
                sensors.put("co2", 2800.0);
                sensors.put("methane", 4.5);
                sensors.put("temperature", 48.0);
                sensors.put("humidity", 85.0);
                break;

            case "RECOVERY":
                sensors.put("oxygen", 19.8);
                sensors.put("co", 20.0);
                sensors.put("co2", 800.0);
                sensors.put("methane", 0.3);
                sensors.put("temperature", 28.0);
                sensors.put("humidity", 55.0);
                break;

            case "SAFE":
            default:
                sensors.put("oxygen", 20.5);
                sensors.put("co", 10.0);
                sensors.put("co2", 700.0);
                sensors.put("methane", 0.2);
                sensors.put("temperature", 27.0);
                sensors.put("humidity", 50.0);
                break;
        }

        return sensors;
    }
}
