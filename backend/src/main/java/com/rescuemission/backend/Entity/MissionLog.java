package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mission_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "log_type")
    private String logType;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "log_time")
    private LocalDateTime logTime;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}