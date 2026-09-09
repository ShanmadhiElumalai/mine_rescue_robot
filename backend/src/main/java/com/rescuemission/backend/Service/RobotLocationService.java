package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.RobotLocation;
import com.rescuemission.backend.Repository.RobotLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RobotLocationService {

    private final RobotLocationRepository repository;

    public RobotLocationService(RobotLocationRepository repository) {
        this.repository = repository;
    }

    public List<RobotLocation> getAll() {
        return repository.findAll();
    }

    public Optional<RobotLocation> getById(Long id) {
        return repository.findById(id);
    }

    public RobotLocation create(RobotLocation entity) {
        return repository.save(entity);
    }

    public RobotLocation update(Long id, RobotLocation entity) {
        RobotLocation existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RobotLocation not found"));

        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
