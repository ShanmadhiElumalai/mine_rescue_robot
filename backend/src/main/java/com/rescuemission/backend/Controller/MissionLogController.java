package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionLogService;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mission-logs")
@RequiredArgsConstructor
public class MissionLogController {

    private final MissionLogService service;

    @GetMapping
    public ResponseEntity<List<MissionLog>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissionLog> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<MissionLog> create(@RequestBody MissionLog log) {
        return ResponseEntity.ok(service.save(log));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MissionLog> update(
            @PathVariable Long id,
            @RequestBody MissionLog log) {

        MissionLog existing = service.getById(id);

        existing.setLogType(log.getLogType());
        existing.setMessage(log.getMessage());
        existing.setRobot(log.getRobot());
        existing.setMission(log.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}