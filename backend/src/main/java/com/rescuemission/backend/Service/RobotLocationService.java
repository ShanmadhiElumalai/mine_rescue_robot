
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotLocationRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.RobotLocation;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotLocationService {

    private final RobotLocationRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<RobotLocation> getAll() {
        return repository.findAll();
    }

    public RobotLocation getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot location not found"));
    }

    public RobotLocation save(RobotLocation location) {

        RobotLocation saved = repository.save(location);

        if (saved.getMission() != null) {
            MissionLog log = new MissionLog();

            log.setLogType("ROBOT_MOVEMENT");
            log.setMessage(
                    "Robot movement recorded. Latitude: "
                    + saved.getLatitude()
                    + ", Longitude: "
                    + saved.getLongitude()
                    + ", Depth: "
                    + saved.getDepth()
                    + ", Direction: "
                    + saved.getDirection()
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

