import { Socket } from "socket.io";
import { SocketIO } from "../types/common";

export const handlerUser = (socket: Socket, io: SocketIO) => {
  const onDisconnect = () => {
    socket.on("disconnect", () => {
      console.log(`user ${socket.data.id} disconnected\n`);
    });
  };

  onDisconnect();
};
