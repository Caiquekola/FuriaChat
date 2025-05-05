#  FURIA FAN CHAT 🖤

Uma plataforma interativa em tempo real desenvolvida para aproximar a torcida da FURIA Esports!

##  Visão Geral 🎯

O **FURIA FAN CHAT** oferece uma experiência única para fãs:

- **Chat Global** para todos os torcedores se conectarem
- **Chat por Partidas** para debater os jogos em andamento
- **Agenda de Jogos** simulada para acompanhar partidas futuras
- **Sistema de Usuário** com login rápido e avatar personalizado


Criamos uma comunidade engajada onde os fãs:

✅ Conversam ao vivo  
✅ Acompanham partidas em andamento 
✅ Interagem com outros torcedores em tempo real


## 🧩 Estrutura do Projeto

/backend

├── controller

├── model

├── repository

├── service

└── App.java

/frontend (React + Vite)

├── components

│ ├── Chat (ChatHeader, MessageList, MessageItem, MessageInput)

│ ├── GameStatus (LiveMatch, GameStatus)

│ ├── Navbar (Menu e Navegação)

│ └── Modal (AuthModal, ProfileModal)

├── pages (HomePage, MatchesPage, MatchChat)

└── services (WebSocketService.ts)

## 🚀 Tecnologias Utilizadas

### Frontend

- **React + Vite**
- **TailwindCSS**
- **Lucide React Icons**
- **Emoji Picker**
- **React Hot Toast**

### Backend

- **Spring Boot (API REST + WebSockets + JPA)**
- **Banco de Dados (PostgreSQL)**
- **WebSocket (STOMP + SockJS)**

### Hospedagem

- **Netlify** (Frontend)
- **Render** (Backend)

---

## 💬 Sistema de Chat

### Chat Global

- Todos os usuários podem conversar em tempo real
- WebSocket com histórico salvo no backend
- Notificações para mensagens enviadas

### Chat por Partidas

- Cada jogo tem seu próprio chat
- WebSocket dedicado por jogo
- Mensagens organizadas e persistentes

---

## 🕹️ Relação com Jogos

- **Matches Page** → Jogos simulados para discussão
- **GameStatus** → Partidas em andamento com mapa, rodada e destaques
- **Chat por Match** → Discussão em tempo real sobre a partida

O usuário sente que está na arena, ao lado de outros fãs!

---

## 📡 WebSockets

Utilizamos **STOMP + SockJS** para comunicação instantânea:

- `/topic/messages` → Chat Global
- `/topic/match-messages/{matchId}` → Chat por partida

O backend recebe, armazena e transmite as mensagens para todos os conectados.

---

## 👥 Sistema de Usuários

- Modal de criação ao tentar enviar mensagem não logado
- Nickname e avatar aleatório
- Persistência no backend para manter o perfil

---

## 🖥️ Experiência do Usuário

- Home com background da FURIA e título com glow
- Botão chamativo para o chat global
- Design responsivo e bonito com dark mode
- Toasts e animações para experiência fluida
- Navegação simples via Navbar

---

## 📦 Deployment

- **Netlify** → Frontend hospedado com _redirects para rotas SPA
- **Render** → Backend com WebSockets e banco de dados
- **CORS** → Permitido apenas para o domínio oficial

---

## 📈 Melhorias Futuras

- Sistema de reações
- Perfis completos
- Ranking de torcedores mais ativos
- Notificações de push para jogos importantes
- API oficial de partidas reais

---


## 👨‍💻 Desenvolvido por

[Caique Augusto](http://www.linkedin.com/in/caique-augusto-braga "Caique Augusto") - apaixonado por tecnologia, jogos competitivos e fã da FURIA.
