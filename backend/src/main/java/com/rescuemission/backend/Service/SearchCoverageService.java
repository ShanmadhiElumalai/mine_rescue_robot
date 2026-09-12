package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.SearchCoverageRepository;
import com.rescuemission.backend.entity.SearchCoverage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchCoverageService {

    private final SearchCoverageRepository repository;

    public List<SearchCoverage> getAll() {
        return repository.findAll();
    }

    public SearchCoverage getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search coverage record not found"));
    }

    public SearchCoverage save(SearchCoverage coverage) {
        return repository.save(coverage);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}