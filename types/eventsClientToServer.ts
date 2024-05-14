import { PlayerData } from "./auth";

export type RoomGetLobby = { uid: string };
export type RoomJoinRoom = { roomId: string; uid: string };
export type RoomLeaveRoom = { uid: string };
export type UserLogin = PlayerData;

export type GamePlaySeeFuture = { cardId: string; playerId?: string };
export type GamePlaySteal = { cardId: string; playerId?: string };

export type ClientToServerUserEvents = {};
export type ClientToServerRoomEvents = {
  roomGetLobby: (args: RoomGetLobby) => void;
  roomJoinRoom: (args: RoomJoinRoom) => void;
  roomLeaveRoom: (args: RoomLeaveRoom) => void;
  userLogin: (args: UserLogin) => void;
};
export type ClientToServerGameEvents = {
  gamePlaySeeFuture: (args: GamePlaySeeFuture) => void;
  gamePlaySteal: (args: GamePlaySteal) => void;
};
export type ClientToServerEvents = ClientToServerUserEvents &
  ClientToServerRoomEvents &
  ClientToServerGameEvents;
