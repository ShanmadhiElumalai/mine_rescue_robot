package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotHealthService;
import com.rescuemission.backend.entity.RobotHealth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/robot-health")
@RequiredArgsConstructor
public class RobotHealthController {

    private final RobotHealthService service;

    @GetMapping
    public ResponseEntity<List<RobotHealth>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotHealth> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<RobotHealth> create(@RequestBody RobotHealth health) {
        return ResponseEntity.ok(service.save(health));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RobotHealth> update(
            @PathVariable Long id,
            @RequestBody RobotHealth health) {

        RobotHealth existing = service.getById(id);

        existing.setBatteryLevel(health.getBatteryLevel());
        existing.setTemperature(health.getTemperature());
        existing.setHealthStatus(health.getHealthStatus());
        existing.setComponentType(health.getComponentType());
        existing.setHealthScore(health.getHealthScore());
        existing.setFailureDetected(health.getFailureDetected());
        existing.setFailureDescription(health.getFailureDescription());
        existing.setRobot(health.getRobot());
        existing.setMission(health.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}