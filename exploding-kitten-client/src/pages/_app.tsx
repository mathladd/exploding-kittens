import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAtom, useSetAtom } from 'jotai';
import { socketAtom, userAtom } from 'atoms/connection';
import { UserSocket } from 'types/common';
import NextAuthSessionProvider from 'components/NextAuthSessionProvider';
import { SERVER_URL } from '../../../constants';
import { UserAnnounceSocketConnection } from '../../../types/eventsServerToClient';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [userSocket, setUserSocket] = useAtom(socketAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const socket: UserSocket = io(SERVER_URL);
    setUserSocket(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userSocket?.on('userAnnounceSocketConnection', (data: UserAnnounceSocketConnection) => {
      setUser({
        uid: data?.uid,
        username: data?.username ?? '',
        email: data?.email || undefined,
        createdAt: data?.createdAt || undefined,
        lastLoginAt: data?.lastLoginAt || undefined,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthSessionProvider>
        <main className={`flex min-h-screen flex-col bg-white ${montserrat.className}`}>
          <Component {...pageProps} />
        </main>
      </NextAuthSessionProvider>
    </QueryClientProvider>
  );
}
