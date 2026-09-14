
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.AlertRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.Alert;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<Alert> getAll() {
        return repository.findAll();
    }

    public Alert getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
    }

    public Alert save(Alert alert) {

        Alert saved = repository.save(alert);

        if (saved.getMission() != null) {

            MissionLog log = new MissionLog();

            log.setLogType("HAZARD_EVENT");

            log.setMessage(
                    "Hazard alert recorded. Type: "
                    + saved.getAlertType()
                    + ", Severity: "
                    + saved.getSeverity()
                    + ", Message: "
                    + saved.getMessage()
            );

            log.setLogTime(
                    saved.getCreatedAt() != null
                            ? saved.getCreatedAt()
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
