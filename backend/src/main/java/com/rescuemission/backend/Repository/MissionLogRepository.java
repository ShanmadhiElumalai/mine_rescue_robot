package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.MissionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionLogRepository extends JpaRepository<MissionLog, Long> {
}
