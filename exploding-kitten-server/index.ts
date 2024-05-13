import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents } from "../types/eventsClientToServer";
import {
  ServerToClientEvents,
  UserAnnounceSocketConnection,
} from "../types/eventsServerToClient";
import { InterServerEvents } from "../types/eventsOther";
import { CLIENT_URL } from "../constants";
import { handlerUser } from "./handlers/handlerUser";
import { handlerRoom } from "./handlers/handlerRoom";
import { handlerGame } from "./handlers/handlerGame";
import { query } from "./helpers/db";
import { onCreateMe, onGetMe } from "./services/serviceUser";
import { SocketData } from "../types/auth";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
};

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

try {
  const result = query({ text: "SELECT * FROM users" });
  console.log(result);
} catch (err) {
  console.error(err);
}

app.post("/user/create", cors(corsOptions), async (req, res) => {
  console.log("11111", req.body);
  const user = await onCreateMe({
    username: req?.body.username,
    passhash: req?.body.passhash,
    email: req?.body.email ?? undefined,
  });
  res.json(user);
});

app.post("/user/me", cors(corsOptions), async (req, res) => {
  console.log("11111", req.body);
  const user = await onGetMe({
    username: req?.body.username,
    passhash: req?.body.passhash,
  });
  res.json(user);
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: corsOptions });

// const count = io.engine.clientsCount;
// const roomSize = Number(io.sockets.adapter.rooms.get(roomId)?.size);
const onConnection = (socket: Socket) => {
  socket.data = {
    uid: socket.id,
    username: socket.id,
  } as SocketData;

  const userAnnounceSocketConnection: UserAnnounceSocketConnection = {
    uid: socket.data.uid,
    username: socket.data.username,
    email: "",
    createdAt: new Date(),
    lastLoginAt: new Date(),
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
