export type RoomJoinRoom = { roomId: string };

export type GamePlaySeeFuture = { cardId: string; playerId?: string };
export type GamePlaySteal = { cardId: string; playerId?: string };

export type ClientToServerUserEvents = {};
export type ClientToServerRoomEvents = {
  roomJoinRoom: (args: RoomJoinRoom) => void;
};
export type ClientToServerGameEvents = {
  gamePlaySeeFuture: (args: GamePlaySeeFuture) => void;
  gamePlaySteal: (args: GamePlaySteal) => void;
};
export type ClientToServerEvents = ClientToServerUserEvents &
  ClientToServerRoomEvents &
  ClientToServerGameEvents;
