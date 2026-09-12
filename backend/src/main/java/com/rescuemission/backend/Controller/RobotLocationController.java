package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotLocationService;
import com.rescuemission.backend.entity.RobotLocation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/robot-locations")
@RequiredArgsConstructor
public class RobotLocationController {

    private final RobotLocationService service;

    @GetMapping
    public ResponseEntity<List<RobotLocation>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotLocation> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<RobotLocation> create(
            @RequestBody RobotLocation location) {
        return ResponseEntity.ok(service.save(location));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RobotLocation> update(
            @PathVariable Long id,
            @RequestBody RobotLocation location) {

        RobotLocation existing = service.getById(id);

        existing.setLatitude(location.getLatitude());
        existing.setLongitude(location.getLongitude());
        existing.setDepth(location.getDepth());
        existing.setDirection(location.getDirection());
        existing.setRobot(location.getRobot());
        existing.setMission(location.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}