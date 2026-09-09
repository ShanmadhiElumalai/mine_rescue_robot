package com.rescuemission.backend.Repository;

import com.rescuemission.backend.entity.TTECommunication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TTECommunicationRepository extends JpaRepository<TTECommunication, Long> {
}
