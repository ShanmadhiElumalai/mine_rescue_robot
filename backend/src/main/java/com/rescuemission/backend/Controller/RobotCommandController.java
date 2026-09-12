package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotCommandService;
import com.rescuemission.backend.entity.RobotCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/robot-commands")
@RequiredArgsConstructor
public class RobotCommandController {

    private final RobotCommandService service;

    @GetMapping
    public ResponseEntity<List<RobotCommand>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotCommand> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<RobotCommand> create(@RequestBody RobotCommand command) {
        return ResponseEntity.ok(service.save(command));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RobotCommand> update(
            @PathVariable Long id,
            @RequestBody RobotCommand command) {

        RobotCommand existing = service.getById(id);

        existing.setCommandType(command.getCommandType());
        existing.setCommandValue(command.getCommandValue());
        existing.setSource(command.getSource());
        existing.setApprovalStatus(command.getApprovalStatus());
        existing.setStatus(command.getStatus());
        existing.setExecutedAt(command.getExecutedAt());
        existing.setRobot(command.getRobot());
        existing.setMission(command.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}