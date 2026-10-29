import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '../shared/store/StoreProvider';

export const metadata: Metadata = { title: 'Orbit — Your next everyday essential', description: 'Discover smartphones and tablets at Orbit.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><StoreProvider>{children}</StoreProvider></body></html>;
}
