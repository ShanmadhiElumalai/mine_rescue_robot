
package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.TTECommunicationRepository;
import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.TTECommunication;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TTECommunicationService {

    private final TTECommunicationRepository repository;
    private final MissionLogRepository missionLogRepository;

    public List<TTECommunication> getAll() {
        return repository.findAll();
    }

    public TTECommunication getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Communication record not found"));
    }

    public TTECommunication save(TTECommunication communication) {

        TTECommunication saved = repository.save(communication);

        if (saved.getMission() != null) {

            MissionLog log = new MissionLog();

            log.setLogType("COMMUNICATION");

            log.setMessage(
                    "Communication status changed. Status: "
                    + saved.getConnectionStatus()
                    + ", Quality: "
                    + saved.getConnectionQuality()
                    + ", Signal: "
                    + saved.getSignalStrength()
                    + ", Latency: "
                    + saved.getLatency()
            );

            log.setLogTime(
                    saved.getRecordedAt() != null
                            ? saved.getRecordedAt()
                            : LocalDateTime.now()
            );

            log.setRobot(saved.getRobot());
            log.setMission(saved.getMission());

            missionLogRepository.save(log);
        }

        return saved;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
