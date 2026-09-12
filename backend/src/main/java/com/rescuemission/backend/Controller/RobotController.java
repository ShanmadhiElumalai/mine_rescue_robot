package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotService;
import com.rescuemission.backend.entity.Robot;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/robots")
@RequiredArgsConstructor
public class RobotController {

    private final RobotService robotService;

    @GetMapping
    public ResponseEntity<List<Robot>> getAll() {
        return ResponseEntity.ok(robotService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Robot> getById(@PathVariable Long id) {
        return ResponseEntity.ok(robotService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Robot> create(@RequestBody Robot robot) {
        return ResponseEntity.ok(robotService.save(robot));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Robot> update(
            @PathVariable Long id,
            @RequestBody Robot robot) {

        Robot existing = robotService.getById(id);

        existing.setName(robot.getName());
        existing.setModel(robot.getModel());
        existing.setStatus(robot.getStatus());
        existing.setBatteryLevel(robot.getBatteryLevel());

        return ResponseEntity.ok(robotService.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        robotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}