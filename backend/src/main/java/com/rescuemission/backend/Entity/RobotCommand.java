package com.rescuemission.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "robot_commands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RobotCommand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "command_type")
    private String commandType;

    @Column(name = "command_value")
    private String commandValue;

    private String source;

    @Column(name = "approval_status")
    private String approvalStatus;

    private String status;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "executed_at")
    private LocalDateTime executedAt;

    @ManyToOne
    @JoinColumn(name = "robot_id", nullable = false)
    private Robot robot;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}