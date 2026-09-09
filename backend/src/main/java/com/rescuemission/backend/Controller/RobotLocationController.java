package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotLocationService;
import com.rescuemission.backend.entity.RobotLocation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class RobotLocationController {

    private final RobotLocationService service;

    public RobotLocationController(RobotLocationService service) {
        this.service = service;
    }

    @GetMapping
    public List<RobotLocation> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotLocation> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RobotLocation create(@RequestBody RobotLocation entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public RobotLocation update(
            @PathVariable Long id,
            @RequestBody RobotLocation entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
