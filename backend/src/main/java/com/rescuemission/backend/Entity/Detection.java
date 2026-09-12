package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "detections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Detection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "detection_type")
    private String detectionType;

    private Double confidence;

    private String severity;

    private Double latitude;

    private Double longitude;

    @Column(name = "body_temperature")
    private Double bodyTemperature;

    @Column(name = "environment_temperature")
    private Double environmentTemperature;

    private Double distance;

    @Column(name = "confirmation_status")
    private String confirmationStatus;

    @Column(name = "sensor_count")
    private Integer sensorCount;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "detected_at")
    private LocalDateTime detectedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}