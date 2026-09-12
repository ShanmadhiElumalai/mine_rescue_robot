package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class RobotHealthScenarioService {

    public Map<String, Object> generateScenario(String scenario) {

        Map<String, Double> health = new LinkedHashMap<>();

        health.put("HEAD", 95.0);
        health.put("LEFT_LEG", 95.0);
        health.put("RIGHT_LEG", 95.0);
        health.put("TAIL", 95.0);
        health.put("MOTOR", 95.0);
        health.put("JOINT", 95.0);
        health.put("GAS_SENSOR", 95.0);
        health.put("THERMAL_CAMERA", 95.0);
        health.put("LIDAR", 95.0);
        health.put("COMMUNICATION", 95.0);

        if (scenario == null) {
            scenario = "NORMAL";
        }

        switch (scenario.toUpperCase()) {

            case "MOTOR_FAILURE":
                health.put("MOTOR", 10.0);
                break;

            case "LEG_FAILURE":
                health.put("LEFT_LEG", 20.0);
                health.put("RIGHT_LEG", 35.0);
                break;

            case "SENSOR_FAILURE":
                health.put("GAS_SENSOR", 15.0);
                health.put("THERMAL_CAMERA", 25.0);
                health.put("LIDAR", 30.0);
                break;

            case "COMMUNICATION_FAILURE":
                health.put("COMMUNICATION", 10.0);
                break;

            case "NORMAL":
            default:
                break;
        }

        return buildResult(health);
    }

    private Map<String, Object> buildResult(
            Map<String, Double> health) {

        Map<String, Object> result = new LinkedHashMap<>();

        double total = 0.0;

        for (Map.Entry<String, Double> entry : health.entrySet()) {

            double score = entry.getValue();
            total += score;

            Map<String, Object> part = new LinkedHashMap<>();

            part.put("healthScore", score);
            part.put("status", getStatus(score));
            part.put("failureDetected", score < 30.0);
            part.put(
                    "failureDescription",
                    getDescription(entry.getKey(), score)
            );

            result.put(entry.getKey(), part);
        }

        double overallHealth = Math.round(
                (total / health.size()) * 100.0
        ) / 100.0;

        result.put("overallHealth", overallHealth);
        result.put("overallStatus", getStatus(overallHealth));

        return result;
    }

    private String getStatus(double score) {

        if (score >= 70.0) {
            return "HEALTHY";
        }

        if (score >= 40.0) {
            return "WARNING";
        }

        if (score >= 30.0) {
            return "CRITICAL";
        }

        return "FAILED";
    }

    private String getDescription(
            String part,
            double score) {

        if (score >= 70.0) {
            return "Operating normally.";
        }

        if (score >= 40.0) {
            return part + " health is degrading. Monitor closely.";
        }

        if (score >= 30.0) {
            return part + " requires immediate inspection.";
        }

        return part + " failure detected.";
    }
}
