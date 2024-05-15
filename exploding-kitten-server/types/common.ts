import { Server } from "socket.io";
import { ClientToServerEvents } from "../../types/eventsClientToServer.ts";
import { ServerToClientEvents } from "../../types/eventsServerToClient.ts";
import { InterServerEvents } from "../../types/eventsOther.ts";
import { SocketData } from "../../types/auth.ts";

export type SocketIO = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
