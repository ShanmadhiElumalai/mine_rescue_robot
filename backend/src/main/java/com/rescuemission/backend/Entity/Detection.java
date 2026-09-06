package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "detections")
@Getter
@Setter
public class Detection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "detection_type", nullable = false)
    private String detectionType;

    private Double confidence;

    private String severity;

    private Double latitude;

    private Double longitude;

    @Column(length = 1000)
    private String description;

    @Column(name = "detected_at", nullable = false)
    private LocalDateTime detectedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}