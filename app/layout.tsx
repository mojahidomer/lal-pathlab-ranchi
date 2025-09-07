
import { Inter } from 'next/font/google';
import {Providers} from "../redux/Providers";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Dr Lal PathLabs - Leading Diagnostic Laboratory</title>
        <meta name="description" content="Trusted diagnostic services with advanced testing facilities. Book your health checkups online." />
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/lal-3.png" />
      </head>
      <body className={inter.className}>
      <Providers >
          {children}
        </Providers>
      </body>
    </html>
  );
}