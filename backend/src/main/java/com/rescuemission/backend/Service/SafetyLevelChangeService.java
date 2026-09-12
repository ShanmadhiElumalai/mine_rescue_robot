package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class SafetyLevelChangeService {

    private String previousLevel = null;

    public synchronized Map<String, Object> detectChange(
            String currentLevel) {

        Map<String, Object> result = new LinkedHashMap<>();

        if (currentLevel == null || currentLevel.isBlank()) {
            result.put("changed", false);
            result.put("changeType", "UNKNOWN");
            result.put("message", "Safety level is not available.");
            return result;
        }

        currentLevel = currentLevel.toUpperCase();

        if (previousLevel == null) {

            previousLevel = currentLevel;

            result.put("changed", false);
            result.put("changeType", "INITIAL");
            result.put("previousLevel", null);
            result.put("currentLevel", currentLevel);
            result.put(
                    "message",
                    "Initial safety level established."
            );

            return result;
        }

        boolean changed = !previousLevel.equals(currentLevel);

        result.put("changed", changed);
        result.put("previousLevel", previousLevel);
        result.put("currentLevel", currentLevel);

        if (!changed) {

            result.put("changeType", "NO_CHANGE");
            result.put(
                    "message",
                    "Safety level remains " + currentLevel + "."
            );

        } else {

            String changeType =
                    determineChangeType(previousLevel, currentLevel);

            result.put("changeType", changeType);
            result.put(
                    "message",
                    buildMessage(
                            previousLevel,
                            currentLevel,
                            changeType
                    )
            );
        }

        previousLevel = currentLevel;

        return result;
    }

    private String determineChangeType(
            String previous,
            String current) {

        int previousRank = getRank(previous);
        int currentRank = getRank(current);

        if (currentRank > previousRank) {
            if ("CRITICAL".equals(current)) {
                return "CRITICAL_ESCALATION";
            }

            if ("HIGH".equals(current)) {
                return "HIGH_RISK_ESCALATION";
            }

            return "RISK_ESCALATION";
        }

        if (currentRank < previousRank) {
            if ("SAFE".equals(current)) {
                return "RECOVERY";
            }

            return "RISK_REDUCTION";
        }

        return "LEVEL_CHANGE";
    }

    private int getRank(String level) {

        switch (level) {
            case "SAFE":
                return 0;
            case "CAUTION":
                return 1;
            case "HIGH":
                return 2;
            case "CRITICAL":
                return 3;
            default:
                return -1;
        }
    }

    private String buildMessage(
            String previous,
            String current,
            String changeType) {

        switch (changeType) {

            case "CRITICAL_ESCALATION":
                return "Safety level escalated from "
                        + previous
                        + " to CRITICAL. Immediate attention required.";

            case "HIGH_RISK_ESCALATION":
                return "Safety level escalated from "
                        + previous
                        + " to HIGH. Prepare for possible withdrawal.";

            case "RISK_ESCALATION":
                return "Safety level increased from "
                        + previous
                        + " to "
                        + current
                        + ". Monitor conditions closely.";

            case "RECOVERY":
                return "Safety conditions recovered from "
                        + previous
                        + " to SAFE.";

            case "RISK_REDUCTION":
                return "Safety level improved from "
                        + previous
                        + " to "
                        + current
                        + ".";

            default:
                return "Safety level changed from "
                        + previous
                        + " to "
                        + current
                        + ".";
        }
    }
}
