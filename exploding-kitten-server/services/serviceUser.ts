import { Socket } from "socket.io";
import { SocketIO } from "../types/common";
import { UserAnnounceSocketConnection } from "../../types/eventsServerToClient";
import { readUser } from "../repo/repoUser";

export const onGetMe = async ({ saltedData }: { saltedData: string }) => {
  const user = await readUser({ saltedData });
  return user;
};
