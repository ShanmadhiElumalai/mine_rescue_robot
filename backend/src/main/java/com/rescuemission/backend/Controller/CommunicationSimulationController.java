package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.CommunicationSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/simulation/communication")
public class CommunicationSimulationController {

    private final CommunicationSimulationService service;

    public CommunicationSimulationController(
            CommunicationSimulationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCommunicationStatus(
            @RequestParam Double depth) {

        return ResponseEntity.ok(
                service.simulateCommunication(depth)
        );
    }
}
