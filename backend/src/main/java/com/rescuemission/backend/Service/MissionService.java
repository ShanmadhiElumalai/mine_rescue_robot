package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.Mission;
import com.rescuemission.backend.Repository.MissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MissionService {

    private final MissionRepository repository;

    public MissionService(MissionRepository repository) {
        this.repository = repository;
    }

    public List<Mission> getAll() {
        return repository.findAll();
    }

    public Optional<Mission> getById(Long id) {
        return repository.findById(id);
    }

    public Mission create(Mission entity) {
        return repository.save(entity);
    }

    public Mission update(Long id, Mission entity) {
        Mission existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mission not found"));

        existing.setName(entity.getName());
        existing.setDescription(entity.getDescription());
        existing.setStatus(entity.getStatus());
        existing.setStartTime(entity.getStartTime());
        existing.setEndTime(entity.getEndTime());
        existing.setRobot(entity.getRobot());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
