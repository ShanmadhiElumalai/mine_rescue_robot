package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tte_communications")
@Getter
@Setter
public class TTECommunication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "connection_status", nullable = false)
    private String connectionStatus;

    @Column(name = "signal_strength")
    private Double signalStrength;

    private Double latency;

    @Column(name = "data_transmitted")
    private Double dataTransmitted;

    @Column(name = "connection_quality")
    private String connectionQuality;

    @Column(name = "communication_fault", length = 1000)
    private String communicationFault;

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;
}