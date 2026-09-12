package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "search_coverage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchCoverage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "search_zone_id", nullable = false)
    private SearchZone searchZone;

    @Column(name = "coverage_percentage")
    private Double coveragePercentage;

    @Column(name = "search_pass")
    private Integer searchPass;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;
}