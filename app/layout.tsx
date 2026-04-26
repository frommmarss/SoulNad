import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'SoulNad | On-Chain Chemistry',
  description: 'Match and send pulses on Monad Network',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Providers artık tüm sayfaları sarmalıyor */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}