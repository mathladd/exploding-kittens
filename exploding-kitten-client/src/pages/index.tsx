import { useContext, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import BaseLayout from 'layout/BaseLayout';
import Stack from 'components/Stack';
import Hand from 'components/Hand';
import { useGetDeck } from 'services';
import Deck from 'components/Deck';
import { socketAtom } from 'atoms/connection';
import useRoom from 'hooks/useRoom';

export default function MainPage() {
  const userSocket = useAtomValue(socketAtom);
  const [roomId, setRoomId] = useState();
  const {} = useRoom(userSocket);

  useEffect(() => {
    userSocket?.on('userAnnounceSocketConnection', (data) => {
      // userSocket?.emit('')
    });
  }, [userSocket]);

  const onJoinRoom = (roomId: string) => {
    userSocket?.emit('roomJoinRoom', roomId);
  };

  return (
    <BaseLayout>
      <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4">
        <div className="flex space-x-8">
          <button
            type="button"
            className="w-20 h-10 bg-red-500 rounded-xl"
            onClick={() => onJoinRoom('red')}
          >
            red
          </button>
          <button
            type="button"
            className="w-20 h-10 bg-blue-500 rounded-xl"
            onClick={() => onJoinRoom('blue')}
          >
            blue
          </button>
          <button
            type="button"
            className="w-20 h-10 bg-green-500 rounded-xl"
            onClick={() => onJoinRoom('green')}
          >
            green
          </button>
          <button
            type="button"
            className="w-20 h-10 bg-yellow-500 rounded-xl"
            onClick={() => onJoinRoom('yellow')}
          >
            yellow
          </button>
          <button
            type="button"
            className="w-20 h-10 bg-purple-500 rounded-xl"
            onClick={() => onJoinRoom('purple')}
          >
            purple
          </button>
        </div>
      </Stack>
    </BaseLayout>
  );
}
