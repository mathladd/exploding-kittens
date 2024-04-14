import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`flex min-h-screen flex-col bg-white ${montserrat.className}`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
