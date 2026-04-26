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
  const [loading, setLoading] = useState(true);

  // LocalStorage Kontrolü (Sayfayı yenileyince bilgiler gitmez)
  useEffect(() => {
    setMounted(true);
    if (isConnected && address) {
      const storedProfile = localStorage.getItem(`soulProfile_${address}`);
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    }
    setLoading(false);
  }, [isConnected, address]);

  // Form Kayıt İşlemi
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const newProfile = {
      name: target.name.value,
      age: target.age.value,
      gender: target.gender.value,
      image: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${address}`
    };

    setUserProfile(newProfile);
    if (address) {
      localStorage.setItem(`soulProfile_${address}`, JSON.stringify(newProfile));
    }
  };

  const handleSwipe = (direction: string, user: any) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  if (!mounted || loading) return null;

  return (
    // font-sans eklendi (eski tip yazıları engellemek için)
    <main className="flex flex-col items-center min-h-screen text-white font-sans antialiased bg-[#09090b] relative overflow-hidden">

      {/* Arka Plan Işıkları (Derinlik katar) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none"></div>

      {/* HEADER (Üst Bar) */}
      <div className="w-full max-w-7xl flex items-center p-6 z-50 relative">
        {/* Sol tarafı boş bırakıyoruz ki Logo tam ortalansın */}
        <div className="flex-1"></div>

        {/* LOGO - Tam Ortada, Pembeden Monad Moruna Geçişli */}
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 to-[#836EF9] bg-clip-text text-transparent italic tracking-tight">
            SoulNad
          </h1>
        </div>

        {/* CONNECT BUTONU - Sağda */}
        <div className="flex-1 flex justify-end">
          <ConnectButton label="Connect Soul" />
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <div className="w-full flex flex-col items-center z-10 relative mt-16 px-4">
        {!isConnected ? (

          /* 1. EKRAN: CÜZDAN BAĞLI DEĞİL */
          <div className="flex flex-col items-center text-center mt-20 max-w-lg">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-[#836EF9]/30 shadow-[0_0_30px_rgba(131,110,249,0.2)]">
              <span className="text-3xl">💜</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Discover Your Soul</h2>
            <p className="text-[#836EF9] text-lg font-medium opacity-80">on Monad Network</p>
            <p className="opacity-50 mt-6 text-sm">Connect your wallet to start matching.</p>
          </div>

        ) : !userProfile ? (

          /* 2. EKRAN: CÜZDAN BAĞLI, FORM EKRANI (Şık Kutu Tasarımı) */
          <div className="w-full max-w-xl bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 mt-10">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight mb-2">Forge Your Profile</h2>
              <p className="text-sm opacity-50">Enter the Monad SocialFi ecosystem.</p>
            </div>

            <form onSubmit={handleRegister} className="w-full space-y-5">
              {/* İsim Kutusu */}
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                <label className="text-xs uppercase tracking-widest font-bold text-[#836EF9] mb-3 block">Soul Name</label>
                <input name="name" required placeholder="e.g. CryptoNomad" className="w-full bg-transparent outline-none text-white text-lg placeholder-white/20" />
              </div>

              {/* Yaş ve Cinsiyet (Yan Yana Şık Kutular) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#836EF9] mb-3 block">Age</label>
                  <input name="age" type="number" required placeholder="24" className="w-full bg-transparent outline-none text-white text-lg placeholder-white/20" />
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#836EF9] mb-3 block">Identity</label>
                  <select name="gender" className="w-full bg-transparent outline-none text-white text-lg cursor-pointer appearance-none">
                    <option className="bg-zinc-900" value="Male">Alpha (M)</option>
                    <option className="bg-zinc-900" value="Female">Omega (F)</option>
                    <option className="bg-zinc-900" value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-[#836EF9] py-5 rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(131,110,249,0.3)] mt-8 hover:scale-[1.02] hover:opacity-90 transition-all duration-300 tracking-wide">
                Start Swiping
              </button>
            </form>
          </div>

        ) : (
          /* 3. EKRAN: KAYDIRMA BAŞLASIN */
          <div className="flex flex-col items-center mt-10">
            <div className="relative w-80 h-[480px]">
              <AnimatePresence>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TinderCard key={user.id} user={user} onSwipe={(dir: any) => handleSwipe(dir, user)} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/10">
                    <p className="text-xl font-bold mb-4">No more souls nearby...</p>
                    <button onClick={() => setUsers(MOCK_USERS)} className="text-[#836EF9] font-bold hover:underline">Refresh List</button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}