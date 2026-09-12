package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotPartsHealthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/robot")
public class RobotPartsHealthController {

    private final RobotPartsHealthService robotPartsHealthService;

    public RobotPartsHealthController(
            RobotPartsHealthService robotPartsHealthService) {

        this.robotPartsHealthService = robotPartsHealthService;
    }

    @GetMapping("/parts-health")
    public Map<String, Object> getPartsHealth() {

        return robotPartsHealthService.generatePartsHealth();
    }
}
