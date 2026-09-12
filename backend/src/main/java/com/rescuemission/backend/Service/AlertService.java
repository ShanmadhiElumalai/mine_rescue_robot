package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.AlertRepository;
import com.rescuemission.backend.entity.Alert;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository repository;

    public List<Alert> getAll() {
        return repository.findAll();
    }

    public Alert getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
    }

    public Alert save(Alert alert) {
        return repository.save(alert);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}