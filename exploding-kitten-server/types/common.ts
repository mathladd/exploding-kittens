import { Server } from "socket.io";
import { ClientToServerEvents } from "../../types/eventsClientToServer.ts";
import { ServerToClientEvents } from "../../types/eventsServerToClient.ts";
import { InterServerEvents, SocketData } from "../../types/eventsOther.ts";

export type SocketIO = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
