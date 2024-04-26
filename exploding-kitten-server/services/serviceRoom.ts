import { Socket } from "socket.io";
import { SocketIO } from "../types/common";

export function roomAnnounceJoin(socket: Socket, io: SocketIO, roomId: string) {
  io.in(roomId).emit("roomAnnounceJoin", {
    player: { id: socket.id, label: socket.data.username, cards: [] },
    roomId,
  });
}
