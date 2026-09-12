package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RobotLocationRepository;
import com.rescuemission.backend.entity.RobotLocation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotLocationService {

    private final RobotLocationRepository repository;

    public List<RobotLocation> getAll() {
        return repository.findAll();
    }

    public RobotLocation getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Robot location not found"));
    }

    public RobotLocation save(RobotLocation location) {
        return repository.save(location);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}