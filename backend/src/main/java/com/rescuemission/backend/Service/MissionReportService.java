package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionReportRepository;
import com.rescuemission.backend.entity.MissionReport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionReportService {

    private final MissionReportRepository repository;

    public List<MissionReport> getAll() {
        return repository.findAll();
    }

    public MissionReport getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mission report not found"));
    }

    public MissionReport save(MissionReport report) {
        return repository.save(report);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}