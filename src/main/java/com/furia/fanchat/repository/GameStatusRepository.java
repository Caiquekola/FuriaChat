package com.furia.fanchat.repository;

import com.furia.fanchat.model.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameStatusRepository extends JpaRepository<GameStatus, Long> {
    GameStatus findFirstByOrderByIdDesc();
}