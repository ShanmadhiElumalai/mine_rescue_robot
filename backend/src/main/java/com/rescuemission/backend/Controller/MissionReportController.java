package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionReportService;
import com.rescuemission.backend.entity.MissionReport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class MissionReportController {

    private final MissionReportService service;

    public MissionReportController(MissionReportService service) {
        this.service = service;
    }

    @GetMapping
    public List<MissionReport> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissionReport> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MissionReport create(@RequestBody MissionReport entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public MissionReport update(
            @PathVariable Long id,
            @RequestBody MissionReport entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
