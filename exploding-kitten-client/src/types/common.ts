import { Socket } from 'socket.io-client';
import { ServerToClientEvents } from '../../../types/eventsServerToClient';
import { ClientToServerEvents } from '../../../types/eventsClientToServer';

export type UserSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
export type APIRes = { isSuccess: boolean; completed: string; data?: any };
