package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tte_communications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TTECommunication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "connection_status")
    private String connectionStatus;

    @Column(name = "communication_percentage")
    private Double communicationPercentage;

    @Column(name = "signal_strength")
    private Double signalStrength;

    private Double latency;

    @Column(name = "data_transmitted")
    private Double dataTransmitted;

    @Column(name = "connection_quality")
    private String connectionQuality;

    @Column(name = "communication_fault")
    private Boolean communicationFault;

    @Column(name = "predicted_status")
    private String predictedStatus;

    @Column(name = "prediction_confidence")
    private Double predictionConfidence;

    @Column(name = "estimated_loss_time")
    private LocalDateTime estimatedLossTime;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}