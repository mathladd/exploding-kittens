import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { onRoomLeaveRoom } from "../services/serviceRoom";
import { UserAnnounceSocketConnection } from "../../types/eventsServerToClient";

export const handlerUser = (socket: Socket, io: SocketIO) => {
  socket.on("userLogin", (params: UserAnnounceSocketConnection) => {
    socket.data = { uid: params?.uid, username: params?.username };
    socket.emit("userAnnounceSocketConnection", params);
    console.log(socket.data);
  });

  socket.on("disconnecting", () => {
    onRoomLeaveRoom({ socket, io, uid: socket.data.uid });
  });
  socket.on("disconnect", () => {
    onRoomLeaveRoom({ socket, io, uid: socket.data.uid });
    console.log(`user ${socket.data.uid} disconnected\n`);
  });
};
