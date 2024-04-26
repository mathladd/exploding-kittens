import { useEffect } from 'react';
import { UserSocket } from 'types/common';
import { RoomAnnounceJoin } from '../../../types/eventsServerToClient';

export default function useRoom(userSocket: UserSocket) {
  useEffect(() => {
    // Join room
    userSocket?.on('roomAnnounceJoin', (announceJoin: RoomAnnounceJoin) => {
      console.log(announceJoin);
    });
  });
  return {};
}
