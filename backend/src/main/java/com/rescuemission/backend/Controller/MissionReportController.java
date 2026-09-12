package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionReportService;
import com.rescuemission.backend.entity.MissionReport;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mission-reports")
@RequiredArgsConstructor
public class MissionReportController {

    private final MissionReportService service;

    @GetMapping
    public ResponseEntity<List<MissionReport>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissionReport> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<MissionReport> create(@RequestBody MissionReport report) {
        return ResponseEntity.ok(service.save(report));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MissionReport> update(
            @PathVariable Long id,
            @RequestBody MissionReport report) {

        MissionReport existing = service.getById(id);

        existing.setSummary(report.getSummary());
        existing.setTotalDistance(report.getTotalDistance());
        existing.setTotalDetections(report.getTotalDetections());
        existing.setTotalAlerts(report.getTotalAlerts());
        existing.setCoveragePercentage(report.getCoveragePercentage());
        existing.setSurvivorsDetected(report.getSurvivorsDetected());
        existing.setHighestRiskScore(report.getHighestRiskScore());
        existing.setMissionEfficiency(report.getMissionEfficiency());
        existing.setFinalStatus(report.getFinalStatus());
        existing.setMission(report.getMission());
        existing.setRobot(report.getRobot());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}