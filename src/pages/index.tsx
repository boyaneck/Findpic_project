import { Inter } from 'next/font/google';
import Main from './Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
