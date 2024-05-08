import { Socket } from "socket.io";
import { SocketIO } from "../types/common";

export async function updateRoomJoinRoom({ roomId }: { roomId: string }) {
  return { isSuccess: true };
}

export function updateRoomLeaveRoom({ uid }: { uid: string }) {
  return { isSuccess: true };
}
