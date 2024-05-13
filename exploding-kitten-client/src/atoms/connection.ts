import { atom } from 'jotai';
import { UserSocket } from 'types/common';
import { PlayerData } from '../../../types/auth';

export const socketAtom = atom<UserSocket>(null as UserSocket);
export const userAtom = atom<PlayerData>(null as PlayerData);
export const announcementAtom = atom<string[]>([]);
