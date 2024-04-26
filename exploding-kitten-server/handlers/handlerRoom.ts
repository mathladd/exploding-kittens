import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { RoomJoinRoom } from "../../types/eventsClientToServer";
import { roomAnnounceJoin } from "../services/serviceRoom";

export const handlerRoom = (socket: Socket, io: SocketIO) => {
  const onJoinRoom = () => {
    socket.on("roomJoinRoom", ({ roomId }: RoomJoinRoom) => {
      socket.join(roomId);
      roomAnnounceJoin(socket, io, roomId);
    });
  };

  // works when broadcast to all
  io.emit("gameBroadcastTurn", { playerId: "1" });
  // works when broadcasting to a room
  io.to("room1").emit("gameBroadcastTurn", { playerId: "1" });

  onJoinRoom();
};
