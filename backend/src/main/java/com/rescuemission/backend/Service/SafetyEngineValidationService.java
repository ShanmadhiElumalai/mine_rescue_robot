package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class SafetyEngineValidationService {

    private final SensorValidationService sensorValidationService;

    public SafetyEngineValidationService(
            SensorValidationService sensorValidationService) {
        this.sensorValidationService = sensorValidationService;
    }

    public void validateSensors(Map<String, Double> sensors) {

        Map<String, String> errors =
                sensorValidationService.validate(sensors);

        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(
                    buildErrorMessage(errors)
            );
        }
    }

    private String buildErrorMessage(
            Map<String, String> errors) {

        StringBuilder message =
                new StringBuilder("Invalid sensor data: ");

        boolean first = true;

        for (Map.Entry<String, String> entry :
                errors.entrySet()) {

            if (!first) {
                message.append("; ");
            }

            message.append(entry.getKey())
                   .append(" - ")
                   .append(entry.getValue());

            first = false;
        }

        return message.toString();
    }
}
