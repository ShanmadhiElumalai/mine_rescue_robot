package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.RobotCommand;
import com.rescuemission.backend.Repository.RobotCommandRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RobotCommandService {

    private final RobotCommandRepository repository;

    public RobotCommandService(RobotCommandRepository repository) {
        this.repository = repository;
    }

    public List<RobotCommand> getAll() {
        return repository.findAll();
    }

    public Optional<RobotCommand> getById(Long id) {
        return repository.findById(id);
    }

    public RobotCommand create(RobotCommand entity) {
        return repository.save(entity);
    }

    public RobotCommand update(Long id, RobotCommand entity) {
        RobotCommand existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RobotCommand not found"));

        existing.setCommandType(entity.getCommandType());
        existing.setCommandValue(entity.getCommandValue());
        existing.setStatus(entity.getStatus());
        existing.setSentAt(entity.getSentAt());
        existing.setExecutedAt(entity.getExecutedAt());
        existing.setRobot(entity.getRobot());
        existing.setMission(entity.getMission());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
