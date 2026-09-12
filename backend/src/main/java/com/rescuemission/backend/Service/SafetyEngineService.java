package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class SafetyEngineService {

    private final SafetyEngineValidationService validationService;
    private final SafetyLevelChangeService safetyLevelChangeService;

    public SafetyEngineService(
            SafetyEngineValidationService validationService,
            SafetyLevelChangeService safetyLevelChangeService) {

        this.validationService = validationService;
        this.safetyLevelChangeService = safetyLevelChangeService;
    }

    public Map<String, Object> evaluate(Map<String, Double> sensors) {

        validationService.validateSensors(sensors);

        double oxygen = sensors.get("oxygen");
        double co = sensors.get("co");
        double co2 = sensors.get("co2");
        double methane = sensors.get("methane");
        double temperature = sensors.get("temperature");

        double oxygenRisk = calculateOxygenRisk(oxygen);
        double coRisk = calculateCORisk(co);
        double co2Risk = calculateCO2Risk(co2);
        double methaneRisk = calculateMethaneRisk(methane);
        double temperatureRisk = calculateTemperatureRisk(temperature);

        double gasRisk = round(
                (oxygenRisk + coRisk + co2Risk + methaneRisk) / 4.0
        );

        double overallRisk = round(
                gasRisk * 0.85 + temperatureRisk * 0.15
        );

        double safeEntry = round(
                Math.max(0.0, 100.0 - overallRisk)
        );

        String riskLevel = getRiskLevel(overallRisk);

        List<Map<String, String>> alerts = generateAlerts(
                oxygen,
                co,
                co2,
                methane,
                temperature
        );

        String dangerousSensor = getDangerousSensor(
                oxygenRisk,
                coRisk,
                co2Risk,
                methaneRisk,
                temperatureRisk
        );

        String reason = getReason(
                riskLevel,
                dangerousSensor
        );

        String recommendation = getRecommendation(riskLevel);
        String emergencyAction = getEmergencyAction(riskLevel);

        Map<String, Object> safetyLevelChange =
                safetyLevelChangeService.detectChange(riskLevel);

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("oxygenRisk", oxygenRisk);
        result.put("coRisk", coRisk);
        result.put("co2Risk", co2Risk);
        result.put("methaneRisk", methaneRisk);
        result.put("temperatureRisk", temperatureRisk);

        result.put("gasRisk", gasRisk);
        result.put("overallRisk", overallRisk);
        result.put("safeEntryPercentage", safeEntry);
        result.put("riskLevel", riskLevel);

        result.put("dangerousSensor", dangerousSensor);
        result.put("reason", reason);
        result.put("recommendation", recommendation);
        result.put("emergencyAction", emergencyAction);

        result.put("safetyLevelChange", safetyLevelChange);
        result.put("alerts", alerts);

        return result;
    }

    private double calculateOxygenRisk(double oxygen) {
        if (oxygen >= 19.5) return 0.0;
        if (oxygen >= 18.0) return round((19.5 - oxygen) / 1.5 * 40.0);
        if (oxygen >= 16.0) return round(40.0 + (18.0 - oxygen) / 2.0 * 40.0);
        return 100.0;
    }

    private double calculateCORisk(double co) {
        if (co <= 25.0) return 0.0;
        if (co <= 50.0) return round((co - 25.0) / 25.0 * 25.0);
        if (co <= 100.0) return round(25.0 + (co - 50.0) / 50.0 * 35.0);
        if (co <= 200.0) return round(60.0 + (co - 100.0) / 100.0 * 40.0);
        return 100.0;
    }

    private double calculateCO2Risk(double co2) {
        if (co2 <= 1000.0) return 0.0;
        if (co2 <= 1500.0) return round((co2 - 1000.0) / 500.0 * 30.0);
        if (co2 <= 2500.0) return round(30.0 + (co2 - 1500.0) / 1000.0 * 40.0);
        return 100.0;
    }

    private double calculateMethaneRisk(double methane) {
        if (methane <= 0.5) return 0.0;
        if (methane <= 1.0) return round((methane - 0.5) / 0.5 * 25.0);
        if (methane <= 2.0) return round(25.0 + (methane - 1.0) / 1.0 * 35.0);
        if (methane <= 4.0) return round(60.0 + (methane - 2.0) / 2.0 * 30.0);
        return 100.0;
    }

    private double calculateTemperatureRisk(double temperature) {
        if (temperature <= 30.0) return 0.0;
        if (temperature <= 35.0) return round((temperature - 30.0) / 5.0 * 25.0);
        if (temperature <= 40.0) return round(25.0 + (temperature - 35.0) / 5.0 * 35.0);
        if (temperature <= 50.0) return round(60.0 + (temperature - 40.0) / 10.0 * 40.0);
        return 100.0;
    }

    private String getRiskLevel(double risk) {
        if (risk < 25.0) return "SAFE";
        if (risk < 50.0) return "CAUTION";
        if (risk < 75.0) return "HIGH";
        return "CRITICAL";
    }

    private String getDangerousSensor(
            double oxygenRisk,
            double coRisk,
            double co2Risk,
            double methaneRisk,
            double temperatureRisk) {

        double highestRisk = oxygenRisk;
        String sensor = "OXYGEN";

        if (coRisk > highestRisk) {
            highestRisk = coRisk;
            sensor = "CARBON MONOXIDE";
        }

        if (co2Risk > highestRisk) {
            highestRisk = co2Risk;
            sensor = "CARBON DIOXIDE";
        }

        if (methaneRisk > highestRisk) {
            highestRisk = methaneRisk;
            sensor = "METHANE";
        }

        if (temperatureRisk > highestRisk) {
            sensor = "TEMPERATURE";
        }

        return sensor;
    }

    private String getReason(
            String riskLevel,
            String dangerousSensor) {

        if ("SAFE".equals(riskLevel)) {
            return "Environmental conditions are within safe operating limits.";
        }

        switch (dangerousSensor) {
            case "OXYGEN":
                return "Oxygen level is below the recommended safe range.";
            case "CARBON MONOXIDE":
                return "Carbon monoxide concentration is elevated.";
            case "CARBON DIOXIDE":
                return "Carbon dioxide concentration is elevated.";
            case "METHANE":
                return "Methane concentration is creating a significant gas hazard.";
            case "TEMPERATURE":
                return "Environmental temperature is too high for safe operation.";
            default:
                return "Multiple environmental parameters are contributing to mission risk.";
        }
    }

    private String getRecommendation(String riskLevel) {
        switch (riskLevel) {
            case "SAFE":
                return "Continue the mission with normal monitoring.";
            case "CAUTION":
                return "Proceed cautiously and monitor sensor values continuously.";
            case "HIGH":
                return "Reduce mission exposure and prepare the robot for withdrawal.";
            case "CRITICAL":
                return "Stop the mission and withdraw the robot immediately.";
            default:
                return "Monitor environmental conditions continuously.";
        }
    }

    private String getEmergencyAction(String riskLevel) {
        switch (riskLevel) {
            case "CRITICAL":
                return "EMERGENCY_WITHDRAWAL";
            case "HIGH":
                return "PREPARE_WITHDRAWAL";
            case "CAUTION":
                return "CONTINUE_WITH_MONITORING";
            default:
                return "NO_EMERGENCY_ACTION";
        }
    }

    private List<Map<String, String>> generateAlerts(
            double oxygen,
            double co,
            double co2,
            double methane,
            double temperature) {

        List<Map<String, String>> alerts = new ArrayList<>();

        if (oxygen < 18.0) {
            alerts.add(alert(
                    "LOW_OXYGEN",
                    "CRITICAL",
                    "Oxygen level is dangerously low.",
                    "Stop entry and move the robot to a safer zone."
            ));
        }

        if (co >= 100.0) {
            alerts.add(alert(
                    "HIGH_CO",
                    "CRITICAL",
                    "Carbon monoxide level is extremely high.",
                    "Do not enter. Withdraw the robot immediately."
            ));
        } else if (co >= 50.0) {
            alerts.add(alert(
                    "ELEVATED_CO",
                    "HIGH",
                    "Carbon monoxide level is elevated.",
                    "Reduce exposure and monitor continuously."
            ));
        }

        if (co2 >= 2000.0) {
            alerts.add(alert(
                    "HIGH_CO2",
                    "HIGH",
                    "Carbon dioxide concentration is dangerously high.",
                    "Improve ventilation and avoid human entry."
            ));
        }

        if (methane >= 4.0) {
            alerts.add(alert(
                    "EXTREME_METHANE",
                    "CRITICAL",
                    "Methane concentration has reached an extreme level.",
                    "Immediately stop the mission and withdraw the robot."
            ));
        } else if (methane >= 2.0) {
            alerts.add(alert(
                    "HIGH_METHANE",
                    "HIGH",
                    "Methane concentration is dangerously elevated.",
                    "Do not enter this zone until the gas level decreases."
            ));
        } else if (methane >= 1.0) {
            alerts.add(alert(
                    "ELEVATED_METHANE",
                    "WARNING",
                    "Methane concentration is increasing.",
                    "Continue monitoring and proceed cautiously."
            ));
        }

        if (temperature >= 45.0) {
            alerts.add(alert(
                    "EXTREME_TEMPERATURE",
                    "CRITICAL",
                    "Environmental temperature is extremely high.",
                    "Withdraw the robot and avoid human entry."
            ));
        } else if (temperature >= 40.0) {
            alerts.add(alert(
                    "HIGH_TEMPERATURE",
                    "HIGH",
                    "Environmental temperature is dangerously high.",
                    "Monitor continuously and consider mission withdrawal."
            ));
        }

        return alerts;
    }

    private Map<String, String> alert(
            String type,
            String severity,
            String message,
            String action) {

        Map<String, String> alert = new LinkedHashMap<>();

        alert.put("type", type);
        alert.put("severity", severity);
        alert.put("message", message);
        alert.put("recommendedAction", action);

        return alert;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
