package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class SurvivorSimulationService {

    public Map<String, Object> simulateSurvivorStatus(
            String status,
            String condition,
            Double conditionConfidence,
            Double priorityScore) {

        if (status == null || condition == null) {
            throw new IllegalArgumentException(
                    "Status and condition are required"
            );
        }

        if (conditionConfidence == null ||
                conditionConfidence < 0 ||
                conditionConfidence > 100) {

            throw new IllegalArgumentException(
                    "Condition confidence must be between 0 and 100"
            );
        }

        if (priorityScore == null ||
                priorityScore < 0 ||
                priorityScore > 100) {

            throw new IllegalArgumentException(
                    "Priority score must be between 0 and 100"
            );
        }

        Map<String, Object> result = new LinkedHashMap<>();

        result.put("status", status);
        result.put("condition", condition);
        result.put("conditionConfidence", conditionConfidence);
        result.put("priorityScore", priorityScore);
        result.put("lastUpdatedAt", LocalDateTime.now().toString());

        if ("RESCUED".equalsIgnoreCase(status)) {
            result.put("rescueMessage", "Survivor successfully rescued.");
            result.put("rescued", true);
        } else if ("APPROACHING".equalsIgnoreCase(status)) {
            result.put("rescueMessage", "Robot is approaching the detected survivor.");
            result.put("rescued", false);
        } else {
            result.put("rescueMessage", "Survivor detected and awaiting rescue.");
            result.put("rescued", false);
        }

        return result;
    }
}
