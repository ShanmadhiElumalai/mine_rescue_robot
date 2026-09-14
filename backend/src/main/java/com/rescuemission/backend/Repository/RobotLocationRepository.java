package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.RobotLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RobotLocationRepository extends JpaRepository<RobotLocation, Long> {

    List<RobotLocation> findByMissionIdOrderByRecordedAtAsc(Long missionId);
}