import { atom } from 'jotai';
import { UserSocket } from 'types/common';
import { SocketData } from '../../../types/eventsOther';

export const socketAtom = atom<UserSocket>(null as UserSocket);
export const userAtom = atom<SocketData>(null as SocketData);
export const announcementAtom = atom<string[]>([]);
