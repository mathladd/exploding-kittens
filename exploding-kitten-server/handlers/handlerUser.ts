import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { UserAnnounceSocketConnection } from "../../types/eventsServerToClient";
import { onRoomLeaveRoom } from "../services/serviceRoom";

export const handlerUser = (socket: Socket, io: SocketIO) => {
  socket.on("disconnecting", () => {
    onRoomLeaveRoom({ socket, io, uid: socket.data.uid });
  });
  socket.on("disconnect", () => {
    console.log(`user ${socket.data.uid} disconnected\n`);
  });
};
