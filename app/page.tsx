"use client";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TinderCard from '../components/TinderCard'; // Bak, klasör yolunu düzelttim!
import { ConnectButton } from '@rainbow-me/rainbowkit';

const MOCK_USERS = [
  { id: 1, name: "Crypto Whale", twitter: "whale_mon", image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1" },
  { id: 2, name: "DeFi Queen", twitter: "defiqueen", image: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2" },
];

export default function Home() {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSwipe = (direction: string, user: any) => {
    console.log(`Swiped ${direction} on ${user.name}`);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="fixed top-6 right-6 z-50">
        <ConnectButton label="Connect Soul" />
      </div>

      <h1 className="text-4xl font-black soul-gradient bg-clip-text text-transparent mb-10">SoulNad</h1>
      <div className="relative w-80 h-[480px]">
        <AnimatePresence>
          {users.map((user) => (
            <TinderCard key={user.id} user={user} onSwipe={(dir: any) => handleSwipe(dir, user)} />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}