package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.TTECommunicationService;
import com.rescuemission.backend.entity.TTECommunication;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communications")
@RequiredArgsConstructor
public class TTECommunicationController {

    private final TTECommunicationService service;

    @GetMapping
    public ResponseEntity<List<TTECommunication>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TTECommunication> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<TTECommunication> create(
            @RequestBody TTECommunication communication) {
        return ResponseEntity.ok(service.save(communication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TTECommunication> update(
            @PathVariable Long id,
            @RequestBody TTECommunication communication) {

        TTECommunication existing = service.getById(id);

        existing.setConnectionStatus(communication.getConnectionStatus());
        existing.setCommunicationPercentage(
                communication.getCommunicationPercentage());
        existing.setSignalStrength(communication.getSignalStrength());
        existing.setLatency(communication.getLatency());
        existing.setDataTransmitted(communication.getDataTransmitted());
        existing.setConnectionQuality(communication.getConnectionQuality());
        existing.setCommunicationFault(communication.getCommunicationFault());
        existing.setPredictedStatus(communication.getPredictedStatus());
        existing.setPredictionConfidence(
                communication.getPredictionConfidence());
        existing.setEstimatedLossTime(communication.getEstimatedLossTime());
        existing.setRobot(communication.getRobot());
        existing.setMission(communication.getMission());

        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}