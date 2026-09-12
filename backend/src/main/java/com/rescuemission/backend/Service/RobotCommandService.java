package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotCommandRepository;
import com.rescuemission.backend.entity.RobotCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotCommandService {

    private final RobotCommandRepository repository;

    public List<RobotCommand> getAll() {
        return repository.findAll();
    }

    public RobotCommand getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot command not found"));
    }

    public RobotCommand save(RobotCommand command) {
        return repository.save(command);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}