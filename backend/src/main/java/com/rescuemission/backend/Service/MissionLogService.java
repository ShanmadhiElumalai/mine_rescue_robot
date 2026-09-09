package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.MissionLog;
import com.rescuemission.backend.Repository.MissionLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MissionLogService {

    private final MissionLogRepository repository;

    public MissionLogService(MissionLogRepository repository) {
        this.repository = repository;
    }

    public List<MissionLog> getAll() {
        return repository.findAll();
    }

    public Optional<MissionLog> getById(Long id) {
        return repository.findById(id);
    }

    public MissionLog create(MissionLog entity) {
        return repository.save(entity);
    }

    public MissionLog update(Long id, MissionLog entity) {

        MissionLog existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MissionLog not found"));

        existing.setLogType(entity.getLogType());
        existing.setMessage(entity.getMessage());
        existing.setLogTime(entity.getLogTime());
        existing.setRobot(entity.getRobot());
        existing.setMission(entity.getMission());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
