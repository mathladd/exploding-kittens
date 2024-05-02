import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { UserAnnounceSocketConnection } from "../../types/eventsServerToClient";

export const handlerUser = (socket: Socket, io: SocketIO) => {
  socket.on("disconnect", () => {
    console.log(`user ${socket.data.uid} disconnected\n`);
  });
};
