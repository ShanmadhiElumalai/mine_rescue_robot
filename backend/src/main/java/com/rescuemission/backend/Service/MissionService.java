package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.Repository.MissionRepository;
import com.rescuemission.backend.entity.Mission;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;
    private final MissionLogRepository missionLogRepository;

    public List<Mission> getAll() {
        return missionRepository.findAll();
    }

    public Mission getById(Long id) {
        return missionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mission not found"));
    }

    public Mission save(Mission mission) {
        return missionRepository.save(mission);
    }

    public void delete(Long id) {
        missionRepository.deleteById(id);
    }

    public Mission startMission(Long id) {
        Mission mission = getById(id);

        mission.setStatus("RUNNING");
        mission.setStartTime(LocalDateTime.now());
        mission.setEndTime(null);

        Mission saved = missionRepository.save(mission);
        logCommand(saved, "MISSION_START", "Mission started");

        return saved;
    }

    public Mission pauseMission(Long id) {
        Mission mission = getById(id);

        mission.setStatus("PAUSED");

        Mission saved = missionRepository.save(mission);
        logCommand(saved, "MISSION_PAUSE", "Mission paused");

        return saved;
    }

    public Mission resumeMission(Long id) {
        Mission mission = getById(id);

        mission.setStatus("RUNNING");

        Mission saved = missionRepository.save(mission);
        logCommand(saved, "MISSION_RESUME", "Mission resumed");

        return saved;
    }

    public Mission returnHome(Long id) {
        Mission mission = getById(id);

        mission.setStatus("RETURNING_HOME");

        Mission saved = missionRepository.save(mission);
        logCommand(saved, "RETURN_HOME", "Robot returning home");

        return saved;
    }

    public Mission emergencyStop(Long id) {
        Mission mission = getById(id);

        mission.setStatus("EMERGENCY_STOPPED");
        mission.setEndTime(LocalDateTime.now());

        Mission saved = missionRepository.save(mission);
        logCommand(saved, "EMERGENCY_STOP", "Emergency stop activated");

        return saved;
    }

    public String getMissionStatus(Long id) {
        return getById(id).getStatus();
    }

    private void logCommand(Mission mission, String type, String message) {
        MissionLog log = new MissionLog();

        log.setLogType(type);
        log.setMessage(message);
        log.setLogTime(LocalDateTime.now());
        log.setMission(mission);
        log.setRobot(mission.getRobot());

        missionLogRepository.save(log);
    }
}