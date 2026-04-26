import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'SoulNad | Monad SocialFi',
  description: 'Discover your on-chain soulmate on Monad',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}