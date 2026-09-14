package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SensorReadingRepository;
import com.rescuemission.backend.entity.SensorReading;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SensorDataExportService {

    private final SensorReadingRepository sensorReadingRepository;

    public String exportSensorData(Long missionId) {

        List<SensorReading> readings =
                sensorReadingRepository
                        .findByMissionIdOrderByRecordedAtAsc(missionId);

        StringBuilder csv = new StringBuilder();

        csv.append("ID,Sensor Type,Value,Unit,Confidence,Recorded At,Robot ID,Mission ID\n");

        for (SensorReading reading : readings) {

            csv.append(safe(reading.getId())).append(",");
            csv.append(csvValue(reading.getSensorType())).append(",");
            csv.append(safe(reading.getValue())).append(",");
            csv.append(csvValue(reading.getUnit())).append(",");
            csv.append(safe(reading.getConfidence())).append(",");
            csv.append(csvValue(reading.getRecordedAt())).append(",");
            csv.append(
                    reading.getRobot() != null
                            ? safe(reading.getRobot().getId())
                            : ""
            ).append(",");
            csv.append(
                    reading.getMission() != null
                            ? safe(reading.getMission().getId())
                            : ""
            ).append("\n");
        }

        return csv.toString();
    }

    private String safe(Object value) {
        return value == null ? "" : value.toString();
    }

    private String csvValue(Object value) {
        if (value == null) {
            return "";
        }

        String text = value.toString();

        if (text.contains(",") || text.contains("\"") || text.contains("\n")) {
            return "\"" + text.replace("\"", "\"\"") + "\"";
        }

        return text;
    }
}