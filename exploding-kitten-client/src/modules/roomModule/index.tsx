import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import Stack from 'components/Stack';
import { socketAtom, userAtom } from 'atoms/connection';
import useRoom from 'hooks/useRoom';
import Announcement from 'components/Announcement';
import { onBackToLobby } from 'helpers/auth';
import useAuth from 'hooks/useAuth';

export default function RoomModule() {
  const userSocket = useAtomValue(socketAtom);
  const router = useRouter();
  const roomIdParam = useMemo(() => String(router?.query?.roomId), [router?.query?.roomId]);
  const { status } = useAuth();

  const { roomId } = useRoom(userSocket);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (!!roomIdParam && status === 'authenticated') {
      userSocket?.emit('roomJoinRoom', { roomId: roomIdParam, uid: user?.uid });
    } else {
      userSocket?.emit('roomLeaveRoom', { uid: user?.uid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomIdParam, user?.uid, userSocket]);

  return (
    <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4 text-black">
      <Announcement />
      <div>{roomId}</div>
      <button type="button" onClick={() => onBackToLobby({ userSocket, router, uid: user?.uid })}>
        Back to lobby
      </button>
    </Stack>
  );
}
