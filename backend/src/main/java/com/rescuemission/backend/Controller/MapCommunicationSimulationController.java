package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MapCommunicationSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/simulation/robot-status")
public class MapCommunicationSimulationController {

    private final MapCommunicationSimulationService service;

    public MapCommunicationSimulationController(
            MapCommunicationSimulationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getRobotStatus(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Double depth,
            @RequestParam Double direction) {

        return ResponseEntity.ok(
                service.simulateRobotStatus(
                        latitude,
                        longitude,
                        depth,
                        direction
                )
        );
    }
}
