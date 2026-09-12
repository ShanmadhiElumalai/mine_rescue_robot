package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.SearchZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchZoneRepository extends JpaRepository<SearchZone, Long> {
}