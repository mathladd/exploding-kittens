import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { socketAtom, userAtom } from 'atoms/connection';
import { PATH } from 'constants/config';
import useAuth from 'hooks/useAuth';
import Modal from 'components/Modal';
import Stack from 'components/Stack';
import Button from 'components/Button';
import { OnRoomGetLobby, Room } from '../../../../types/eventsServerToClient';

export default function LobbyModule() {
  const router = useRouter();
  const userSocket = useAtomValue(socketAtom);
  const user = useAtomValue(userAtom);
  const [lobbyRooms, setLobbyRooms] = useState<Room[]>([]);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const { status } = useAuth();

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
      if (status === 'unauthenticated') {
        setIsOpenModalLogin(true);
      }
      if (status === 'authenticated') {
        router.push(`${PATH.ROOM}/${roomId}`);
      }
    },
    [router, status],
  );

  const onSignupClick = () => {
    router.push(PATH.SIGNUP);
  };

  const onLoginClick = () => {
    router.push(PATH.LOGIN);
  };

  return (
    <>
      <Modal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin}>
        <Stack className="flex-col justify-between bg-slate-800 w-full h-full px-6 pb-5 pt-6 space-y-4">
          <Stack className="w-full h-full justify-center items-center">
            <div className="w-full h-full bg-white rounded-lg">image stub</div>
          </Stack>
          <Stack className="flex-col space-y-2">
            <Button variant="primary" onClick={onLoginClick}>
              Login
            </Button>
            <Button variant="primary" onClick={onSignupClick}>
              Sign Up!
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack className="flex-col w-full h-full space-y-4">
        <div>Lobby: </div>
        <div className="grid grid-cols-3 gap-2">
          {lobbyRooms.map((room) => (
            <button
              type="button"
              key={room.roomId}
              className="w-28 h-16 bg-slate-600 rounded-lg text-xs text-start overflow-auto"
              onClick={() => onJoinRoom(room.roomId)}
            >
              <Stack className="flex-col w-full h-full items-start justify-start px-2 py-2">
                <Stack className="w-full justify-between space-x-1 font-bold">
                  <div>Name:</div>
                  <div className="whitespace-break-spaces">{room.roomLabel}</div>
                </Stack>
                <Stack className="w-full justify-between space-x-1">
                  <div>Players:</div>
                  <div
                    className={clsx({
                      'text-red-400': room.roomNumPlayers === room.roomMaxPlayers,
                      'text-emerald-400': room.roomNumPlayers < room.roomMaxPlayers,
                    })}
                  >
                    {room.roomNumPlayers}/{room.roomMaxPlayers}
                  </div>
                </Stack>
              </Stack>
            </button>
          ))}
        </div>
      </Stack>
    </>
  );
}
