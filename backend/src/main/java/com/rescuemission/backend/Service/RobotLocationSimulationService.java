package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotLocationRepository;
import com.rescuemission.backend.Repository.RobotRepository;
import com.rescuemission.backend.entity.Robot;
import com.rescuemission.backend.entity.RobotLocation;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RobotLocationSimulationService {

    private final RobotLocationRepository locationRepository;
    private final RobotRepository robotRepository;

    public RobotLocationSimulationService(
            RobotLocationRepository locationRepository,
            RobotRepository robotRepository) {
        this.locationRepository = locationRepository;
        this.robotRepository = robotRepository;
    }

    public RobotLocation simulateLocation(
            Long robotId,
            Double latitude,
            Double longitude,
            Double depth,
            Double direction) {

        Robot robot = robotRepository.findById(robotId)
                .orElseThrow(() ->
                        new RuntimeException("Robot not found with id: " + robotId));

        RobotLocation location = new RobotLocation();

        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setDepth(depth);
        location.setDirection(direction);
        location.setRecordedAt(LocalDateTime.now());
        location.setRobot(robot);
        location.setMission(null);

        return locationRepository.save(location);
    }

    public List<RobotLocation> getRobotPath(Long robotId) {

        return locationRepository.findAll()
                .stream()
                .filter(location ->
                        location.getRobot() != null
                                && location.getRobot().getId().equals(robotId))
                .toList();
    }
}
