package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RiskAssessmentService;
import com.rescuemission.backend.entity.RiskAssessment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risk-assessments")
@RequiredArgsConstructor
public class RiskAssessmentController {

    private final RiskAssessmentService service;

    @GetMapping
    public ResponseEntity<List<RiskAssessment>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RiskAssessment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<RiskAssessment> create(
            @RequestBody RiskAssessment assessment) {
        return ResponseEntity.ok(service.save(assessment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RiskAssessment> update(
            @PathVariable Long id,
            @RequestBody RiskAssessment assessment) {

        RiskAssessment existing = service.getById(id);

        existing.setMission(assessment.getMission());
        existing.setRobot(assessment.getRobot());
        existing.setRiskScore(assessment.getRiskScore());
        existing.setRiskLevel(assessment.getRiskLevel());
        existing.setSafeEntryPercentage(
                assessment.getSafeEntryPercentage());
        existing.setGasRisk(assessment.getGasRisk());
        existing.setTemperatureRisk(assessment.getTemperatureRisk());
        existing.setCommunicationRisk(
                assessment.getCommunicationRisk());
        existing.setRobotHealthRisk(
                assessment.getRobotHealthRisk());
        existing.setSurvivorRisk(assessment.getSurvivorRisk());
        existing.setConfidence(assessment.getConfidence());
        existing.setReason(assessment.getReason());
        existing.setRecommendation(assessment.getRecommendation());
        existing.setRobotLocation(assessment.getRobotLocation());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}