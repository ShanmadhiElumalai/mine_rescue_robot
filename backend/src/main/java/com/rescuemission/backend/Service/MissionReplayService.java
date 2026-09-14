package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.Repository.RobotLocationRepository;
import com.rescuemission.backend.entity.MissionLog;
import com.rescuemission.backend.entity.RobotLocation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionReplayService {

    private final MissionLogRepository missionLogRepository;
    private final RobotLocationRepository robotLocationRepository;

    public List<MissionLog> getReplayData(Long missionId) {
        return missionLogRepository.findByMissionIdOrderByLogTimeAsc(missionId);
    }

    public List<RobotLocation> getRobotPath(Long missionId) {
        return robotLocationRepository.findByMissionIdOrderByRecordedAtAsc(missionId);
    }
}