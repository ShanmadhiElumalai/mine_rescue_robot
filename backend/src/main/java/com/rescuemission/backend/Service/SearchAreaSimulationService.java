package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SearchCoverageRepository;
import com.rescuemission.backend.Repository.SearchZoneRepository;
import com.rescuemission.backend.Repository.RobotRepository;
import com.rescuemission.backend.entity.SearchCoverage;
import com.rescuemission.backend.entity.SearchZone;
import com.rescuemission.backend.entity.Robot;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SearchAreaSimulationService {

    private final SearchZoneRepository searchZoneRepository;
    private final SearchCoverageRepository searchCoverageRepository;
    private final RobotRepository robotRepository;

    public SearchAreaSimulationService(
            SearchZoneRepository searchZoneRepository,
            SearchCoverageRepository searchCoverageRepository,
            RobotRepository robotRepository) {

        this.searchZoneRepository = searchZoneRepository;
        this.searchCoverageRepository = searchCoverageRepository;
        this.robotRepository = robotRepository;
    }

    public SearchZone createZone(
            Long robotId,
            String zoneName,
            String description,
            Integer priority,
            Double targetCoveragePercentage) {

        Robot robot = robotRepository.findById(robotId)
                .orElseThrow(() ->
                        new RuntimeException("Robot not found with id: " + robotId));

        SearchZone zone = new SearchZone();

        zone.setZoneName(zoneName);
        zone.setDescription(description);
        zone.setPriority(priority);
        zone.setStatus("ACTIVE");
        zone.setTargetCoveragePercentage(targetCoveragePercentage);
        zone.setBoundaryCoordinates(
                "SIMULATED_BOUNDARY"
        );
        zone.setCreatedAt(LocalDateTime.now());
        zone.setStartedAt(LocalDateTime.now());
        zone.setCompletedAt(null);
        zone.setMission(null);

        return searchZoneRepository.save(zone);
    }

    public SearchCoverage updateCoverage(
            Long zoneId,
            Double coveragePercentage,
            Integer searchPass) {

        SearchZone zone = searchZoneRepository.findById(zoneId)
                .orElseThrow(() ->
                        new RuntimeException("Search zone not found with id: " + zoneId));

        SearchCoverage coverage = new SearchCoverage();

        coverage.setSearchZone(zone);
        coverage.setCoveragePercentage(
                Math.min(100.0, Math.max(0.0, coveragePercentage))
        );
        coverage.setSearchPass(searchPass);
        coverage.setRecordedAt(LocalDateTime.now());

        return searchCoverageRepository.save(coverage);
    }

    public List<SearchCoverage> getCoverageHistory(Long zoneId) {

        return searchCoverageRepository.findAll()
                .stream()
                .filter(coverage ->
                        coverage.getSearchZone() != null
                                && coverage.getSearchZone().getId().equals(zoneId))
                .toList();
    }
}
