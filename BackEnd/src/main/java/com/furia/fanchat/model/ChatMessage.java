package com.furia.fanchat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class ChatMessage {
    @Id
    private String id;
    private String content;
    private String senderId;
    private String senderUsername;
    private String senderAvatar;
    private boolean isAdmin;
    private LocalDateTime timestamp;
}