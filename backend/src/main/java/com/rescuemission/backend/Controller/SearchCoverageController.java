package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SearchCoverageService;
import com.rescuemission.backend.entity.SearchCoverage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search-coverage")
@RequiredArgsConstructor
public class SearchCoverageController {

    private final SearchCoverageService service;

    @GetMapping
    public ResponseEntity<List<SearchCoverage>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchCoverage> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<SearchCoverage> create(
            @RequestBody SearchCoverage coverage) {
        return ResponseEntity.ok(service.save(coverage));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SearchCoverage> update(
            @PathVariable Long id,
            @RequestBody SearchCoverage coverage) {

        SearchCoverage existing = service.getById(id);

        existing.setSearchZone(coverage.getSearchZone());
        existing.setCoveragePercentage(
                coverage.getCoveragePercentage());
        existing.setSearchPass(coverage.getSearchPass());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}