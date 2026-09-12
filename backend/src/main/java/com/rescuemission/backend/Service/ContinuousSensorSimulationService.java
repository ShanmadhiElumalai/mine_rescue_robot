package com.rescuemission.backend.Service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContinuousSensorSimulationService {

    private final SensorSimulationService sensorSimulationService;
    private final SafetyEngineService safetyEngineService;

    private Map<String, Object> latestReading =
            new LinkedHashMap<>();

    private String previousAlertSignature = "";

    public ContinuousSensorSimulationService(
            SensorSimulationService sensorSimulationService,
            SafetyEngineService safetyEngineService) {

        this.sensorSimulationService = sensorSimulationService;
        this.safetyEngineService = safetyEngineService;

        generateReading();
    }

    @Scheduled(fixedRate = 5000)
    public synchronized void generateReading() {

        Map<String, Double> sensors =
                sensorSimulationService.generateSensorData();

        Map<String, Object> safety =
                safetyEngineService.evaluate(sensors);

        Map<String, Object> reading =
                new LinkedHashMap<>();

        reading.put("sensors", sensors);
        reading.put("safety", safety);

        List<Map<String, String>> alerts =
                getAlerts(safety);

        String currentAlertSignature =
                createAlertSignature(alerts);

        boolean alertTriggered =
                !alerts.isEmpty()
                        && !currentAlertSignature.equals(
                                previousAlertSignature
                        );

        boolean criticalAlert =
                hasCriticalAlert(alerts);

        String highestSeverity =
                getHighestSeverity(alerts);

        String alertMessage =
                getAlertMessage(alerts);

        reading.put("alertTriggered", alertTriggered);
        reading.put("criticalAlert", criticalAlert);
        reading.put("alertCount", alerts.size());
        reading.put("highestAlertSeverity", highestSeverity);
        reading.put("alertMessage", alertMessage);

        latestReading = reading;

        previousAlertSignature =
                currentAlertSignature;
    }

    public synchronized Map<String, Object> getLatestReading() {
        return new LinkedHashMap<>(latestReading);
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, String>> getAlerts(
            Map<String, Object> safety) {

        Object value = safety.get("alerts");

        if (value instanceof List<?>) {
            return (List<Map<String, String>>) value;
        }

        return new ArrayList<>();
    }

    private String createAlertSignature(
            List<Map<String, String>> alerts) {

        StringBuilder signature =
                new StringBuilder();

        for (Map<String, String> alert : alerts) {

            signature.append(
                    alert.get("type")
            );

            signature.append(":");

            signature.append(
                    alert.get("severity")
            );

            signature.append("|");
        }

        return signature.toString();
    }

    private boolean hasCriticalAlert(
            List<Map<String, String>> alerts) {

        for (Map<String, String> alert : alerts) {

            if ("CRITICAL".equals(
                    alert.get("severity"))) {

                return true;
            }
        }

        return false;
    }

    private String getHighestSeverity(
            List<Map<String, String>> alerts) {

        boolean hasCritical = false;
        boolean hasHigh = false;
        boolean hasWarning = false;

        for (Map<String, String> alert : alerts) {

            String severity =
                    alert.get("severity");

            if ("CRITICAL".equals(severity)) {
                hasCritical = true;
            } else if ("HIGH".equals(severity)) {
                hasHigh = true;
            } else if ("WARNING".equals(severity)) {
                hasWarning = true;
            }
        }

        if (hasCritical) {
            return "CRITICAL";
        }

        if (hasHigh) {
            return "HIGH";
        }

        if (hasWarning) {
            return "WARNING";
        }

        return "NONE";
    }

    private String getAlertMessage(
            List<Map<String, String>> alerts) {

        if (alerts.isEmpty()) {
            return "No active safety alerts.";
        }

        Map<String, String> highestAlert =
                alerts.get(0);

        int highestRank =
                getSeverityRank(
                        highestAlert.get("severity")
                );

        for (Map<String, String> alert : alerts) {

            int rank =
                    getSeverityRank(
                            alert.get("severity")
                    );

            if (rank > highestRank) {
                highestRank = rank;
                highestAlert = alert;
            }
        }

        return highestAlert.get("message");
    }

    private int getSeverityRank(
            String severity) {

        if ("CRITICAL".equals(severity)) {
            return 3;
        }

        if ("HIGH".equals(severity)) {
            return 2;
        }

        if ("WARNING".equals(severity)) {
            return 1;
        }

        return 0;
    }
}
