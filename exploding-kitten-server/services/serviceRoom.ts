import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { SocketData } from "../../types/eventsOther";
import { updateRoomJoinRoom, updateRoomLeaveRoom } from "../repo/repoRoom";

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
        accessToken: "",
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
        accessToken: "",
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
