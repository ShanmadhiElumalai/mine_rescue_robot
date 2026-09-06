package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotService;
import com.rescuemission.backend.entity.Robot;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/robots")
public class RobotController {

    private final RobotService robotService;

    public RobotController(RobotService robotService) {
        this.robotService = robotService;
    }

    @GetMapping
    public List<Robot> getAllRobots() {
        return robotService.getAllRobots();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Robot> getRobotById(@PathVariable Long id) {
        return robotService.getRobotById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Robot createRobot(@RequestBody Robot robot) {
        return robotService.createRobot(robot);
    }

    @PutMapping("/{id}")
    public Robot updateRobot(@PathVariable Long id, @RequestBody Robot robot) {
        return robotService.updateRobot(id, robot);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRobot(@PathVariable Long id) {
        robotService.deleteRobot(id);
        return ResponseEntity.noContent().build();
    }
}
