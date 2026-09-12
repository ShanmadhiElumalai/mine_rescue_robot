package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.ContinuousSensorSimulationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/simulation")
public class ContinuousSensorSimulationController {

    private final ContinuousSensorSimulationService continuousSensorSimulationService;

    public ContinuousSensorSimulationController(
            ContinuousSensorSimulationService continuousSensorSimulationService) {

        this.continuousSensorSimulationService =
                continuousSensorSimulationService;
    }

    @GetMapping("/continuous")
    public Map<String, Object> getLatestReading() {

        return continuousSensorSimulationService.getLatestReading();
    }
}
