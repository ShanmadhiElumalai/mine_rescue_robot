package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotLocationSimulationService;
import com.rescuemission.backend.entity.RobotLocation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simulation/robot-location")
public class RobotLocationSimulationController {

    private final RobotLocationSimulationService service;

    public RobotLocationSimulationController(
            RobotLocationSimulationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<RobotLocation> simulateLocation(
            @RequestParam Long robotId,
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Double depth,
            @RequestParam Double direction) {

        return ResponseEntity.ok(
                service.simulateLocation(
                        robotId,
                        latitude,
                        longitude,
                        depth,
                        direction
                )
        );
    }

    @GetMapping("/{robotId}/path")
    public ResponseEntity<List<RobotLocation>> getRobotPath(
            @PathVariable Long robotId) {

        return ResponseEntity.ok(
                service.getRobotPath(robotId)
        );
    }
}
