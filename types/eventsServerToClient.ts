import { SocketData, PlayerData } from "./auth";

export type UserAnnounceSocketConnection = PlayerData;

export type Room = {
  roomId: string;
  roomName: string;
  hostId: string;
  hostname: string;
  playerCount: number;
  maxPlayers: number;
};

export type OnRoomGetLobby = {
  rooms: Room[];
};

export type AnnouncementCategory = "INFO" | "EVENT" | "ALERT" | "ERROR";

export type Announcement = {
  text: string;
  type: AnnouncementCategory;
};

export type OnRoomJoinRoom = {
  player: SocketData;
  roomId: string;
  isSuccess: boolean;
};

export type OnRoomLeaveRoom = {
  player: SocketData;
  isSuccess: boolean;
};

export type GameBroadcastTurn = { playerId: string };
export type GameBroadcastState = {
  players: { playerId: string; numCards: number }[];
  deckLength: number;
  currentTurn: number;
};

export type ServerToClientUserEvents = {
  userAnnounceSocketConnection: (args: UserAnnounceSocketConnection) => void;
};
export type ServerToClientRoomEvents = {
  onRoomGetLobby: (args: OnRoomGetLobby) => void;
  onRoomJoinRoom: (args: OnRoomJoinRoom) => void;
  onRoomLeaveRoom: (args: OnRoomLeaveRoom) => void;
  announcement: (args: Announcement) => void;
};
export type ServerToClientGameEvents = {
  gameBroadcastTurn: (args: GameBroadcastTurn) => void;
  gameBroadcastState: (args: GameBroadcastState) => void;
};

export type ServerToClientEvents = ServerToClientUserEvents &
  ServerToClientRoomEvents &
  ServerToClientGameEvents;
