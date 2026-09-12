package com.rescuemission.backend.Service;

import com.rescuemission.backend.Repository.MissionRepository;
import com.rescuemission.backend.entity.Mission;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;

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
}