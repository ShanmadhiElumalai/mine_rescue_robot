package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.Alert;
import com.rescuemission.backend.Repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

    private final AlertRepository repository;

    public AlertService(AlertRepository repository) {
        this.repository = repository;
    }

    public List<Alert> getAll() {
        return repository.findAll();
    }

    public Optional<Alert> getById(Long id) {
        return repository.findById(id);
    }

    public Alert create(Alert entity) {
        return repository.save(entity);
    }

    public Alert update(Long id, Alert entity) {
        Alert existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));

        existing.setAlertType(entity.getAlertType());
        existing.setSeverity(entity.getSeverity());
        existing.setMessage(entity.getMessage());
        existing.setStatus(entity.getStatus());
        existing.setResolvedAt(entity.getResolvedAt());
        existing.setRobot(entity.getRobot());
        existing.setMission(entity.getMission());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
