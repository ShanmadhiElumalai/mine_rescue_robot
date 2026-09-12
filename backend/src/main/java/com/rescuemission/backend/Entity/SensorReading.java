package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "sensor_readings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sensor_type")
    private String sensorType;

    private Double value;

    private String unit;

    private Double confidence;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}