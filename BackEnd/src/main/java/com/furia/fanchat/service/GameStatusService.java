package com.furia.fanchat.service;

import com.furia.fanchat.model.GameStatus;
import com.furia.fanchat.repository.GameStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameStatusService {

    private final GameStatusRepository gameStatusRepository;

    public GameStatus getCurrentStatus() {
        return gameStatusRepository.findFirstByOrderByIdDesc();
    }

    public GameStatus updateStatus(GameStatus status) {
        return gameStatusRepository.save(status);
    }
}