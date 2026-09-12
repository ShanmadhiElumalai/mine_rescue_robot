package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "survivors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Survivor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "detection_id")
    private Detection detection;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    private Double latitude;

    private Double longitude;

    @Column(name= "survivor_condition")
    private String condition;

    @Column(name = "condition_confidence")
    private Double conditionConfidence;

    @Column(name = "priority_score")
    private Double priorityScore;

    private String status;

    @Column(name = "detected_at")
    private LocalDateTime detectedAt;

    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;

    @Column(name = "rescued_at")
    private LocalDateTime rescuedAt;
}