package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class HumanDetectionSimulationService {

    public List<Map<String, Object>> generateDetections() {

        List<Map<String, Object>> detections = new ArrayList<>();

        Map<String, Object> detection1 = new LinkedHashMap<>();
        detection1.put("detectionType", "HUMAN");
        detection1.put("confidence", 96.5);
        detection1.put("severity", "CRITICAL");
        detection1.put("latitude", 13.1208);
        detection1.put("longitude", 80.1567);
        detection1.put("bodyTemperature", 36.8);
        detection1.put("environmentTemperature", 29.4);
        detection1.put("distance", 18.5);
        detection1.put("confirmationStatus", "CONFIRMED");
        detection1.put("sensorCount", 3);
        detection1.put("description", "Thermal signature indicates a possible survivor");
        detection1.put("detectedAt", LocalDateTime.now().toString());

        detections.add(detection1);

        Map<String, Object> detection2 = new LinkedHashMap<>();
        detection2.put("detectionType", "HUMAN");
        detection2.put("confidence", 89.2);
        detection2.put("severity", "HIGH");
        detection2.put("latitude", 13.1215);
        detection2.put("longitude", 80.1574);
        detection2.put("bodyTemperature", 35.9);
        detection2.put("environmentTemperature", 30.1);
        detection2.put("distance", 32.7);
        detection2.put("confirmationStatus", "PENDING");
        detection2.put("sensorCount", 2);
        detection2.put("description", "Human thermal signature detected");
        detection2.put("detectedAt", LocalDateTime.now().toString());

        detections.add(detection2);

        return detections;
    }
}
