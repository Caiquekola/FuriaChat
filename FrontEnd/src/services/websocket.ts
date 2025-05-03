import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, Match } from '../types';

const SOCKET_URL = 'http://localhost:8080/ws';
const CHAT_TOPIC = '/topic/messages';
const GAME_STATUS_TOPIC = '/topic/game-status';

class WebSocketService {
  private client: Client;
  private messageHandlers: ((message: Message) => void)[] = [];
  private gameStatusHandlers: ((status: Match) => void)[] = [];

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToTopics();
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        setTimeout(() => this.client.activate(), 2000); // Reconnect after 5 seconds  
      },
      onStompError: (frame) => {
        console.error('WebSocket error:', frame);
      }
    });
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  private subscribeToTopics() {
    this.client.subscribe(CHAT_TOPIC, (message) => {
      const chatMessage = JSON.parse(message.body);

      const formattedMessage: Message = {
        ...chatMessage,
        sender: {
          id: chatMessage.senderId || "unknown",
          username: chatMessage.senderUsername || "Usuário desconhecido",
          avatar: chatMessage.senderAvatar || ""
        },
        timestamp: (chatMessage.timestamp && !isNaN(new Date(chatMessage.timestamp).getTime()))
          ? new Date(chatMessage.timestamp)
          : new Date()
      };

      if (!formattedMessage.id) {
        console.warn("Mensagem inválida recebida do servidor", formattedMessage);
        return;
      }

      this.messageHandlers.forEach(handler => handler(formattedMessage));
    });

    this.client.subscribe(GAME_STATUS_TOPIC, (message) => {
      const gameStatus = JSON.parse(message.body);
      this.gameStatusHandlers.forEach(handler => handler(gameStatus));
    });
  }



  sendMessage(message: Partial<Message>) {
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
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