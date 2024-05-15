export type TableUserSchema = {
  uid: number;
  username: string;
  email: string;
  passhash: string;
  created_at: Date;
  last_access: Date;
};

export type TableRoomSchema = {
  room_id: number;
  room_name: string;
  host_id: number;
  player_count: number;
  max_players: number;
  last_joined: Date;
  created_at: Date;
};
