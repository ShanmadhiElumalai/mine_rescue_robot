package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.MissionReplayService;
import com.rescuemission.backend.entity.MissionLog;
import com.rescuemission.backend.entity.RobotLocation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mission-replay")
@RequiredArgsConstructor
public class MissionReplayController {

    private final MissionReplayService service;

    @GetMapping("/{missionId}")
    public ResponseEntity<List<MissionLog>> getReplayData(
            @PathVariable Long missionId) {
        return ResponseEntity.ok(service.getReplayData(missionId));
    }

    @GetMapping("/{missionId}/path")
    public ResponseEntity<List<RobotLocation>> getRobotPath(
            @PathVariable Long missionId) {
        return ResponseEntity.ok(service.getRobotPath(missionId));
    }

    @PostMapping("/{missionId}/play")
    public ResponseEntity<Map<String, Object>> play(
            @PathVariable Long missionId) {
        return ResponseEntity.ok(Map.of(
                "missionId", missionId,
                "status", "PLAYING"
        ));
    }

    @PostMapping("/{missionId}/pause")
    public ResponseEntity<Map<String, Object>> pause(
            @PathVariable Long missionId) {
        return ResponseEntity.ok(Map.of(
                "missionId", missionId,
                "status", "PAUSED"
        ));
    }

    @PostMapping("/{missionId}/speed/{speed}")
    public ResponseEntity<Map<String, Object>> setSpeed(
            @PathVariable Long missionId,
            @PathVariable Double speed) {

        if (speed <= 0) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Replay speed must be greater than 0"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "missionId", missionId,
                "replaySpeed", speed
        ));
    }
    @GetMapping("/{missionId}/timeline")
public ResponseEntity<Map<String, Object>> getReplayTimeline(
        @PathVariable Long missionId) {

    return ResponseEntity.ok(Map.of(
            "missionId", missionId,
            "logs", service.getReplayData(missionId),
            "robotPath", service.getRobotPath(missionId)
    ));
}
}