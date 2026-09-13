package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CommunicationSimulationService {

    public Map<String, Object> simulateCommunication(Double depth) {

        if (depth == null || depth < 0) {
            throw new IllegalArgumentException(
                    "Depth must be a non-negative value"
            );
        }

        double communicationPercentage;
        double signalStrength;
        double latency;
        String connectionQuality;
        String predictedStatus;
        boolean earlyWarning;
        boolean communicationFault;

        if (depth < 100) {
            communicationPercentage = 95.0;
            signalStrength = -45.0;
            latency = 80.0;
            connectionQuality = "EXCELLENT";
            predictedStatus = "STABLE";
            earlyWarning = false;
            communicationFault = false;

        } else if (depth < 200) {
            communicationPercentage = 80.0;
            signalStrength = -58.0;
            latency = 120.0;
            connectionQuality = "GOOD";
            predictedStatus = "STABLE";
            earlyWarning = false;
            communicationFault = false;

        } else if (depth < 300) {
            communicationPercentage = 65.0;
            signalStrength = -68.0;
            latency = 180.0;
            connectionQuality = "MODERATE";
            predictedStatus = "DEGRADING";
            earlyWarning = true;
            communicationFault = false;

        } else if (depth < 400) {
            communicationPercentage = 45.0;
            signalStrength = -78.0;
            latency = 280.0;
            connectionQuality = "WEAK";
            predictedStatus = "HIGH_RISK";
            earlyWarning = true;
            communicationFault = false;

        } else {
            communicationPercentage = 20.0;
            signalStrength = -90.0;
            latency = 500.0;
            connectionQuality = "CRITICAL";
            predictedStatus = "CONNECTION_LOSS_IMMINENT";
            earlyWarning = true;
            communicationFault = true;
        }

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("depth", depth);
        result.put("communicationPercentage", communicationPercentage);
        result.put("signalStrength", signalStrength);
        result.put("latency", latency);
        result.put("connectionQuality", connectionQuality);
        result.put("predictedStatus", predictedStatus);
        result.put("predictionConfidence", 94.0);
        result.put("earlyWarning", earlyWarning);
        result.put("communicationFault", communicationFault);

        if (communicationFault) {
            result.put(
                    "warningMessage",
                    "Communication loss is imminent. Return robot to a safer depth."
            );
        } else if (earlyWarning) {
            result.put(
                    "warningMessage",
                    "Communication signal is degrading with increasing depth."
            );
        } else {
            result.put(
                    "warningMessage",
                    "Communication link is stable."
            );
        }

        return result;
    }
}
