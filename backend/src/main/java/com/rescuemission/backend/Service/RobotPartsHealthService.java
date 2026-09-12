package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;

@Service
public class RobotPartsHealthService {

    private final Random random = new Random();

    public Map<String, Object> generatePartsHealth() {

        Map<String, Object> result = new LinkedHashMap<>();

        double totalHealth = 0.0;

        totalHealth += addPart(result, "HEAD", randomHealth());
        totalHealth += addPart(result, "LEFT_LEG", randomHealth());
        totalHealth += addPart(result, "RIGHT_LEG", randomHealth());
        totalHealth += addPart(result, "TAIL", randomHealth());
        totalHealth += addPart(result, "MOTOR", randomHealth());
        totalHealth += addPart(result, "JOINT", randomHealth());
        totalHealth += addPart(result, "GAS_SENSOR", randomHealth());
        totalHealth += addPart(result, "THERMAL_CAMERA", randomHealth());
        totalHealth += addPart(result, "LIDAR", randomHealth());
        totalHealth += addPart(result, "COMMUNICATION", randomHealth());

        double overallHealth = Math.round(
                (totalHealth / 10.0) * 100.0
        ) / 100.0;

        result.put("overallHealth", overallHealth);
        result.put("overallStatus", getStatus(overallHealth));

        return result;
    }

    private double addPart(
            Map<String, Object> result,
            String partName,
            double healthScore) {

        Map<String, Object> part = new LinkedHashMap<>();

        part.put("healthScore", healthScore);
        part.put("status", getStatus(healthScore));
        part.put("failureDetected", healthScore < 30.0);
        part.put(
                "failureDescription",
                getFailureDescription(partName, healthScore)
        );

        result.put(partName, part);

        return healthScore;
    }

    private double randomHealth() {

        return Math.round(
                (20.0 + random.nextDouble() * 80.0) * 100.0
        ) / 100.0;
    }

    private String getStatus(double healthScore) {

        if (healthScore >= 70.0) {
            return "HEALTHY";
        }

        if (healthScore >= 40.0) {
            return "WARNING";
        }

        if (healthScore >= 30.0) {
            return "CRITICAL";
        }

        return "FAILED";
    }

    private String getFailureDescription(
            String partName,
            double healthScore) {

        if (healthScore >= 70.0) {
            return "Operating normally.";
        }

        if (healthScore >= 40.0) {
            return partName + " health is degrading. Monitor closely.";
        }

        if (healthScore >= 30.0) {
            return partName + " requires immediate inspection.";
        }

        return partName + " failure detected.";
    }
}
