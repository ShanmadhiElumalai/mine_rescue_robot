package com.rescuemission.backend.Controller;

import com.rescuemission.backend.Service.TTECommunicationService;
import com.rescuemission.backend.entity.TTECommunication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s")
public class TTECommunicationController {

    private final TTECommunicationService service;

    public TTECommunicationController(TTECommunicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<TTECommunication> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TTECommunication> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TTECommunication create(@RequestBody TTECommunication entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public TTECommunication update(
            @PathVariable Long id,
            @RequestBody TTECommunication entity) {
        return service.update(id, entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
