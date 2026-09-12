package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SearchZoneRepository;
import com.rescuemission.backend.entity.SearchZone;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchZoneService {

    private final SearchZoneRepository repository;

    public List<SearchZone> getAll() {
        return repository.findAll();
    }

    public SearchZone getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search zone not found"));
    }

    public SearchZone save(SearchZone zone) {
        return repository.save(zone);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}