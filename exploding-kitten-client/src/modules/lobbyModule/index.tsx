import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { socketAtom, userAtom } from 'atoms/connection';
import { PATH } from 'constants/config';
import { OnRoomGetLobby, Room } from '../../../../types/eventsServerToClient';

export default function LobbyModule() {
  const userSocket = useAtomValue(socketAtom);
  const user = useAtomValue(userAtom);
  const [lobbyRooms, setLobbyRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    userSocket?.on('onRoomGetLobby', (data: OnRoomGetLobby) => {
      setLobbyRooms(data?.rooms ?? []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSocket]);

  useEffect(() => {
    user?.uid && userSocket.emit('roomGetLobby', { uid: user?.uid });
  }, [userSocket, user?.uid]);

  const onJoinRoom = useCallback(
    (roomId: string) => {
      router.push(`${PATH.ROOM}/${roomId}`);
    },
    [router],
  );

  return (
    <div className="flex space-x-8">
      {lobbyRooms.map((room) => (
        <button
          type="button"
          key={room.roomId}
          className="w-20 h-10 bg-red-500 rounded-xl"
          onClick={() => onJoinRoom(room.roomId)}
        >
          {room.roomLabel}
        </button>
      ))}
    </div>
  );
}
