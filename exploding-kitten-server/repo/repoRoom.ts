import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { query } from "../helpers/db";
import { getErrorStatus, getSuccessStatus } from "../template/api";

const ROOM_TABLE = "rooms";

export async function updateRoomJoinRoom({ roomId }: { roomId: string }) {
  return { isSuccess: true };
}

export async function createRoom({
  uid,
  roomName,
  maxPlayers,
}: {
  uid: string;
  roomName: string;
  maxPlayers: number;
}) {
  try {
    const insertCreatedAt = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const result = await query({
      text: `INSERT INTO ${ROOM_TABLE} (host_id, room_name, max_players, created_at, last_joined) 
      VALUES ('${uid}', '${roomName}', '${maxPlayers}', '${insertCreatedAt}', '${insertCreatedAt}');`,
    });
    return getSuccessStatus(undefined);
  } catch (err) {
    return getErrorStatus(err);
  }
}

export function updateRoomLeaveRoom({ uid }: { uid: string }) {
  return { isSuccess: true };
}
