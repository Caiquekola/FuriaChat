import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, Match } from '../types';

const SOCKET_URL = `${import.meta.env.VITE_BACKEND_URL}/ws`;
const CHAT_TOPIC = '/topic/messages';

class WebSocketService {
  private client: Client;
  private messageHandlers: ((message: Message) => void)[] = [];
  private matchMessageHandlers: { [matchId: string]: ((message: Message) => void)[] } = {};

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToGlobalChat();
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

  // ------------------------------
  // GLOBAL CHAT
  // ------------------------------
  private subscribeToGlobalChat() {
    this.client.subscribe(CHAT_TOPIC, (message) => {
      try {
        const parsed = JSON.parse(message.body);
        this.messageHandlers.forEach(h => h(this.formatMessage(parsed)));
      } catch (error) {
        console.error('Erro no chat global:', error);
      }
    });
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  sendMessage(message: Partial<Message>) {
    if (!this.client.connected) return;

    const messageToSend = {
      ...message,
      timestamp: new Date().toISOString()
    };

    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(messageToSend)
    });
  }

  // ------------------------------
  // MATCH CHAT (dinâmico)
  // ------------------------------
  subscribeToMatch(matchId: string, handler: (message: Message) => void) {
    if (!this.matchMessageHandlers[matchId]) {
      this.matchMessageHandlers[matchId] = [];
    }

    this.matchMessageHandlers[matchId].push(handler);

    this.client.subscribe(`/topic/match/${matchId}`, (message) => {
      const parsed = JSON.parse(message.body);
      this.matchMessageHandlers[matchId]?.forEach(h => h(this.formatMessage(parsed)));
    });
  }

  sendMatchMessage(matchId: string, message: Partial<Message>) {
    if (!this.client.connected) return;

    const messageToSend = {
      ...message,
      timestamp: new Date().toISOString()
    };

    this.client.publish({
      destination: `/app/match/${matchId}`,
      body: JSON.stringify(messageToSend)
    });
  }

  private formatMessage(raw: any): Message {
    return {
      id: raw.id || `temp-${Date.now()}`,
      content: raw.content || '[Sem conteúdo]',
      sender: {
        id: raw.sender?.id || 'unknown',
        username: raw.sender?.username || 'Usuário',
        avatar: raw.sender?.avatar || '',
        isAdmin: Boolean(raw.sender?.isAdmin)
      },
      timestamp: raw.timestamp ? new Date(raw.timestamp) : new Date(),
      reactions: Array.isArray(raw.reactions) ? raw.reactions : []
    };
  }
}

export const websocketService = new WebSocketService();
