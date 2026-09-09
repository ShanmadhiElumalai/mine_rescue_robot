package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.AlertService;
import com.rescuemission.backend.entity.Alert;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class AlertController {

    private final AlertService service;

    public AlertController(AlertService service) {
        this.service = service;
    }

    @GetMapping
    public List<Alert> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alert create(@RequestBody Alert entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public Alert update(
            @PathVariable Long id,
            @RequestBody Alert entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
