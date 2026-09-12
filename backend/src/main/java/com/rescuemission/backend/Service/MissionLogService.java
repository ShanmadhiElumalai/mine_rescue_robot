package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionLogService {

    private final MissionLogRepository repository;

    public List<MissionLog> getAll() {
        return repository.findAll();
    }

    public MissionLog getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mission log not found"));
    }

    public MissionLog save(MissionLog log) {
        return repository.save(log);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}