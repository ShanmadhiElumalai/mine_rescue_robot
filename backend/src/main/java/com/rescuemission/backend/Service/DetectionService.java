package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.DetectionRepository;
import com.rescuemission.backend.entity.Detection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetectionService {

    private final DetectionRepository repository;

    public List<Detection> getAll() {
        return repository.findAll();
    }

    public Detection getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detection not found"));
    }

    public Detection save(Detection detection) {
        return repository.save(detection);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}