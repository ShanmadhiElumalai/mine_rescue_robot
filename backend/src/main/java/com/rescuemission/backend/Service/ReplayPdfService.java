package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.Repository.RobotLocationRepository;
import com.rescuemission.backend.entity.MissionLog;
import com.rescuemission.backend.entity.RobotLocation;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplayPdfService {

    private final MissionLogRepository missionLogRepository;
    private final RobotLocationRepository robotLocationRepository;

    public byte[] generateReplayPdf(Long missionId) {

        List<MissionLog> logs =
                missionLogRepository.findByMissionIdOrderByLogTimeAsc(missionId);

        List<RobotLocation> locations =
                robotLocationRepository.findByMissionIdOrderByRecordedAtAsc(missionId);

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
                content.showText("MINE RESCUE - MISSION REPLAY REPORT");
                content.endText();

                float y = 710;

                y = writeLine(content, "Mission ID: " + missionId, y);
                y = writeLine(
                        content,
                        "Robot Path Points: " + locations.size(),
                        y
                );
                y = writeLine(
                        content,
                        "Mission Log Events: " + logs.size(),
                        y
                );

                y -= 10;

                y = writeLine(content, "ROBOT MOVEMENT", y);

                for (RobotLocation location : locations) {

                    String line =
                            safe(location.getRecordedAt()) +
                            " | Lat: " +
                            safe(location.getLatitude()) +
                            " | Lon: " +
                            safe(location.getLongitude()) +
                            " | Depth: " +
                            safe(location.getDepth());

                    y = writeLine(content, line, y);

                    if (y < 60) {
                        break;
                    }
                }

                if (y >= 60) {
                    y -= 10;
                    y = writeLine(content, "MISSION EVENTS", y);

                    for (MissionLog log : logs) {

                        String line =
                                safe(log.getLogTime()) +
                                " | " +
                                safe(log.getLogType()) +
                                " | " +
                                safe(log.getMessage());

                        y = writeLine(content, line, y);

                        if (y < 60) {
                            break;
                        }
                    }
                }
            }

            document.save(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to generate replay PDF", e);
        }
    }

    private float writeLine(
            PDPageContentStream content,
            String text,
            float y) throws IOException {

        content.beginText();

        content.setFont(
                new PDType1Font(Standard14Fonts.FontName.HELVETICA),
                9
        );

        content.newLineAtOffset(50, y);
        content.showText(text);
        content.endText();

        return y - 18;
    }

    private String safe(Object value) {
        return value == null ? "N/A" : value.toString();
    }
}