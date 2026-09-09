package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.MissionReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionReportRepository extends JpaRepository<MissionReport, Long> {
}
