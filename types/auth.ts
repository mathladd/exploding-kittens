export interface SocketData {
  uid: string;
  username: string;
}

export interface PlayerData {
  uid: number;
  username: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
}
