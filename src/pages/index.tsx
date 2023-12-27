import { Inter } from 'next/font/google';
import Main from './Main';
const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  return <Main />;
}
