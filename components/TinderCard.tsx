"use client";
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function TinderCard({ user, onSwipe }: any) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
                if (info.offset.x > 100) onSwipe("right");
                else if (info.offset.x < -100) onSwipe("left");
            }}
            className="absolute w-80 h-[480px] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl"
        >
            <img src={user.image} className="w-full h-full object-cover pointer-events-none" />
            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-pink-400 font-mono">@{user.twitter}</p>
            </div>
        </motion.div>
    );
}