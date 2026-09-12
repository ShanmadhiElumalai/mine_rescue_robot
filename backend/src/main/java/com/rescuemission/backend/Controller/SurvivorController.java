package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SurvivorService;
import com.rescuemission.backend.entity.Survivor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/survivors")
@RequiredArgsConstructor
public class SurvivorController {

    private final SurvivorService service;

    @GetMapping
    public ResponseEntity<List<Survivor>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survivor> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Survivor> create(
            @RequestBody Survivor survivor) {
        return ResponseEntity.ok(service.save(survivor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survivor> update(
            @PathVariable Long id,
            @RequestBody Survivor survivor) {

        Survivor existing = service.getById(id);

        existing.setDetection(survivor.getDetection());
        existing.setMission(survivor.getMission());
        existing.setLatitude(survivor.getLatitude());
        existing.setLongitude(survivor.getLongitude());
        existing.setCondition(survivor.getCondition());
        existing.setConditionConfidence(survivor.getConditionConfidence());
        existing.setPriorityScore(survivor.getPriorityScore());
        existing.setStatus(survivor.getStatus());
        existing.setLastUpdatedAt(survivor.getLastUpdatedAt());
        existing.setRescuedAt(survivor.getRescuedAt());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}