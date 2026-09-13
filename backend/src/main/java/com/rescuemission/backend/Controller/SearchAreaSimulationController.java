package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SearchAreaSimulationService;
import com.rescuemission.backend.entity.SearchCoverage;
import com.rescuemission.backend.entity.SearchZone;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simulation/search-area")
public class SearchAreaSimulationController {

    private final SearchAreaSimulationService service;

    public SearchAreaSimulationController(
            SearchAreaSimulationService service) {
        this.service = service;
    }

    @PostMapping("/zone")
    public ResponseEntity<SearchZone> createZone(
            @RequestParam Long robotId,
            @RequestParam Long missionId,
            @RequestParam String zoneName,
            @RequestParam String description,
            @RequestParam Integer priority,
            @RequestParam Double targetCoveragePercentage) {

        return ResponseEntity.ok(
                service.createZone(
                        robotId,
                        missionId,
                        zoneName,
                        description,
                        priority,
                        targetCoveragePercentage
                )
        );
    }

    @PostMapping("/coverage")
    public ResponseEntity<SearchCoverage> updateCoverage(
            @RequestParam Long zoneId,
            @RequestParam Double coveragePercentage,
            @RequestParam Integer searchPass) {

        return ResponseEntity.ok(
                service.updateCoverage(
                        zoneId,
                        coveragePercentage,
                        searchPass
                )
        );
    }

    @GetMapping("/coverage/{zoneId}")
    public ResponseEntity<List<SearchCoverage>> getCoverageHistory(
            @PathVariable Long zoneId) {

        return ResponseEntity.ok(
                service.getCoverageHistory(zoneId)
        );
    }
}