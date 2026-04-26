"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TinderCard from '../components/TinderCard';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const MOCK_USERS = [
  { id: 1, name: "Crypto Whale", twitter: "whale_mon", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
  { id: 2, name: "DeFi Queen", twitter: "defiqueen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
  { id: 3, name: "Monad Dev", twitter: "monad_dev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
];

export default function Home() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSwipe = (direction: string, user: any) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center min-h-screen pt-20 bg-zinc-950 overflow-hidden">
      {/* Header Alanı */}
      <div className="fixed top-0 w-full p-6 flex justify-between items-center z-50 glass">
        <h1 className="text-2xl font-black soul-gradient bg-clip-text text-transparent">SoulNad</h1>
        <ConnectButton label="Connect Soul" />
      </div>

      {/* Kartların Olduğu Bölge */}
      <div className="relative w-80 h-[500px] mt-10">
        <AnimatePresence>
          {users.length > 0 ? (
            users.map((user) => (
              <TinderCard key={user.id} user={user} onSwipe={(dir: any) => handleSwipe(dir, user)} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10 glass rounded-3xl">
              <p className="text-xl font-bold">Ruhun Yalnız Kaldı...</p>
              <p className="text-sm opacity-50 mt-2">Daha fazla kişi için MON harcamaya hazır mısın?</p>
              <button onClick={() => setUsers(MOCK_USERS)} className="mt-4 text-purple-500 font-bold">YENİLE</button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Alt Butonlar */}
      <div className="flex gap-10 mt-10">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-red-500/30 text-red-500 shadow-lg shadow-red-500/10">✖</div>
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-green-500/30 text-green-500 shadow-lg shadow-green-500/10">❤</div>
      </div>
    </main>
  );
}