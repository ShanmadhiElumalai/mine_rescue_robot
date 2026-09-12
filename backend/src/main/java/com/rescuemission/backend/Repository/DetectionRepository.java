package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.Detection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
}