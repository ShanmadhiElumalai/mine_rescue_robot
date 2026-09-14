
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SensorReadingRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.SensorReading;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SensorReadingService {

    private final SensorReadingRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<SensorReading> getAll() {
        return repository.findAll();
    }

    public SensorReading getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor reading not found"));
    }

    public SensorReading save(SensorReading reading) {

        SensorReading saved = repository.save(reading);

        if (saved.getMission() != null) {

            MissionLog log = new MissionLog();

            String sensorType = saved.getSensorType() != null
                    ? saved.getSensorType().toUpperCase()
                    : "UNKNOWN";

            if (sensorType.contains("GAS")) {
                log.setLogType("GAS_EVENT");
            } else {
                log.setLogType("SENSOR_CHANGE");
            }

            log.setMessage(
                    "Sensor reading recorded. Type: "
                    + saved.getSensorType()
                    + ", Value: "
                    + saved.getValue()
                    + " "
                    + saved.getUnit()
                    + ", Confidence: "
                    + saved.getConfidence()
            );

            log.setLogTime(
                    saved.getRecordedAt() != null
                            ? saved.getRecordedAt()
                            : LocalDateTime.now()
            );

            log.setRobot(saved.getRobot());
            log.setMission(saved.getMission());

            missionLogRepository.save(log);
        }

        return saved;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
