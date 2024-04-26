export interface SocketData {
  username: string;
  accessToken: string;
}

export interface InterServerEvents {
  ping: () => void;
}
