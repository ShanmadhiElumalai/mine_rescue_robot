package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.MissionLog;
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
public class MissionLogsPdfService {

    private final MissionLogRepository missionLogRepository;

    public byte[] generateMissionLogsPdf(Long missionId) {

        List<MissionLog> logs =
                missionLogRepository.findByMissionIdOrderByLogTimeAsc(missionId);

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
                content.showText("MINE RESCUE - MISSION LOGS REPORT");
                content.endText();

                float y = 710;

                y = writeLine(
                        content,
                        "Mission ID: " + missionId,
                        y
                );

                y = writeLine(
                        content,
                        "Total Log Events: " + logs.size(),
                        y
                );

                y -= 10;

                if (logs.isEmpty()) {

                    writeLine(
                            content,
                            "No mission logs found for this mission.",
                            y
                    );

                } else {

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
                    "Failed to generate mission logs PDF",
                    e
            );
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