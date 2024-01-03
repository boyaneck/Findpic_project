import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { SearchProvider } from '@/context/keyword';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/components/main/Header';
import { SkeletonTheme } from 'react-loading-skeleton';
const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#dee2e6" highlightColor="#525252">
          <ReactQueryDevtools initialIsOpen={false} />
          <SearchProvider>
            <Header />
            <Component {...pageProps} />
          </SearchProvider>
        </SkeletonTheme>
      </QueryClientProvider>
    </SessionProvider>
  );
  // session={pageProps.session}
}
