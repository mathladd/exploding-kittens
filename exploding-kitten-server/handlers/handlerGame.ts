import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { GamePlaySeeFuture } from "../../types/eventsClientToServer";

export const handlerGame = (socket: Socket, io: SocketIO) => {
  const onPlaySeeFuture = () => {
    // on player played card
    socket.on("gamePlaySeeFuture", ({ cardId }: GamePlaySeeFuture) => {
      console.log(cardId);
    });
  };

  onPlaySeeFuture();
};
