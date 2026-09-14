package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.MissionReport;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MissionPdfService {

    private final MissionReportService missionReportService;

    public byte[] generateMissionPdf(Long reportId) {
        MissionReport report = missionReportService.getById(reportId);

        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream content =
                         new PDPageContentStream(document, page)) {

                content.beginText();
                content.setFont(
                        new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD),
                        18
                );
                content.newLineAtOffset(50, 750);
                content.showText("MINE RESCUE - MISSION REPORT");
                content.endText();

                float y = 710;

                y = writeLine(content, "Report ID: " + report.getId(), y);

                y = writeLine(content, "Mission ID: " +
                        (report.getMission() != null
                                ? report.getMission().getId()
                                : "N/A"), y);

                y = writeLine(content, "Robot ID: " +
                        (report.getRobot() != null
                                ? report.getRobot().getId()
                                : "N/A"), y);

                y = writeLine(content, "Summary: " +
                        safe(report.getSummary()), y);

                y = writeLine(content, "Total Distance: " +
                        safe(report.getTotalDistance()), y);

                y = writeLine(content, "Total Detections: " +
                        safe(report.getTotalDetections()), y);

                y = writeLine(content, "Total Alerts: " +
                        safe(report.getTotalAlerts()), y);

                y = writeLine(content, "Coverage Percentage: " +
                        safe(report.getCoveragePercentage()), y);

                y = writeLine(content, "Survivors Detected: " +
                        safe(report.getSurvivorsDetected()), y);

                y = writeLine(content, "Highest Risk Score: " +
                        safe(report.getHighestRiskScore()), y);

                y = writeLine(content, "Mission Efficiency: " +
                        safe(report.getMissionEfficiency()), y);

                y = writeLine(content, "Final Status: " +
                        safe(report.getFinalStatus()), y);

                writeLine(content, "Generated At: " +
                        safe(report.getGeneratedAt()), y);
            }

            document.save(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("Failed to generate mission PDF", e);
        }
    }

    private float writeLine(
            PDPageContentStream content,
            String text,
            float y) throws IOException {

        content.beginText();

        content.setFont(
                new PDType1Font(Standard14Fonts.FontName.HELVETICA),
                11
        );

        content.newLineAtOffset(50, y);
        content.showText(text);
        content.endText();

        return y - 25;
    }

    private String safe(Object value) {
        return value == null ? "N/A" : value.toString();
    }
}