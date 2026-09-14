
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotHealthRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.RobotHealth;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotHealthService {

    private final RobotHealthRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<RobotHealth> getAll() {
        return repository.findAll();
    }

    public RobotHealth getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot health record not found"));
    }

    public RobotHealth save(RobotHealth health) {

        RobotHealth saved = repository.save(health);

        if (saved.getMission() != null) {

            MissionLog log = new MissionLog();

            if (Boolean.TRUE.equals(saved.getFailureDetected())) {
                log.setLogType("ROBOT_FAILURE");

                log.setMessage(
                        "Robot failure detected. Component: "
                        + saved.getComponentType()
                        + ", Description: "
                        + saved.getFailureDescription()
                );
            } else {
                log.setLogType("ROBOT_HEALTH");

                log.setMessage(
                        "Robot health updated. Component: "
                        + saved.getComponentType()
                        + ", Health Status: "
                        + saved.getHealthStatus()
                        + ", Health Score: "
                        + saved.getHealthScore()
                        + ", Battery: "
                        + saved.getBatteryLevel()
                );
            }

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
