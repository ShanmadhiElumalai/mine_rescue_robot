package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.Detection;
import com.rescuemission.backend.Repository.DetectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetectionService {

    private final DetectionRepository repository;

    public DetectionService(DetectionRepository repository) {
        this.repository = repository;
    }

    public List<Detection> getAll() {
        return repository.findAll();
    }

    public Optional<Detection> getById(Long id) {
        return repository.findById(id);
    }

    public Detection create(Detection entity) {
        return repository.save(entity);
    }

    public Detection update(Long id, Detection entity) {
        Detection existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detection not found"));

        existing.setDetectionType(entity.getDetectionType());
        existing.setConfidence(entity.getConfidence());
        existing.setSeverity(entity.getSeverity());
        existing.setLatitude(entity.getLatitude());
        existing.setLongitude(entity.getLongitude());
        existing.setDescription(entity.getDescription());
        existing.setDetectedAt(entity.getDetectedAt());
        existing.setRobot(entity.getRobot());
        existing.setMission(entity.getMission());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
