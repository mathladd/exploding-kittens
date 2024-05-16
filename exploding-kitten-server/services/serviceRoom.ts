import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import {
  createRoom,
  readRoom,
  updateRoomJoinRoom,
  updateRoomLeaveRoom,
} from "../repo/repoRoom";
import { SocketData } from "../../types/auth";

export const onRoomGetLobby = async ({
  socket,
  io,
  uid,
}: {
  socket: Socket;
  io: SocketIO;
  uid: string;
}) => {
  socket.emit("onRoomGetLobby", await onRoomGetRoom({ socket, io, uid }));
};

export const onRoomCreateRoom = async ({
  socket,
  io,
  uid,
  roomName,
  maxPlayers,
}: {
  socket: Socket;
  io: SocketIO;
  uid: string;
  roomName: string;
  maxPlayers: number;
}) => {
  const data = await createRoom({ hostId: uid, roomName, maxPlayers });
  const lobby = await onRoomGetRoom({ socket, io, uid });
  !!data && !!lobby && io.emit("onRoomGetLobby", lobby);
};

export const onRoomGetRoom = async ({
  socket,
  io,
  uid,
  roomId,
}: {
  socket: Socket;
  io: SocketIO;
  uid: string;
  roomId?: string;
}) => {
  const room = await readRoom({ roomId });
  if (room.isSuccess === false) return null;
  const data = {
    rooms:
      room?.data?.map((row) => ({
        roomId: String(row?.room_id),
        roomName: row?.room_name,
        hostId: String(row?.host_id),
        hostname: row?.host_name,
        playerCount: row?.player_count,
        maxPlayers: row?.max_players,
      })) ?? [],
  };
  return data;
};

export const onRoomJoinRoom = async ({
  socket,
  io,
  roomId,
}: {
  socket: Socket;
  io: SocketIO;
  roomId: string;
}) => {
  if (socket.rooms.size > 1) {
    socket.emit("onRoomJoinRoom", {
      player: {
        uid: socket.data.uid,
        username: socket.data.username,
      } as SocketData,
      roomId,
      isSuccess: false,
    });
  } else {
    socket.join(roomId);
    const data = await updateRoomJoinRoom({ roomId });
    const isSuccess = data?.isSuccess;
    io.in(roomId).emit("onRoomJoinRoom", {
      player: {
        uid: socket.data.uid,
        username: socket.data.username,
      } as SocketData,
      roomId,
      isSuccess,
    });
  }
};

export const onRoomLeaveRoom = ({
  socket,
  io,
  uid,
}: {
  socket: Socket;
  io: SocketIO;
  uid: string;
}) => {
  socket.rooms.forEach(async (room) => {
    const data = await updateRoomLeaveRoom({ uid });
    const isSuccess = data?.isSuccess;
    io.in(room).emit("onRoomLeaveRoom", {
      player: {
        uid: socket.data.uid,
        username: socket.data.username,
        accessToken: "",
      } as SocketData,
      isSuccess,
    });
    socket.leave(room);
  });
};
