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
import { query } from "./helpers/db";
import { onGetMe } from "./services/serviceUser";

const express = require("express");

const app = express();
const server = createServer(app);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression

try {
  const result = query({ text: "SELECT * FROM users" });
  console.log(result);
} catch (err) {
  console.error(err);
}

app.post("/user/me", (req, res) => {
  console.log("11111", req.body);
  onGetMe({ accessToken: req?.accessToken });
});

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
