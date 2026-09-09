package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionLogService;
import com.rescuemission.backend.entity.MissionLog;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class MissionLogController {

    private final MissionLogService service;

    public MissionLogController(MissionLogService service) {
        this.service = service;
    }

    @GetMapping
    public List<MissionLog> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissionLog> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MissionLog create(@RequestBody MissionLog entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public MissionLog update(
            @PathVariable Long id,
            @RequestBody MissionLog entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
