package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "robot_health")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RobotHealth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "battery_level")
    private Double batteryLevel;

    private Double temperature;

    @Column(name = "health_status")
    private String healthStatus;

    @Column(name = "component_type")
    private String componentType;

    @Column(name = "health_score")
    private Double healthScore;

    @Column(name = "failure_detected")
    private Boolean failureDetected;

    @Column(name = "failure_description", columnDefinition = "TEXT")
    private String failureDescription;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}