package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "mission_logs")
@Getter
@Setter
public class MissionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "log_type", nullable = false)
    private String logType;

    @Column(nullable = false, length = 2000)
    private String message;

    @Column(name = "log_time", nullable = false)
    private LocalDateTime logTime;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}