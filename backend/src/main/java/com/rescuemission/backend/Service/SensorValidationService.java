package com.rescuemission.backend.Service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class SensorValidationService {

    public Map<String, String> validate(
            Map<String, Double> sensors) {

        Map<String, String> errors = new LinkedHashMap<>();

        if (sensors == null) {
            errors.put("sensors", "Sensor data cannot be null.");
            return errors;
        }

        validateRange(errors, sensors, "oxygen", 0.0, 100.0);
        validateRange(errors, sensors, "co", 0.0, 10000.0);
        validateRange(errors, sensors, "co2", 0.0, 10000.0);
        validateRange(errors, sensors, "methane", 0.0, 100.0);
        validateRange(errors, sensors, "temperature", -50.0, 100.0);
        validateRange(errors, sensors, "humidity", 0.0, 100.0);

        return errors;
    }

    private void validateRange(
            Map<String, String> errors,
            Map<String, Double> sensors,
            String name,
            double min,
            double max) {

        Double value = sensors.get(name);

        if (value == null) {
            errors.put(name, name + " value is required.");
            return;
        }

        if (value.isNaN() || value.isInfinite()) {
            errors.put(name, name + " must be a valid number.");
            return;
        }

        if (value < min || value > max) {
            errors.put(
                    name,
                    name + " must be between " + min + " and " + max + "."
            );
        }
    }
}
