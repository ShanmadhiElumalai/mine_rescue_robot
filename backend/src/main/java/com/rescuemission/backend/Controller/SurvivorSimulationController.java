package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SurvivorSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/simulation/survivor")
public class SurvivorSimulationController {

    private final SurvivorSimulationService service;

    public SurvivorSimulationController(
            SurvivorSimulationService service) {
        this.service = service;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getSurvivorStatus(
            @RequestParam String status,
            @RequestParam String condition,
            @RequestParam Double conditionConfidence,
            @RequestParam Double priorityScore) {

        return ResponseEntity.ok(
                service.simulateSurvivorStatus(
                        status,
                        condition,
                        conditionConfidence,
                        priorityScore
                )
        );
    }
}
