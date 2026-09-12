package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SearchZoneService;
import com.rescuemission.backend.entity.SearchZone;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search-zones")
@RequiredArgsConstructor
public class SearchZoneController {

    private final SearchZoneService service;

    @GetMapping
    public ResponseEntity<List<SearchZone>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchZone> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<SearchZone> create(
            @RequestBody SearchZone zone) {
        return ResponseEntity.ok(service.save(zone));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SearchZone> update(
            @PathVariable Long id,
            @RequestBody SearchZone zone) {

        SearchZone existing = service.getById(id);

        existing.setMission(zone.getMission());
        existing.setZoneName(zone.getZoneName());
        existing.setDescription(zone.getDescription());
        existing.setPriority(zone.getPriority());
        existing.setStatus(zone.getStatus());
        existing.setTargetCoveragePercentage(
                zone.getTargetCoveragePercentage());
        existing.setBoundaryCoordinates(
                zone.getBoundaryCoordinates());
        existing.setStartedAt(zone.getStartedAt());
        existing.setCompletedAt(zone.getCompletedAt());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}