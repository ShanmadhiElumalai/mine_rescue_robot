package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.MissionReport;
import com.rescuemission.backend.Repository.MissionReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MissionReportService {

    private final MissionReportRepository repository;

    public MissionReportService(MissionReportRepository repository) {
        this.repository = repository;
    }

    public List<MissionReport> getAll() {
        return repository.findAll();
    }

    public Optional<MissionReport> getById(Long id) {
        return repository.findById(id);
    }

    public MissionReport create(MissionReport entity) {
        return repository.save(entity);
    }

    public MissionReport update(Long id, MissionReport entity) {

        MissionReport existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MissionReport not found"));

        existing.setSummary(entity.getSummary());
        existing.setTotalDistance(entity.getTotalDistance());
        existing.setTotalDetections(entity.getTotalDetections());
        existing.setTotalAlerts(entity.getTotalAlerts());
        existing.setFinalStatus(entity.getFinalStatus());
        existing.setGeneratedAt(entity.getGeneratedAt());
        existing.setMission(entity.getMission());
        existing.setRobot(entity.getRobot());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
