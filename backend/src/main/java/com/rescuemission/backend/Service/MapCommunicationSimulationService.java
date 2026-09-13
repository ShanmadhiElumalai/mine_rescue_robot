package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class MapCommunicationSimulationService {

    private final CommunicationSimulationService communicationService;

    public MapCommunicationSimulationService(
            CommunicationSimulationService communicationService) {
        this.communicationService = communicationService;
    }

    public Map<String, Object> simulateRobotStatus(
            Double latitude,
            Double longitude,
            Double depth,
            Double direction) {

        if (latitude == null || longitude == null ||
                depth == null || direction == null) {

            throw new IllegalArgumentException(
                    "Latitude, longitude, depth and direction are required"
            );
        }

        Map<String, Object> communication =
                communicationService.simulateCommunication(depth);

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("latitude", latitude);
        result.put("longitude", longitude);
        result.put("depth", depth);
        result.put("direction", direction);

        result.put("communicationPercentage",
                communication.get("communicationPercentage"));

        result.put("signalStrength",
                communication.get("signalStrength"));

        result.put("latency",
                communication.get("latency"));

        result.put("connectionQuality",
                communication.get("connectionQuality"));

        result.put("predictedStatus",
                communication.get("predictedStatus"));

        result.put("predictionConfidence",
                communication.get("predictionConfidence"));

        result.put("earlyWarning",
                communication.get("earlyWarning"));

        result.put("communicationFault",
                communication.get("communicationFault"));

        result.put("warningMessage",
                communication.get("warningMessage"));

        return result;
    }
}
