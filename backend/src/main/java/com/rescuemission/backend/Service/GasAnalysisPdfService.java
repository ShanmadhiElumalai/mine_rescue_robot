package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SensorReadingRepository;
import com.rescuemission.backend.entity.SensorReading;
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
public class GasAnalysisPdfService {

    private final SensorReadingRepository sensorReadingRepository;

    public byte[] generateGasAnalysisPdf(Long missionId) {

        List<SensorReading> readings =
                sensorReadingRepository.findByMissionIdOrderByRecordedAtAsc(missionId);

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
                content.showText("MINE RESCUE - GAS ANALYSIS REPORT");
                content.endText();

                float y = 710;

                y = writeLine(content, "Mission ID: " + missionId, y);
                y -= 10;

                if (readings.isEmpty()) {
                    writeLine(
                            content,
                            "No sensor readings found for this mission.",
                            y
                    );
                } else {

                    for (SensorReading reading : readings) {

                        String line =
                                safe(reading.getRecordedAt()) + " | " +
                                safe(reading.getSensorType()) + " | " +
                                safe(reading.getValue()) + " " +
                                safe(reading.getUnit()) + " | Confidence: " +
                                safe(reading.getConfidence());

                        y = writeLine(content, line, y);
                    }
                }
            }

            document.save(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to generate gas analysis PDF", e);
        }
    }

    private float writeLine(
            PDPageContentStream content,
            String text,
            float y) throws IOException {

        content.beginText();

        content.setFont(
                new PDType1Font(Standard14Fonts.FontName.HELVETICA),
                10
        );

        content.newLineAtOffset(50, y);
        content.showText(text);
        content.endText();

        return y - 20;
    }

    private String safe(Object value) {
        return value == null ? "N/A" : value.toString();
    }
}