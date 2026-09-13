package com.rescuemission.backend.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GasHazardSimulationService {

    public List<Map<String, Object>> generateHazardMap() {

        List<Map<String, Object>> hazards = new ArrayList<>();

        hazards.add(Map.of(
                "latitude", 13.1185,
                "longitude", 80.1542,
                "gasType", "METHANE",
                "concentration", 0.4,
                "riskLevel", "SAFE",
                "zone", "ZONE-A"
        ));

        hazards.add(Map.of(
                "latitude", 13.1190,
                "longitude", 80.1548,
                "gasType", "METHANE",
                "concentration", 1.5,
                "riskLevel", "WARNING",
                "zone", "ZONE-B"
        ));

        hazards.add(Map.of(
                "latitude", 13.1196,
                "longitude", 80.1555,
                "gasType", "METHANE",
                "concentration", 2.8,
                "riskLevel", "HIGH",
                "zone", "ZONE-C"
        ));

        hazards.add(Map.of(
                "latitude", 13.1202,
                "longitude", 80.1561,
                "gasType", "METHANE",
                "concentration", 4.5,
                "riskLevel", "CRITICAL",
                "zone", "ZONE-D"
        ));

        return hazards;
    }
}
