package com.furia.fanchat.controller;

import com.furia.fanchat.model.ChatMessage;
import com.furia.fanchat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(ChatMessage message) {
        if(message.getId() == null) {
            message.setId(UUID.randomUUID().toString());
        }
        return chatService.saveAndBroadcast(message);
    }

    @GetMapping("/api/messages")
    public List<ChatMessage> getRecentMessages() {
        return chatService.getRecentMessages();
    }
}