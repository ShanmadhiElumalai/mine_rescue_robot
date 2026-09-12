package com.rescuemission.backend.Controller;

import com.rescuemission.backend.DTO.RobotHealthScenarioRequest;
import com.rescuemission.backend.Service.RobotHealthScenarioService;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/robot")
public class RobotHealthScenarioController {

    private final RobotHealthScenarioService robotHealthScenarioService;

    public RobotHealthScenarioController(
            RobotHealthScenarioService robotHealthScenarioService) {

        this.robotHealthScenarioService = robotHealthScenarioService;
    }

    @PostMapping("/health-scenario")
    public Map<String, Object> simulateHealthScenario(
            @RequestBody RobotHealthScenarioRequest request) {

        Map<String, Object> health =
                robotHealthScenarioService.generateScenario(
                        request.getScenario()
                );

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("scenario", request.getScenario());
        response.put("health", health);

        return response;
    }
}
