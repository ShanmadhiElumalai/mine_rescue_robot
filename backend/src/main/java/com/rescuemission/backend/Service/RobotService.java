package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotRepository;
import com.rescuemission.backend.entity.Robot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotService {

    private final RobotRepository robotRepository;

    public List<Robot> getAll() {
        return robotRepository.findAll();
    }

    public Robot getById(Long id) {
        return robotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot not found"));
    }

    public Robot save(Robot robot) {
        return robotRepository.save(robot);
    }

    public void delete(Long id) {
        robotRepository.deleteById(id);
    }
}