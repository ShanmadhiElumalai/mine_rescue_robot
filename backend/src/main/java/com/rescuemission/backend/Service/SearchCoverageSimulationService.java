package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SearchCoverageRepository;
import com.rescuemission.backend.Repository.SearchZoneRepository;
import com.rescuemission.backend.entity.SearchCoverage;
import com.rescuemission.backend.entity.SearchZone;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SearchCoverageSimulationService {

    private final SearchZoneRepository searchZoneRepository;
    private final SearchCoverageRepository searchCoverageRepository;

    public SearchCoverageSimulationService(
            SearchZoneRepository searchZoneRepository,
            SearchCoverageRepository searchCoverageRepository) {

        this.searchZoneRepository = searchZoneRepository;
        this.searchCoverageRepository = searchCoverageRepository;
    }

    public SearchCoverage simulateNextPass(Long zoneId) {

        SearchZone zone = searchZoneRepository.findById(zoneId)
                .orElseThrow(() ->
                        new RuntimeException("Search zone not found with id: " + zoneId));

        SearchCoverage latest = searchCoverageRepository.findAll()
                .stream()
                .filter(coverage ->
                        coverage.getSearchZone() != null
                                && coverage.getSearchZone().getId().equals(zoneId))
                .reduce((first, second) -> second)
                .orElse(null);

        double currentCoverage = latest == null
                ? 0.0
                : latest.getCoveragePercentage();

        int currentPass = latest == null
                ? 0
                : latest.getSearchPass();

        double newCoverage = Math.min(100.0, currentCoverage + 10.0);
        int newPass = currentPass + 1;

        SearchCoverage coverage = new SearchCoverage();

        coverage.setSearchZone(zone);
        coverage.setCoveragePercentage(newCoverage);
        coverage.setSearchPass(newPass);
        coverage.setRecordedAt(LocalDateTime.now());

        if (newCoverage >= 100.0) {
            zone.setStatus("COMPLETED");
            zone.setCompletedAt(LocalDateTime.now());
            searchZoneRepository.save(zone);
        }

        return searchCoverageRepository.save(coverage);
    }
}
