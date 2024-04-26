import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { UserAnnounceSocketConnection } from "../../types/eventsServerToClient";

export function announceConnect(socket: Socket, io: SocketIO) {
  const userAnnounceSocketConnection: UserAnnounceSocketConnection = {
    userId: socket.data.id,
  };
  socket.emit("userAnnounceSocketConnection", userAnnounceSocketConnection);
  console.log(`user ${socket.data.id} connected`);
}
