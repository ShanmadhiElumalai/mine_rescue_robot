package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotHealthService;
import com.rescuemission.backend.entity.RobotHealth;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class RobotHealthController {

    private final RobotHealthService service;

    public RobotHealthController(RobotHealthService service) {
        this.service = service;
    }

    @GetMapping
    public List<RobotHealth> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotHealth> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RobotHealth create(@RequestBody RobotHealth entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public RobotHealth update(
            @PathVariable Long id,
            @RequestBody RobotHealth entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
