package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.DetectionService;
import com.rescuemission.backend.entity.Detection;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class DetectionController {

    private final DetectionService service;

    public DetectionController(DetectionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Detection> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Detection> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Detection create(@RequestBody Detection entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public Detection update(
            @PathVariable Long id,
            @RequestBody Detection entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
