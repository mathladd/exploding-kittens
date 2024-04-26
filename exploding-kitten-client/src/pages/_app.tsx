import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSetAtom } from 'jotai';
import { socketAtom } from 'atoms/connection';
import { UserSocket } from 'types/common';
import { SERVER_URL } from '../../../constants';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const setUserSocket = useSetAtom(socketAtom);

  useEffect(() => {
    const socket: UserSocket = io(SERVER_URL);
    setUserSocket(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`flex min-h-screen flex-col bg-white ${montserrat.className}`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
