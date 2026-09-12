package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CombinedSafetyService {

    public Map<String, Object> evaluate(
            Map<String, Object> safety,
            Map<String, Object> robotHealth) {

        double overallRisk = getDouble(
                safety.get("overallRisk")
        );

        double safeEntry = getDouble(
                safety.get("safeEntryPercentage")
        );

        double robotHealthScore = getDouble(
                robotHealth.get("overallHealth")
        );

        double robotHealthRisk =
                Math.max(0.0, 100.0 - robotHealthScore);

        double combinedRisk = Math.round(
                (overallRisk * 0.75 + robotHealthRisk * 0.25)
                        * 100.0
        ) / 100.0;

        String missionStatus = getMissionStatus(combinedRisk);

        String recommendation =
                getRecommendation(missionStatus);

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("overallRisk", overallRisk);
        result.put("robotHealth", robotHealthScore);
        result.put("robotHealthRisk", robotHealthRisk);
        result.put("combinedRisk", combinedRisk);
        result.put("safeEntryPercentage", safeEntry);
        result.put("missionStatus", missionStatus);
        result.put("recommendation", recommendation);

        return result;
    }

    private String getMissionStatus(double risk) {

        if (risk < 25.0) {
            return "SAFE";
        }

        if (risk < 50.0) {
            return "CAUTION";
        }

        if (risk < 75.0) {
            return "HIGH";
        }

        return "CRITICAL";
    }

    private String getRecommendation(String status) {

        switch (status) {

            case "SAFE":
                return "Mission can continue under normal monitoring.";

            case "CAUTION":
                return "Proceed cautiously and monitor robot and environment.";

            case "HIGH":
                return "Reduce mission exposure and prepare for withdrawal.";

            case "CRITICAL":
                return "Stop mission and withdraw the robot immediately.";

            default:
                return "Monitor mission conditions continuously.";
        }
    }

    private double getDouble(Object value) {

        if (value == null) {
            return 0.0;
        }

        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }

        return 0.0;
    }
}
