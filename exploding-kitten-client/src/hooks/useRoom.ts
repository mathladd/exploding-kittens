import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { UserSocket } from 'types/common';
import { announcementAtom, userAtom } from 'atoms/connection';
import { OnRoomJoinRoom, OnRoomLeaveRoom } from '../../../types/eventsServerToClient';

export default function useRoom(userSocket: UserSocket) {
  const user = useAtomValue(userAtom);
  const [roomId, setRoomId] = useState('');
  const setAnnouncements = useSetAtom(announcementAtom);

  useEffect(() => {
    // On user joining room
    userSocket?.on('onRoomJoinRoom', (data: OnRoomJoinRoom) => {
      if (data?.player?.uid === user?.uid) {
        data?.isSuccess
          ? setRoomId(data?.roomId)
          : setAnnouncements((prev) => [...prev, 'unable to join room']);
      }
    });
    return () => {
      userSocket?.off('onRoomJoinRoom');
    };
  }, [setAnnouncements, user?.uid, userSocket]);

  useEffect(() => {
    // Announce other players joined current room
    userSocket?.on('onRoomJoinRoom', (data: OnRoomJoinRoom) => {
      data?.isSuccess &&
        setAnnouncements((prev) => [
          ...prev,
          `Player ${data?.player?.username} has joined room ${data?.roomId}`,
        ]);
    });
    return () => {
      userSocket?.off('onRoomJoinRoom');
    };
  }, [setAnnouncements, userSocket]);

  useEffect(() => {
    // On user leaving room
    userSocket?.on('onRoomLeaveRoom', (data: OnRoomLeaveRoom) => {
      if (data?.player?.uid === user?.uid) {
        data?.isSuccess
          ? setRoomId(undefined)
          : setAnnouncements((prev) => [...prev, 'unable to leave room']);
      }
    });
    return () => {
      userSocket?.off('onRoomLeaveRoom');
    };
  }, [setAnnouncements, user?.uid, userSocket]);

  useEffect(() => {
    // Announce other players left current room
    userSocket?.on('onRoomLeaveRoom', (data: OnRoomLeaveRoom) => {
      data?.isSuccess &&
        setAnnouncements((prev) => [...prev, `Player ${data?.player?.username} has left the room`]);
    });
    return () => {
      userSocket?.off('onRoomLeaveRoom');
    };
  }, [setAnnouncements, userSocket]);

  return { roomId };
}
