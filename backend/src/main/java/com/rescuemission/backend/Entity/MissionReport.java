package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "mission_reports")
@Getter
@Setter
public class MissionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 5000)
    private String summary;

    @Column(name = "total_distance")
    private Double totalDistance;

    @Column(name = "total_detections")
    private Integer totalDetections;

    @Column(name = "total_alerts")
    private Integer totalAlerts;

    @Column(name = "final_status", nullable = false)
    private String finalStatus;

    @Column(name = "generated_at", nullable = false)
    private LocalDateTime generatedAt;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;
}