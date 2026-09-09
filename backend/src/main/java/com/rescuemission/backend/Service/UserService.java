package com.rescuemission.backend.Service;

import com.rescuemission.backend.entity.User;
import com.rescuemission.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    public User create(User entity) {
        return repository.save(entity);
    }

    public User update(Long id, User entity) {

        User existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setName(entity.getName());
        existing.setEmail(entity.getEmail());
        existing.setPassword(entity.getPassword());
        existing.setRole(entity.getRole());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
