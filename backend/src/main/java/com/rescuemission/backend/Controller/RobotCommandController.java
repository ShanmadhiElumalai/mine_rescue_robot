package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.RobotCommandService;
import com.rescuemission.backend.entity.RobotCommand;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class RobotCommandController {

    private final RobotCommandService service;

    public RobotCommandController(RobotCommandService service) {
        this.service = service;
    }

    @GetMapping
    public List<RobotCommand> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RobotCommand> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RobotCommand create(@RequestBody RobotCommand entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public RobotCommand update(
            @PathVariable Long id,
            @RequestBody RobotCommand entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
