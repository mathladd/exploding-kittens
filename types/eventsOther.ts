export interface SocketData {
  uid: string;
  username: string;
  accessToken: string;
}

export interface InterServerEvents {
  ping: () => void;
}
