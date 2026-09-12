package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SensorReadingRepository;
import com.rescuemission.backend.entity.SensorReading;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SensorReadingService {

    private final SensorReadingRepository repository;

    public List<SensorReading> getAll() {
        return repository.findAll();
    }

    public SensorReading getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor reading not found"));
    }

    public SensorReading save(SensorReading reading) {
        return repository.save(reading);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}