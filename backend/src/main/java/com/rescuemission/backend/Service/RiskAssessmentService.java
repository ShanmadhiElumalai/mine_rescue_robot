package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.RiskAssessmentRepository;
import com.rescuemission.backend.entity.RiskAssessment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskAssessmentService {

    private final RiskAssessmentRepository repository;

    public List<RiskAssessment> getAll() {
        return repository.findAll();
    }

    public RiskAssessment getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk assessment not found"));
    }

    public RiskAssessment save(RiskAssessment assessment) {
        return repository.save(assessment);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}