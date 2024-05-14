import { NextRouter } from 'next/router';
import { PATH } from 'constants/config';
import { UserSocket } from 'types/common';

export const onBackToLobby = ({
  userSocket,
  uid,
  router,
}: {
  userSocket: UserSocket;
  uid: string;
  router: NextRouter;
}) => {
  userSocket.emit('roomLeaveRoom', { uid });
  router.push(PATH.LOBBY);
};
