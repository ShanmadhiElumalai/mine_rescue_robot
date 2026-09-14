
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.DetectionRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.Detection;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DetectionService {

    private final DetectionRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<Detection> getAll() {
        return repository.findAll();
    }

    public Detection getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detection not found"));
    }

    public Detection save(Detection detection) {

        Detection saved = repository.save(detection);

        if (saved.getMission() != null) {

            MissionLog log = new MissionLog();

            log.setLogType("HUMAN_DETECTION");
            log.setMessage(
                    "Human detection recorded. Type: "
                    + saved.getDetectionType()
                    + ", Confidence: "
                    + saved.getConfidence()
            );
            log.setLogTime(
                    saved.getDetectedAt() != null
                            ? saved.getDetectedAt()
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
