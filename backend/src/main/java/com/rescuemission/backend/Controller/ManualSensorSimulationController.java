package com.rescuemission.backend.Controller;

import com.rescuemission.backend.DTO.ManualSensorRequest;
import com.rescuemission.backend.Service.SafetyEngineService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/simulation")
public class ManualSensorSimulationController {

    private final SafetyEngineService safetyEngineService;

    public ManualSensorSimulationController(
            SafetyEngineService safetyEngineService) {
        this.safetyEngineService = safetyEngineService;
    }

    @PostMapping("/sensors/manual")
    public Map<String, Object> simulateManualSensors(
            @RequestBody ManualSensorRequest request) {

        Map<String, Double> sensors = new LinkedHashMap<>();

        sensors.put("oxygen", request.getOxygen());
        sensors.put("co", request.getCo());
        sensors.put("co2", request.getCo2());
        sensors.put("methane", request.getMethane());
        sensors.put("temperature", request.getTemperature());
        sensors.put("humidity", request.getHumidity());

        Map<String, Object> safety =
                safetyEngineService.evaluate(sensors);

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("sensors", sensors);
        response.put("safety", safety);

        return response;
    }
}
