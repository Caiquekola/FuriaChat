// WebSocketService.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, Match } from '../types';

const SOCKET_URL = `${import.meta.env.VITE_BACKEND_URL}/ws`;
const CHAT_TOPIC = '/topic/messages';
const GAME_STATUS_TOPIC = '/topic/game-status';

class WebSocketService {
  private client: Client;
  private messageHandlers: ((message: Message) => void)[] = [];
  private gameStatusHandlers: ((status: Match) => void)[] = [];

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToTopics();
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (frame) => {
        console.error('WebSocket error:', frame);
      }
    });
  }

  connect() {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  disconnect() {
    this.client.deactivate();
  }

  private subscribeToTopics() {
    this.client.subscribe(CHAT_TOPIC, (message) => {
      try {
        const parsed = JSON.parse(message.body);
        
        // Formatação mínima garantida
        const formatted: Message = {
          id: parsed.id || `temp-${Date.now()}`,
          content: parsed.content || '[Mensagem sem conteúdo]',
          sender: {
            id: parsed.sender?.id || 'unknown',
            username: parsed.sender?.username || 'Usuário',
            avatar: parsed.sender?.avatar || '',
            isAdmin: Boolean(parsed.sender?.isAdmin)
          },
          timestamp: parsed.timestamp ? new Date(parsed.timestamp) : new Date(),
          reactions: Array.isArray(parsed.reactions) ? parsed.reactions : []
        };
        
        this.messageHandlers.forEach(h => h(formatted));
      } catch (error) {
        console.error('Erro ao processar mensagem:', error, message.body);
      }
    });
  }

  private validateMessage(rawMessage: any): Message {
    // Validação robusta
    if (!rawMessage?.content) {
      throw new Error('Invalid message content');
    }

    return {
      id: rawMessage.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: rawMessage.content,
      sender: {
        id: rawMessage.sender?.id || 'unknown',
        username: rawMessage.sender?.username || 'Usuário',
        avatar: rawMessage.sender?.avatar || 'https://i.pravatar.cc/150?u=unknown',
        isAdmin: Boolean(rawMessage.sender?.isAdmin)
      },
      timestamp: rawMessage.timestamp ? new Date(rawMessage.timestamp) : new Date(),
      reactions: Array.isArray(rawMessage.reactions) ? rawMessage.reactions : []
    };
  }

  sendMessage(message: Partial<Message>) {
    if (!this.client.connected) {
      console.warn('Cannot send message - WebSocket not connected');
      return;
    }

    const messageToSend = {
      ...message,
      timestamp: new Date().toISOString()
    };

    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(messageToSend)
    });
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  onGameStatus(handler: (status: Match) => void) {
    this.gameStatusHandlers.push(handler);
    return () => {
      this.gameStatusHandlers = this.gameStatusHandlers.filter(h => h !== handler);
    };
  }
}

export const websocketService = new WebSocketService();