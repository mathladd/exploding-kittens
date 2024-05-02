import { Socket } from "socket.io";
import { SocketIO } from "../types/common";

export function roomJoinRoom(socket: Socket, io: SocketIO, roomId: string) {
  return { isSuccess: true };
}
