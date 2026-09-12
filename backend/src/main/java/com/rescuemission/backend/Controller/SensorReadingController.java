package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SensorReadingService;
import com.rescuemission.backend.entity.SensorReading;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensor-readings")
@RequiredArgsConstructor
public class SensorReadingController {

    private final SensorReadingService service;

    @GetMapping
    public ResponseEntity<List<SensorReading>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorReading> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<SensorReading> create(
            @RequestBody SensorReading reading) {
        return ResponseEntity.ok(service.save(reading));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorReading> update(
            @PathVariable Long id,
            @RequestBody SensorReading reading) {

        SensorReading existing = service.getById(id);

        existing.setSensorType(reading.getSensorType());
        existing.setValue(reading.getValue());
        existing.setUnit(reading.getUnit());
        existing.setConfidence(reading.getConfidence());
        existing.setRobot(reading.getRobot());
        existing.setMission(reading.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}