import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { useSession } from 'next-auth/react';
import Stack from 'components/Stack';
import useAuth from 'hooks/useAuth';
import { PATH } from 'constants/config';
import { socketAtom, userAtom } from 'atoms/connection';
import { shortenString } from 'helpers/string';
import Button from 'components/Button';
import { onBackToLobby } from 'helpers/auth';
import { PlayerData } from '../../../../../types/auth';

const RESTRICTED_PATHS = [PATH.ROOM];

export default function Header() {
  const router = useRouter();
  const userSocket = useAtomValue(socketAtom);
  const { data: session } = useSession();

  const { logout, status } = useAuth();
  const user = useAtomValue(userAtom);

  const onLoginClick = () => {
    router.push(PATH.LOGIN);
  };

  const onLogoutClick = () => {
    logout();
  };

  useEffect(() => {
    if (session?.user) {
      userSocket.emit('userLogin', session?.user as unknown as PlayerData);
      if (router.asPath === PATH.LOGIN) {
        router.push(PATH.LOBBY);
      }
    }
  }, [router, session?.user, userSocket]);

  useEffect(() => {
    if (
      !!RESTRICTED_PATHS.find((path) => router.asPath.includes(path)) &&
      status === 'unauthenticated'
    ) {
      router.push(PATH.LOBBY);
    }
  }, [router, status]);

  return (
    <Stack className="flex-col bg-blue-900 w-screen h-32 text-slate-800">
      <Stack className="w-full bg-blue-600 p-2 text-sm justify-between items-center text-white">
        {router.asPath === PATH.LOBBY ? (
          <div />
        ) : (
          <Button
            variant="primary"
            extraClassName="!bg-emerald-400 hover:brightness-125 !text-slate-800 font-semibold"
            onClick={() => onBackToLobby({ userSocket, router, uid: user?.uid })}
          >
            To Lobby
          </Button>
        )}
        <Stack className="w-fit items-center space-x-4">
          <div>User: {shortenString(user?.username, 4, 4)}</div>
          <button
            type="button"
            onClick={status === 'authenticated' ? onLogoutClick : onLoginClick}
            className="bg-slate-700 py-2 px-3 rounded-lg"
          >
            {status === 'authenticated' ? 'Logout' : 'Login'}
          </button>
        </Stack>
      </Stack>
      <Stack className="w-full h-full justify-center items-center text-orange-500 font-bold text-3xl">
        {/* Astro-dog */}testing
      </Stack>
    </Stack>
  );
}
