package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.GasHazardSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/simulation/gas-hazard")
public class GasHazardSimulationController {

    private final GasHazardSimulationService service;

    public GasHazardSimulationController(
            GasHazardSimulationService service) {
        this.service = service;
    }

    @GetMapping("/map")
    public ResponseEntity<List<Map<String, Object>>> getHazardMap() {

        return ResponseEntity.ok(
                service.generateHazardMap()
        );
    }
}
