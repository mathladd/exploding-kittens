export type RoomGetLobby = { uid: number };
export type RoomJoinRoom = { roomId: string; uid: number };
export type RoomLeaveRoom = { uid: number };

export type GamePlaySeeFuture = { cardId: string; playerId?: string };
export type GamePlaySteal = { cardId: string; playerId?: string };

export type ClientToServerUserEvents = {};
export type ClientToServerRoomEvents = {
  roomGetLobby: (args: RoomGetLobby) => void;
  roomJoinRoom: (args: RoomJoinRoom) => void;
  roomLeaveRoom: (args: RoomLeaveRoom) => void;
};
export type ClientToServerGameEvents = {
  gamePlaySeeFuture: (args: GamePlaySeeFuture) => void;
  gamePlaySteal: (args: GamePlaySteal) => void;
};
export type ClientToServerEvents = ClientToServerUserEvents &
  ClientToServerRoomEvents &
  ClientToServerGameEvents;
