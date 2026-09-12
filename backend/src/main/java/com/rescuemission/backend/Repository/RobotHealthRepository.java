package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.RobotHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RobotHealthRepository extends JpaRepository<RobotHealth, Long> {
}