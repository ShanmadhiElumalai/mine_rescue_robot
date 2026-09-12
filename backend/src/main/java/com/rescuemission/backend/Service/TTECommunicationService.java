package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.TTECommunicationRepository;
import com.rescuemission.backend.entity.TTECommunication;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TTECommunicationService {

    private final TTECommunicationRepository repository;

    public List<TTECommunication> getAll() {
        return repository.findAll();
    }

    public TTECommunication getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Communication record not found"));
    }

    public TTECommunication save(TTECommunication communication) {
        return repository.save(communication);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}