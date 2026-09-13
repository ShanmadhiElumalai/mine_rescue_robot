package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.HumanDetectionSimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/simulation/detection")
public class HumanDetectionSimulationController {

    private final HumanDetectionSimulationService service;

    public HumanDetectionSimulationController(
            HumanDetectionSimulationService service) {
        this.service = service;
    }

    @GetMapping("/humans")
    public ResponseEntity<List<Map<String, Object>>> getHumanDetections() {

        return ResponseEntity.ok(
                service.generateDetections()
        );
    }
}
