package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionService;
import com.rescuemission.backend.entity.Mission;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService service;

    @GetMapping
    public ResponseEntity<List<Mission>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mission> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Mission> create(@RequestBody Mission mission) {
        return ResponseEntity.ok(service.save(mission));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mission> update(
            @PathVariable Long id,
            @RequestBody Mission mission) {

        Mission existing = service.getById(id);

        existing.setName(mission.getName());
        existing.setDescription(mission.getDescription());
        existing.setStatus(mission.getStatus());
        existing.setStartTime(mission.getStartTime());
        existing.setEndTime(mission.getEndTime());
        existing.setRobot(mission.getRobot());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}