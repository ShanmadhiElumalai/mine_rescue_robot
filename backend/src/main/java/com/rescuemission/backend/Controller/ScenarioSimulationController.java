package com.rescuemission.backend.Controller;

import com.rescuemission.backend.DTO.SimulationScenarioRequest;
import com.rescuemission.backend.Service.SafetyEngineService;
import com.rescuemission.backend.Service.ScenarioSimulationService;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/simulation")
public class ScenarioSimulationController {

    private final ScenarioSimulationService scenarioSimulationService;
    private final SafetyEngineService safetyEngineService;

    public ScenarioSimulationController(
            ScenarioSimulationService scenarioSimulationService,
            SafetyEngineService safetyEngineService) {

        this.scenarioSimulationService = scenarioSimulationService;
        this.safetyEngineService = safetyEngineService;
    }

    @PostMapping("/scenario")
    public Map<String, Object> simulateScenario(
            @RequestBody SimulationScenarioRequest request) {

        Map<String, Double> sensors =
                scenarioSimulationService.generateScenario(
                        request.getScenario()
                );

        Map<String, Object> safety =
                safetyEngineService.evaluate(sensors);

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("scenario", request.getScenario());
        response.put("sensors", sensors);
        response.put("safety", safety);

        return response;
    }
}
