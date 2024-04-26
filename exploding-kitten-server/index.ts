import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents } from "../types/eventsClientToServer.ts";
import { ServerToClientEvents } from "../types/eventsServerToClient.ts";
import { InterServerEvents, SocketData } from "../types/eventsOther.ts";
import { CLIENT_URL } from "../constants";
import { handlerUser } from "./handlers/handlerUser";
import { handlerRoom } from "./handlers/handlerRoom";
import { handlerGame } from "./handlers/handlerGame";
import { announceConnect } from "./services/serviceUser";

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
  socket.data.id = socket.id;
  socket.data.username = "abc";
  socket.data.accessToken = "myAccessToken";

  announceConnect(socket, io);
  handlerUser(socket, io);
  handlerRoom(socket, io);
  handlerGame(socket, io);
};

io.on("connection", onConnection);
server.listen(8000, () => {
  console.log("listening on port 8000");
});
