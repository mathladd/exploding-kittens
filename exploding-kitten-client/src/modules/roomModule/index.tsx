import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import Stack from 'components/Stack';
import { socketAtom, userAtom } from 'atoms/connection';
import useRoom from 'hooks/useRoom';
import { PATH } from 'constants/config';
import Announcement from 'components/Announcement';

export default function RoomModule() {
  const userSocket = useAtomValue(socketAtom);
  const router = useRouter();
  const roomIdParam = useMemo(() => String(router?.query?.roomId), [router?.query?.roomId]);

  const { roomId } = useRoom(userSocket);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (!!roomIdParam && !!user?.uid) {
      userSocket.emit('roomJoinRoom', { roomId: roomIdParam, uid: user?.uid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomIdParam, user?.uid, userSocket]);

  const onBackToLobby = () => {
    userSocket.emit('roomLeaveRoom', { uid: user?.uid });
    router.push(PATH.LOBBY);
  };

  return (
    <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4 text-black">
      <Announcement />
      <div>{roomId}</div>
      <button type="button" onClick={onBackToLobby}>
        Back to lobby
      </button>
    </Stack>
  );
}
