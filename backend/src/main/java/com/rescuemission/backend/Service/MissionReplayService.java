package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionLogRepository;
import com.rescuemission.backend.entity.MissionLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionReplayService {

    private final MissionLogRepository missionLogRepository;

    public List<MissionLog> getReplayData(Long missionId) {
        return missionLogRepository.findByMissionIdOrderByLogTimeAsc(missionId);
    }
}
