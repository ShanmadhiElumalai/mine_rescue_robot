package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.AlertService;
import com.rescuemission.backend.entity.Alert;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService service;

    @GetMapping
    public ResponseEntity<List<Alert>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Alert> create(@RequestBody Alert alert) {
        return ResponseEntity.ok(service.save(alert));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alert> update(
            @PathVariable Long id,
            @RequestBody Alert alert) {

        Alert existing = service.getById(id);

        existing.setAlertType(alert.getAlertType());
        existing.setSeverity(alert.getSeverity());
        existing.setMessage(alert.getMessage());
        existing.setSource(alert.getSource());
        existing.setRecommendedAction(alert.getRecommendedAction());
        existing.setStatus(alert.getStatus());
        existing.setResolvedAt(alert.getResolvedAt());
        existing.setRobot(alert.getRobot());
        existing.setMission(alert.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}