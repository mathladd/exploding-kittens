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

app.post("/user/me", cors(corsOptions), async (req, res) => {
  console.log("11111", req.headers.authorization);
  // const user = await onGetMe({ saltedData: req?.body.saltedData });
  // res.json(user);
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
