package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.RobotCommand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RobotCommandRepository extends JpaRepository<RobotCommand, Long> {
}