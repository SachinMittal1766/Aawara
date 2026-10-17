import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Aawara — better days out', description: 'Weather-aware local discovery, tuned to your day.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
