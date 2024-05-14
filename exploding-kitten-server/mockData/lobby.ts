import { Room } from "../../types/eventsServerToClient";

export const ROOMS = [
  { roomId: "redId", roomLabel: "red", roomNumPlayers: 4, roomMaxPlayers: 4 },
  { roomId: "blueId", roomLabel: "blue", roomNumPlayers: 4, roomMaxPlayers: 4 },
  {
    roomId: "greenId",
    roomLabel: "green",
    roomNumPlayers: 4,
    roomMaxPlayers: 4,
  },
  {
    roomId: "yellowId",
    roomLabel: "yellow",
    roomNumPlayers: 3,
    roomMaxPlayers: 4,
  },
  {
    roomId: "orangeId",
    roomLabel: "orange superhuman",
    roomNumPlayers: 1,
    roomMaxPlayers: 4,
  },
] as Room[];
