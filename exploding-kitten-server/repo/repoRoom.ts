import { query } from "../helpers/db";
import { dbErrorStatus, dbSuccessStatus } from "../template/api";
import { ROOM_TABLE, USER_TABLE } from "../constants/dbTables";
import { TableRoomSchema, TableUserSchema } from "../types/repo";

export async function updateRoomJoinRoom({ roomId }: { roomId: string }) {
  return { isSuccess: true };
}

export async function createRoom({
  hostId,
  roomName,
  maxPlayers,
}: {
  hostId: string;
  roomName: string;
  maxPlayers: number;
}) {
  try {
    const insertCreatedAt = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const result = await query<TableRoomSchema>({
      text: `
      INSERT INTO ${ROOM_TABLE} (host_id, room_name, player_count, max_players, created_at, last_joined) 
        VALUES ('${hostId}', '${roomName}', 1, '${maxPlayers}', '${insertCreatedAt}', '${insertCreatedAt}');`,
    });
    return { ...dbSuccessStatus, data: null };
  } catch (err) {
    return { ...dbErrorStatus, data: null };
  }
}

export async function readRoom({ roomId }: { roomId?: string }) {
  try {
    let insertRoomId = "";
    if (roomId) insertRoomId = `AND ${ROOM_TABLE}.room_id = '${roomId}'`;
    const result = await query<TableRoomSchema & { host_name: string }>({
      text: `
      SELECT 
        ${ROOM_TABLE}.room_id,
        ${ROOM_TABLE}.room_name,
        ${ROOM_TABLE}.host_id,
        ${USER_TABLE}.username AS host_name,
        ${ROOM_TABLE}.player_count,
        ${ROOM_TABLE}.max_players
      FROM ${ROOM_TABLE} 
        INNER JOIN ${USER_TABLE} ON ${USER_TABLE}.uid = ${ROOM_TABLE}.host_id
        WHERE 1=1
          ${insertRoomId};
        `,
    });

    return {
      ...dbSuccessStatus,
      data: result?.rows,
    };
  } catch (err) {
    return { ...dbErrorStatus, data: null };
  }
}

export function updateRoomLeaveRoom({ uid }: { uid: string }) {
  return { isSuccess: true };
}
