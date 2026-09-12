package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "search_zones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @Column(name = "zone_name")
    private String zoneName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer priority;

    private String status;

    @Column(name = "target_coverage_percentage")
    private Double targetCoveragePercentage;

    @Column(name = "boundary_coordinates", columnDefinition = "TEXT")
    private String boundaryCoordinates;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}