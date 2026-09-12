package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SafetyEngineService;
import com.rescuemission.backend.Service.SensorSimulationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/safety")
public class SafetyController {

    private final SensorSimulationService sensorSimulationService;
    private final SafetyEngineService safetyEngineService;

    public SafetyController(
            SensorSimulationService sensorSimulationService,
            SafetyEngineService safetyEngineService) {

        this.sensorSimulationService = sensorSimulationService;
        this.safetyEngineService = safetyEngineService;
    }

    @GetMapping("/evaluate")
    public Map<String, Object> evaluateSafety() {

        Map<String, Double> sensors =
                sensorSimulationService.generateSensorData();

        Map<String, Object> safety =
                safetyEngineService.evaluate(sensors);

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("sensors", sensors);
        response.put("safety", safety);

        return response;
    }
}
