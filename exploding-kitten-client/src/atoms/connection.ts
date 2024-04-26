import { atom } from 'jotai';
import { UserSocket } from 'types/common';

export const socketAtom = atom<UserSocket>(null as UserSocket);
