import { Inter } from 'next/font/google';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MiniPlayArena',
  description: 'Play popular games with you friends for free!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>   
    </html>
  );
}
