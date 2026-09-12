package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "risk_assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @Column(name = "risk_score")
    private Double riskScore;

    @Column(name = "risk_level")
    private String riskLevel;

    @Column(name = "safe_entry_percentage")
    private Double safeEntryPercentage;

    @Column(name = "gas_risk")
    private Double gasRisk;

    @Column(name = "temperature_risk")
    private Double temperatureRisk;

    @Column(name = "communication_risk")
    private Double communicationRisk;

    @Column(name = "robot_health_risk")
    private Double robotHealthRisk;

    @Column(name = "survivor_risk")
    private Double survivorRisk;

    private Double confidence;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    @Column(name = "assessed_at")
    private LocalDateTime assessedAt;

    @ManyToOne
    @JoinColumn(name = "robot_location_id")
    private RobotLocation robotLocation;
}