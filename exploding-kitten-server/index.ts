import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents } from "../types/eventsClientToServer";
import {
  ServerToClientEvents,
  UserAnnounceSocketConnection,
} from "../types/eventsServerToClient";
import { InterServerEvents, SocketData } from "../types/eventsOther";
import { CLIENT_URL } from "../constants";
import { handlerUser } from "./handlers/handlerUser";
import { handlerRoom } from "./handlers/handlerRoom";
import { handlerGame } from "./handlers/handlerGame";

const express = require("express");
const app = express();
const server = createServer(app);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: { origin: CLIENT_URL } });

// const count = io.engine.clientsCount;
// const roomSize = Number(io.sockets.adapter.rooms.get(roomId)?.size);
const onConnection = (socket: Socket) => {
  socket.data = {
    uid: socket.id,
    username: socket.id,
    accessToken: "myAccessToken",
  } as SocketData;

  const userAnnounceSocketConnection: UserAnnounceSocketConnection = {
    uid: socket.data.uid,
    username: socket.data.username,
    accessToken: socket.data.accessToken,
  };
  socket.emit("userAnnounceSocketConnection", userAnnounceSocketConnection);
  console.log(`user ${socket.data.uid} connected`);

  handlerUser(socket, io);
  handlerRoom(socket, io);
  handlerGame(socket, io);
};

io.on("connection", onConnection);
server.listen(8000, () => {
  console.log("listening on port 8000");
});
