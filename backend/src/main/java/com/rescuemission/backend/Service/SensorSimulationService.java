package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;

@Service
public class SensorSimulationService {

    private final Random random = new Random();

    public Map<String, Double> generateSensorData() {

        Map<String, Double> data = new LinkedHashMap<>();

        // Underground environmental sensor simulation

        // Oxygen: normal underground range around 19-21%
        data.put("oxygen", round(18.0 + random.nextDouble() * 3.0));

        // Carbon Monoxide: ppm
        data.put("co", round(random.nextDouble() * 200.0));

        // Carbon Dioxide: ppm
        data.put("co2", round(400.0 + random.nextDouble() * 1600.0));

        // Methane: percentage
        data.put("methane", round(random.nextDouble() * 5.0));

        // Temperature: Celsius
        data.put("temperature", round(25.0 + random.nextDouble() * 25.0));

        // Humidity: percentage
        data.put("humidity", round(40.0 + random.nextDouble() * 50.0));

        return data;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
