package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.SearchCoverage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchCoverageRepository extends JpaRepository<SearchCoverage, Long> {
}