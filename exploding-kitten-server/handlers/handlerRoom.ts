import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { RoomGetLobby, RoomJoinRoom } from "../../types/eventsClientToServer";
import {
  onRoomCreateRoom,
  onRoomGetLobby,
  onRoomJoinRoom,
  onRoomLeaveRoom,
} from "../services/serviceRoom";

export const handlerRoom = (socket: Socket, io: SocketIO) => {
  socket.on("roomGetLobby", async ({ uid }: RoomGetLobby) => {
    onRoomGetLobby({ socket, io, uid });
  });

  socket.on("roomJoinRoom", ({ roomId }: RoomJoinRoom) => {
    onRoomJoinRoom({ socket, io, roomId });
  });

  socket.on("roomLeaveRoom", ({ uid }) => onRoomLeaveRoom({ socket, io, uid }));

  socket.on("roomCreateRoom", ({ uid, roomName, maxPlayers }) => {
    onRoomCreateRoom({ socket, io, uid, roomName, maxPlayers });
  });

  // works when broadcast to all
  // io.emit("gameBroadcastTurn", { playerId: "1" });
  // works when broadcasting to a room
  // io.to("room1").emit("gameBroadcastTurn", { playerId: "1" });
};
