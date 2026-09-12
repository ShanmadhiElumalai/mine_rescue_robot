package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SurvivorRepository;
import com.rescuemission.backend.entity.Survivor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurvivorService {

    private final SurvivorRepository repository;

    public List<Survivor> getAll() {
        return repository.findAll();
    }

    public Survivor getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survivor not found"));
    }

    public Survivor save(Survivor survivor) {
        return repository.save(survivor);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}