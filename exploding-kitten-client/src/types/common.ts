import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../types/connection';

export type UserSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
