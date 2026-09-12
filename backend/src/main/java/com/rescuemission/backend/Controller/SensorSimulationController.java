package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SensorSimulationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/simulation")
public class SensorSimulationController {

    private final SensorSimulationService sensorSimulationService;

    public SensorSimulationController(SensorSimulationService sensorSimulationService) {
        this.sensorSimulationService = sensorSimulationService;
    }

    @GetMapping("/sensors")
    public Map<String, Double> generateSensorData() {
        return sensorSimulationService.generateSensorData();
    }
}
