package com.furia.fanchat.controller;

import com.furia.fanchat.model.GameStatus;
import com.furia.fanchat.service.GameStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/game")
public class GameStatusController {

    private final GameStatusService gameStatusService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/status")
    public GameStatus getCurrentStatus() {
        return gameStatusService.getCurrentStatus();
    }

    @PostMapping("/update")
    public GameStatus updateStatus(@RequestBody GameStatus status) {
        GameStatus updated = gameStatusService.updateStatus(status);
        messagingTemplate.convertAndSend("/topic/game-status", updated);
        return updated;
    }
}