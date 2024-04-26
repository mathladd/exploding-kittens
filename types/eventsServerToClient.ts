import { Player } from "./common";

export type UserAnnounceSocketConnection = { userId: string };

export type RoomAnnounceJoin = { player: Player; roomId: string };

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
  roomAnnounceJoin: (args: RoomAnnounceJoin) => void;
};
export type ServerToClientGameEvents = {
  gameBroadcastTurn: (args: GameBroadcastTurn) => void;
  gameBroadcastState: (args: GameBroadcastState) => void;
};

export type ServerToClientEvents = ServerToClientUserEvents &
  ServerToClientRoomEvents &
  ServerToClientGameEvents;
