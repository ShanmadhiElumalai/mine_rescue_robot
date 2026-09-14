package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.GasAnalysisPdfService;
import com.rescuemission.backend.Service.MissionLogsPdfService;
import com.rescuemission.backend.Service.MissionPdfService;
import com.rescuemission.backend.Service.MissionReportService;
import com.rescuemission.backend.Service.ReplayPdfService;
import com.rescuemission.backend.Service.SensorDataExportService;
import com.rescuemission.backend.entity.MissionReport;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/mission-reports")
@RequiredArgsConstructor
public class MissionReportController {

    private final MissionReportService service;
    private final MissionPdfService pdfService;
    private final GasAnalysisPdfService gasAnalysisPdfService;
    private final ReplayPdfService replayPdfService;
    private final MissionLogsPdfService missionLogsPdfService;
    private final SensorDataExportService sensorDataExportService;

    @GetMapping
    public ResponseEntity<List<MissionReport>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissionReport> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<MissionReport> create(
            @RequestBody MissionReport report) {
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

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadMissionPdf(
            @PathVariable Long id) {

        byte[] pdf = pdfService.generateMissionPdf(id);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=mission-report-" + id + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{missionId}/gas-analysis-pdf")
    public ResponseEntity<byte[]> downloadGasAnalysisPdf(
            @PathVariable Long missionId) {

        byte[] pdf =
                gasAnalysisPdfService.generateGasAnalysisPdf(missionId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=gas-analysis-" + missionId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{missionId}/replay-pdf")
    public ResponseEntity<byte[]> downloadReplayPdf(
            @PathVariable Long missionId) {

        byte[] pdf =
                replayPdfService.generateReplayPdf(missionId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=replay-" + missionId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{missionId}/mission-logs-pdf")
    public ResponseEntity<byte[]> downloadMissionLogsPdf(
            @PathVariable Long missionId) {

        byte[] pdf =
                missionLogsPdfService.generateMissionLogsPdf(missionId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=mission-logs-" + missionId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{missionId}/sensor-data-export")
    public ResponseEntity<byte[]> exportSensorData(
            @PathVariable Long missionId) {

        String csv =
                sensorDataExportService.exportSensorData(missionId);

        byte[] data = csv.getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=sensor-data-" + missionId + ".csv"
                )
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(data);
    }
}