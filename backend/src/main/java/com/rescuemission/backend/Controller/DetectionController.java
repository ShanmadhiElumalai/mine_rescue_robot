package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.DetectionService;
import com.rescuemission.backend.entity.Detection;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detections")
@RequiredArgsConstructor
public class DetectionController {

    private final DetectionService service;

    @GetMapping
    public ResponseEntity<List<Detection>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Detection> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Detection> create(@RequestBody Detection detection) {
        return ResponseEntity.ok(service.save(detection));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Detection> update(
            @PathVariable Long id,
            @RequestBody Detection detection) {

        Detection existing = service.getById(id);

        existing.setDetectionType(detection.getDetectionType());
        existing.setConfidence(detection.getConfidence());
        existing.setSeverity(detection.getSeverity());
        existing.setLatitude(detection.getLatitude());
        existing.setLongitude(detection.getLongitude());
        existing.setBodyTemperature(detection.getBodyTemperature());
        existing.setEnvironmentTemperature(detection.getEnvironmentTemperature());
        existing.setDistance(detection.getDistance());
        existing.setConfirmationStatus(detection.getConfirmationStatus());
        existing.setSensorCount(detection.getSensorCount());
        existing.setDescription(detection.getDescription());
        existing.setRobot(detection.getRobot());
        existing.setMission(detection.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}