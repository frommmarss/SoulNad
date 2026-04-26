"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import TinderCard from '../components/TinderCard';

const MOCK_USERS = [
  { id: 1, name: "Crypto Whale", twitter: "Build on Monad", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
  { id: 2, name: "DeFi Queen", twitter: "SocialFi enjoyer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
  { id: 3, name: "Monad Dev", twitter: "10k TPS is real", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
];

export default function Home() {
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [users, setUsers] = useState(MOCK_USERS);

  useEffect(() => setMounted(true), []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Form verilerini alıp profil olarak kaydediyoruz
    const target = e.target as any;
    setUserProfile({
      name: target.name.value,
      age: target.age.value,
      gender: target.gender.value,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`
    });
  };

  const handleSwipe = (direction: string, user: any) => {
    console.log(`Swiped ${direction} on ${user.name}`);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#09090b] text-white p-4 font-sans">
      {/* Üst Bar */}
      <div className="w-full max-w-4xl flex justify-between items-center py-6 z-50">
        <h1 className="text-3xl font-black soul-gradient bg-clip-text text-transparent italic">SoulNad</h1>
        <ConnectButton label="Connect Soul" />
      </div>

      {!isConnected ? (
        /* 1. DURUM: CÜZDAN BAĞLI DEĞİL */
        <div className="flex flex-col items-center justify-center mt-32 text-center animate-pulse">
          <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">💜</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Discover Your Soul on Monad</h2>
          <p className="opacity-60 max-w-xs">Connect your wallet to start matching with the community.</p>
        </div>
      ) : !userProfile ? (
        /* 2. DURUM: CÜZDAN BAĞLI AMA PROFİL YOK */
        <div className="w-full max-w-md glass p-8 rounded-3xl mt-10 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Create Profile</h2>
          <p className="text-sm opacity-50 mb-6">Tell us who you are in the Monad ecosystem.</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <input name="name" required placeholder="Display Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input name="age" type="number" required placeholder="Age" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none" />
              <select name="gender" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-purple-500 outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full soul-gradient py-4 rounded-xl font-bold shadow-lg mt-4">Start Swiping</button>
          </form>
        </div>
      ) : (
        /* 3. DURUM: HER ŞEY HAZIR, KAYDIRMA BAŞLASIN */
        <div className="flex flex-col items-center mt-10">
          <div className="relative w-80 h-[480px]">
            <AnimatePresence>
              {users.length > 0 ? (
                users.map((user) => (
                  <TinderCard key={user.id} user={user} onSwipe={(dir: any) => handleSwipe(dir, user)} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center glass rounded-3xl p-6">
                  <p className="text-xl font-bold mb-4">No more souls nearby...</p>
                  <button onClick={() => setUsers(MOCK_USERS)} className="text-purple-400 font-bold hover:underline">Refresh List</button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Alt Aksiyon Butonları */}
          <div className="flex gap-8 mt-12">
            <button onClick={() => setUsers(prev => prev.slice(1))} className="w-16 h-16 rounded-full glass border border-red-500/50 text-red-500 text-2xl flex items-center justify-center shadow-lg shadow-red-500/10 hover:scale-110 transition">✕</button>
            <button onClick={() => setUsers(prev => prev.slice(1))} className="w-16 h-16 rounded-full glass border border-green-500/50 text-green-500 text-2xl flex items-center justify-center shadow-lg shadow-green-500/10 hover:scale-110 transition">♥</button>
          </div>
        </div>
      )}
    </main>
  );
}