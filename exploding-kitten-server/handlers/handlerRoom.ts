import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { RoomGetLobby, RoomJoinRoom } from "../../types/eventsClientToServer";
import { roomJoinRoom, roomLeaveRoom } from "../services/serviceRoom";
import { SocketData } from "../../types/eventsOther";
import { ROOMS } from "../mockData/lobby";

export const handlerRoom = (socket: Socket, io: SocketIO) => {
  socket.on("roomGetLobby", ({ uid }: RoomGetLobby) => {
    socket.emit("onRoomGetLobby", { rooms: ROOMS });
  });

  socket.on("roomJoinRoom", async ({ roomId }: RoomJoinRoom) => {
    if (socket.rooms.size > 1) {
      socket.emit("onRoomJoinRoom", {
        player: {
          uid: socket.data.uid,
          username: socket.data.username,
          accessToken: "",
        } as SocketData,
        roomId,
        isSuccess: false,
      });
    } else {
      socket.join(roomId);
      const data = await roomJoinRoom(socket, io, roomId);
      const isSuccess = data?.isSuccess;
      io.in(roomId).emit("onRoomJoinRoom", {
        player: {
          uid: socket.data.uid,
          username: socket.data.username,
          accessToken: "",
        } as SocketData,
        roomId,
        isSuccess,
      });
    }
  });

  socket.on("roomLeaveRoom", async ({ uid }) => {
    socket.rooms.forEach(async (room) => {
      const data = await roomLeaveRoom(socket, io, uid);
      const isSuccess = data?.isSuccess;
      io.in(room).emit("onRoomLeaveRoom", {
        player: {
          uid: socket.data.uid,
          username: socket.data.username,
          accessToken: "",
        } as SocketData,
        isSuccess,
      });
      socket.leave(room);
    });
  });

  // works when broadcast to all
  io.emit("gameBroadcastTurn", { playerId: "1" });
  // works when broadcasting to a room
  io.to("room1").emit("gameBroadcastTurn", { playerId: "1" });
};
