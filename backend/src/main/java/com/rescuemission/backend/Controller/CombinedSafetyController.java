package com.rescuemission.backend.Controller;

import com.rescuemission.backend.DTO.RobotHealthScenarioRequest;
import com.rescuemission.backend.DTO.SimulationScenarioRequest;
import com.rescuemission.backend.Service.CombinedSafetyService;
import com.rescuemission.backend.Service.RobotHealthScenarioService;
import com.rescuemission.backend.Service.SafetyEngineService;
import com.rescuemission.backend.Service.ScenarioSimulationService;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/safety")
public class CombinedSafetyController {

    private final ScenarioSimulationService scenarioSimulationService;
    private final SafetyEngineService safetyEngineService;
    private final RobotHealthScenarioService robotHealthScenarioService;
    private final CombinedSafetyService combinedSafetyService;

    public CombinedSafetyController(
            ScenarioSimulationService scenarioSimulationService,
            SafetyEngineService safetyEngineService,
            RobotHealthScenarioService robotHealthScenarioService,
            CombinedSafetyService combinedSafetyService) {

        this.scenarioSimulationService = scenarioSimulationService;
        this.safetyEngineService = safetyEngineService;
        this.robotHealthScenarioService = robotHealthScenarioService;
        this.combinedSafetyService = combinedSafetyService;
    }

    @PostMapping("/combined")
    public Map<String, Object> evaluateCombinedSafety(
            @RequestBody Map<String, String> request) {

        String sensorScenario = request.get("sensorScenario");
        String robotScenario = request.get("robotScenario");

        Map<String, Double> sensors =
                scenarioSimulationService.generateScenario(
                        sensorScenario
                );

        Map<String, Object> safety =
                safetyEngineService.evaluate(sensors);

        Map<String, Object> robotHealth =
                robotHealthScenarioService.generateScenario(
                        robotScenario
                );

        Map<String, Object> combined =
                combinedSafetyService.evaluate(
                        safety,
                        robotHealth
                );

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("sensorScenario", sensorScenario);
        response.put("robotScenario", robotScenario);
        response.put("sensors", sensors);
        response.put("safety", safety);
        response.put("robotHealth", robotHealth);
        response.put("combinedSafety", combined);

        return response;
    }
}
