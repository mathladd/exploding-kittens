import { useAtomValue } from 'jotai';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  const [isOpenModalCreateRoom, setIsOpenModalCreateRoom] = useState(false);
  const [createRoomData, setCreateRoomData] = useState<{ roomName: string; maxPlayers: number }>();
  const { status } = useAuth();

  useEffect(() => {
    userSocket?.on('onRoomGetLobby', (data: OnRoomGetLobby) => {
      setLobbyRooms(data?.rooms ?? []);
    });
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

  const onCreateRoomClick = () => {
    userSocket.emit('roomCreateRoom', {
      uid: user?.uid,
      roomName: createRoomData?.roomName,
      maxPlayers: createRoomData?.maxPlayers,
    });
    setIsOpenModalCreateRoom(false);
  };

  const onChangeCreateRoomName = (e: ChangeEvent<HTMLInputElement>) =>
    setCreateRoomData((prev) => ({ ...prev, roomName: e.target.value }));

  const onChangeCreateRoomMaxPlayers = (e: ChangeEvent<HTMLInputElement>) =>
    setCreateRoomData((prev) => ({ ...prev, maxPlayers: Number(e.target.value) }));

  return (
    <>
      <Modal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin}>
        <Stack className="flex-col justify-between bg-slate-800 w-full h-fit px-6 pb-5 pt-6 space-y-4 min-w-80 overflow-auto">
          <Stack className="w-full h-full justify-center items-center">
            <div className="w-full h-40 bg-white rounded-lg">image stub</div>
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
      <Modal isOpen={isOpenModalCreateRoom} setIsOpen={setIsOpenModalCreateRoom}>
        <Stack className="flex-col space-y-4 text-sm text-slate-500 px-3 pb-4 pt-10 min-w-80 h-full rounded-lg">
          <Stack className="flex-col space-y-2">
            <Stack className="w-full justify-between items-center">
              <div>Room name: </div>
              <input
                placeholder="set room name"
                value={createRoomData?.roomName}
                onChange={onChangeCreateRoomName}
                className="border border-slate-700 px-2 py-1 rounded-md"
              />
            </Stack>
            <Stack className="w-full justify-between items-center">
              <div>Max # of players: </div>
              <input
                placeholder="set max players"
                value={createRoomData?.maxPlayers}
                onChange={onChangeCreateRoomMaxPlayers}
                className="border border-slate-700 px-2 py-1 rounded-md"
              />
            </Stack>
          </Stack>
          <Button
            variant="primary"
            onClick={onCreateRoomClick}
            disabled={!createRoomData?.roomName || !createRoomData?.maxPlayers}
          >
            Create room!
          </Button>
        </Stack>
      </Modal>
      <Stack className="w-full h-full justify-center items-center">
        <Stack className="flex-col w-fit h-fit space-y-4 justify-center items-start">
          <div>Lobby: </div>
          <Button variant="primary" onClick={() => setIsOpenModalCreateRoom(true)}>
            Create room
          </Button>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {lobbyRooms.map((room) => (
              <button
                type="button"
                key={room.roomId}
                className="w-28 md:w-32 lg:w-36 h-20 bg-slate-600 rounded-lg text-xs text-start overflow-auto"
                onClick={() => onJoinRoom(room.roomId)}
              >
                <Stack className="flex-col w-full h-full items-start justify-start px-2 py-2">
                  <Stack className="w-full justify-between space-x-1 font-bold">
                    <div>Room:</div>
                    <div className="whitespace-break-spaces">{room.roomName}</div>
                  </Stack>
                  <Stack className="w-full justify-between space-x-1 font-bold">
                    <div>Host:</div>
                    <div className="whitespace-break-spaces">{room.hostname}</div>
                  </Stack>
                  <Stack className="w-full justify-between space-x-1">
                    <div># of players:</div>
                    <div
                      className={clsx({
                        'text-red-400': room.playerCount === room.maxPlayers,
                        'text-emerald-400': room.playerCount < room.maxPlayers,
                      })}
                    >
                      {room.playerCount}/{room.maxPlayers}
                    </div>
                  </Stack>
                </Stack>
              </button>
            ))}
          </div>
        </Stack>
      </Stack>
    </>
  );
}
