package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.Alert;
import com.rescuemission.backend.entity.Robot;
import com.rescuemission.backend.Repository.RobotRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AlertHistoryService {

    private final AlertService alertService;
    private final RobotRepository robotRepository;

    public AlertHistoryService(
            AlertService alertService,
            RobotRepository robotRepository) {

        this.alertService = alertService;
        this.robotRepository = robotRepository;
    }

    public void saveAlerts(List<Map<String, String>> alerts, Long robotId) {

        if (alerts == null || alerts.isEmpty()) {
            return;
        }

        Robot robot = robotRepository.findById(robotId)
                .orElseThrow(() ->
                        new RuntimeException("Robot not found with id: " + robotId));

        for (Map<String, String> alertData : alerts) {

            Alert alert = new Alert();

            alert.setAlertType(alertData.get("type"));
            alert.setSeverity(alertData.get("severity"));
            alert.setMessage(alertData.get("message"));
            alert.setSource("SAFETY_ENGINE");
            alert.setRecommendedAction(
                    alertData.get("recommendedAction")
            );
            alert.setStatus("ACTIVE");
            alert.setCreatedAt(LocalDateTime.now());
            alert.setResolvedAt(null);
            alert.setRobot(robot);
            alert.setMission(null);

            alertService.save(alert);
        }
    }
}

