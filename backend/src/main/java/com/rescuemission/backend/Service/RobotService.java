package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.Robot;
import com.rescuemission.backend.Repository.RobotRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RobotService {

    private final RobotRepository robotRepository;

    public RobotService(RobotRepository robotRepository) {
        this.robotRepository = robotRepository;
    }

    public List<Robot> getAllRobots() {
        return robotRepository.findAll();
    }

    public Optional<Robot> getRobotById(Long id) {
        return robotRepository.findById(id);
    }

    public Robot createRobot(Robot robot) {
        return robotRepository.save(robot);
    }

    public Robot updateRobot(Long id, Robot robot) {
        Robot existingRobot = robotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot not found"));

        existingRobot.setName(robot.getName());
        existingRobot.setModel(robot.getModel());
        existingRobot.setStatus(robot.getStatus());
        existingRobot.setBatteryLevel(robot.getBatteryLevel());

        return robotRepository.save(existingRobot);
    }

    public void deleteRobot(Long id) {
        robotRepository.deleteById(id);
    }
}
