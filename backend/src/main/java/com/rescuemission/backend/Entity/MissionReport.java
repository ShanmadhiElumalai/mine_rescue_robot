package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mission_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "total_distance")
    private Double totalDistance;

    @Column(name = "total_detections")
    private Integer totalDetections;

    @Column(name = "total_alerts")
    private Integer totalAlerts;

    @Column(name = "coverage_percentage")
    private Double coveragePercentage;

    @Column(name = "survivors_detected")
    private Integer survivorsDetected;

    @Column(name = "highest_risk_score")
    private Double highestRiskScore;

    @Column(name = "mission_efficiency")
    private Double missionEfficiency;

    @Column(name = "final_status")
    private String finalStatus;

    @Column(name = "generated_at")
    private LocalDateTime generatedAt;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;
}