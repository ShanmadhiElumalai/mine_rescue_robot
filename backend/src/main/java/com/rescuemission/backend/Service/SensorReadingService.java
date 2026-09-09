package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.SensorReading;
import com.rescuemission.backend.Repository.SensorReadingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorReadingService {

    private final SensorReadingRepository repository;

    public SensorReadingService(SensorReadingRepository repository) {
        this.repository = repository;
    }

    public List<SensorReading> getAll() {
        return repository.findAll();
    }

    public Optional<SensorReading> getById(Long id) {
        return repository.findById(id);
    }

    public SensorReading create(SensorReading entity) {
        return repository.save(entity);
    }

    public SensorReading update(Long id, SensorReading entity) {
        SensorReading existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("SensorReading not found"));

        existing.setSensorType(entity.getSensorType());
        existing.setValue(entity.getValue());
        existing.setUnit(entity.getUnit());
        existing.setRecordedAt(entity.getRecordedAt());
        existing.setRobot(entity.getRobot());
        existing.setMission(entity.getMission());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
