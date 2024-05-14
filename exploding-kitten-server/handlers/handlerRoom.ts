import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { RoomGetLobby, RoomJoinRoom } from "../../types/eventsClientToServer";
import { ROOMS } from "../mockData/lobby";
import { onRoomJoinRoom, onRoomLeaveRoom } from "../services/serviceRoom";

export const handlerRoom = (socket: Socket, io: SocketIO) => {
  socket.on("roomGetLobby", ({ uid }: RoomGetLobby) => {
    socket.emit("onRoomGetLobby", { rooms: ROOMS });
  });
  socket.on("roomJoinRoom", async ({ roomId }: RoomJoinRoom) => {
    onRoomJoinRoom({ socket, io, roomId });
  });
  socket.on("roomLeaveRoom", async ({ uid }) =>
    onRoomLeaveRoom({ socket, io, uid })
  );
  // socket.on("roomCreateRoom", )

  // works when broadcast to all
  // io.emit("gameBroadcastTurn", { playerId: "1" });
  // works when broadcasting to a room
  // io.to("room1").emit("gameBroadcastTurn", { playerId: "1" });
};
