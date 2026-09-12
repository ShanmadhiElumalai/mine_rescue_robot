package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotHealthRepository;
import com.rescuemission.backend.entity.RobotHealth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotHealthService {

    private final RobotHealthRepository repository;

    public List<RobotHealth> getAll() {
        return repository.findAll();
    }

    public RobotHealth getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot health record not found"));
    }

    public RobotHealth save(RobotHealth health) {
        return repository.save(health);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}