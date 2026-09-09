package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.TTECommunication;
import com.rescuemission.backend.Repository.TTECommunicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TTECommunicationService {

    private final TTECommunicationRepository repository;

    public TTECommunicationService(TTECommunicationRepository repository) {
        this.repository = repository;
    }

    public List<TTECommunication> getAll() {
        return repository.findAll();
    }

    public Optional<TTECommunication> getById(Long id) {
        return repository.findById(id);
    }

    public TTECommunication create(TTECommunication entity) {
        return repository.save(entity);
    }

    public TTECommunication update(Long id, TTECommunication entity) {

        TTECommunication existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("TTECommunication not found"));

        existing.setConnectionStatus(entity.getConnectionStatus());
        existing.setSignalStrength(entity.getSignalStrength());
        existing.setLatency(entity.getLatency());
        existing.setDataTransmitted(entity.getDataTransmitted());
        existing.setConnectionQuality(entity.getConnectionQuality());
        existing.setCommunicationFault(entity.getCommunicationFault());
        existing.setRecordedAt(entity.getRecordedAt());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}