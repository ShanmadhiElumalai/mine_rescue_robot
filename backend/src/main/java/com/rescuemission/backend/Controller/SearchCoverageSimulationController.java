package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.SearchCoverageSimulationService;
import com.rescuemission.backend.entity.SearchCoverage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation/search-area")
public class SearchCoverageSimulationController {

    private final SearchCoverageSimulationService service;

    public SearchCoverageSimulationController(
            SearchCoverageSimulationService service) {
        this.service = service;
    }

    @PostMapping("/next-pass/{zoneId}")
    public ResponseEntity<SearchCoverage> simulateNextPass(
            @PathVariable Long zoneId) {

        return ResponseEntity.ok(
                service.simulateNextPass(zoneId)
        );
    }
}
