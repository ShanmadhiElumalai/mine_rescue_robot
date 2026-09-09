package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.RobotHealth;
import com.rescuemission.backend.Repository.RobotHealthRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RobotHealthService {

    private final RobotHealthRepository repository;

    public RobotHealthService(RobotHealthRepository repository) {
        this.repository = repository;
    }

    public List<RobotHealth> getAll() {
        return repository.findAll();
    }

    public Optional<RobotHealth> getById(Long id) {
        return repository.findById(id);
    }

    public RobotHealth create(RobotHealth entity) {
        return repository.save(entity);
    }

    public RobotHealth update(Long id, RobotHealth entity) {

        RobotHealth existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RobotHealth not found"));

        existing.setBatteryLevel(entity.getBatteryLevel());
        existing.setTemperature(entity.getTemperature());
        existing.setHealthStatus(entity.getHealthStatus());
        existing.setRecordedAt(entity.getRecordedAt());
        existing.setRobot(entity.getRobot());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
