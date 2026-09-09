package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SensorReadingService;
import com.rescuemission.backend.entity.SensorReading;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class SensorReadingController {

    private final SensorReadingService service;

    public SensorReadingController(SensorReadingService service) {
        this.service = service;
    }

    @GetMapping
    public List<SensorReading> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorReading> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SensorReading create(@RequestBody SensorReading entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public SensorReading update(
            @PathVariable Long id,
            @RequestBody SensorReading entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
