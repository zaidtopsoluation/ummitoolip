"use client";

import React, { useState } from "react";

const HEART_MESSAGES = [
  "Will you let me close to you??",
  "Are you still going to hit with belt?",
  "Kya tm mujhe godi me sone dogi??",
  "will you ever let me go .",
  "will you aagree my 3 commitment ??",
  "I am so incredibly grateful to have you in my life.",
  "will you be my sanctuary, my peaceful place, and my greatest joy.",
  "I want you to make me fulfill all your wishes and need.",
  "so will you take care of my mother ??",
  "i love you ❤️so much ",
  "i love you ❤️so much ",
  "i love you ❤️so much ",
  "i love you ❤️so much ",
];

export default function HeartJar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [animationHeart, setAnimationHeart] = useState(false);

  const drawHeartMessage = () => {
    if (animationHeart) return;
    setAnimationHeart(true);

    // Choose a random message
    const randomMsg = HEART_MESSAGES[Math.floor(Math.random() * HEART_MESSAGES.length)];

    // Animate pulling heart out of jar, then display text modal
    setTimeout(() => {
      setActiveMessage(randomMsg);
      setAnimationHeart(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Glass Jar Widget */}
      <div className="fixed bottom-6 right-6 z-40 animate-bounce">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/20 hover:border-pink-500/50 hover:bg-white/[0.08] shadow-2xl transition-all duration-500 flex flex-col items-center justify-center"
        >
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="text-3xl relative">
            🏺
            <span className="absolute -top-1 -right-1 text-xs animate-ping">💖</span>
          </div>
          <span className="text-[9px] font-mono font-bold tracking-wider text-pink-300 group-hover:text-pink-200 mt-1 uppercase">
            Heart Jar
          </span>
        </button>
      </div>

      {/* Main Glass Jar Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col items-center text-center overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-pink-500/10 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-indigo-500/10 blur-[60px] pointer-events-none" />

            <button
              onClick={() => {
                setIsOpen(false);
                setActiveMessage(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
              Jar of Wishes
            </span>

            <h3 className="text-xl font-extrabold text-white mt-3">
              The Interactive Heart Jar
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              Inside this jar are floating paper hearts carrying Zaid's messages. Click the jar to draw one.
            </p>

            {/* Interactive Jar Art Box */}
            <div className="relative my-8 w-44 h-56 flex items-center justify-center">
              {/* Animated Floating Hearts Inside the Jar Area */}
              <div className="absolute inset-x-6 top-12 bottom-4 overflow-hidden pointer-events-none">
                <span className="absolute text-xl animate-pulse" style={{ left: '15%', top: '20%', animationDelay: '0.2s', opacity: 0.7 }}>💖</span>
                <span className="absolute text-lg animate-pulse" style={{ left: '60%', top: '35%', animationDelay: '0.8s', opacity: 0.6 }}>❤️</span>
                <span className="absolute text-xl animate-pulse" style={{ left: '35%', top: '55%', animationDelay: '1.4s', opacity: 0.8 }}>💓</span>
                <span className="absolute text-base animate-pulse" style={{ left: '70%', top: '65%', animationDelay: '2.0s', opacity: 0.5 }}>💕</span>
                <span className="absolute text-lg animate-pulse" style={{ left: '20%', top: '75%', animationDelay: '0.5s', opacity: 0.7 }}>💖</span>
              </div>

              {/* Jar Glass Vessel SVG */}
              <svg
                onClick={drawHeartMessage}
                className={`w-full h-full cursor-pointer hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.15)] ${animationHeart ? 'animate-bounce' : ''}`}
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lid */}
                <path d="M35 15 H65 V22 H35 Z" fill="#f43f5e" fillOpacity="0.8" stroke="white" strokeWidth="1" />
                {/* Neck */}
                <path d="M38 22 C38 22, 38 30, 30 35 C20 40, 20 100, 20 105 C20 112, 30 115, 50 115 C70 115, 80 112, 80 105 C80 100, 80 40, 70 35 C62 30, 62 22, 62 22 Z" fill="url(#jarGrad)" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                <defs>
                  <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Big Drawn Heart Animation Overlay */}
              {animationHeart && (
                <div className="absolute inset-0 flex items-center justify-center animate-ping pointer-events-none">
                  <span className="text-6xl text-pink-500">💖</span>
                </div>
              )}
            </div>

            <button
              onClick={drawHeartMessage}
              disabled={animationHeart}
              className="py-2.5 px-6 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all duration-300 shadow-lg shadow-pink-500/20 text-xs disabled:opacity-50"
            >
              Draw a Heart Message
            </button>
          </div>
        </div>
      )}

      {/* Sweet Message Reveal Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br from-pink-950/20 to-indigo-950/20 border border-pink-500/20 shadow-2xl flex flex-col items-center text-center">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-pink-500/[0.02] pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 animate-pulse">
              <span className="text-3xl text-pink-400">💖</span>
            </div>

            <span className="text-[10px] font-semibold font-mono text-pink-400 block uppercase mb-4 tracking-widest">
              Unfolded Message
            </span>

            <p className="text-lg font-bold text-white italic max-w-xs leading-relaxed">
              "{activeMessage}"
            </p>

            <button
              onClick={() => setActiveMessage(null)}
              className="mt-8 py-2 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 text-xs"
            >
              Put Back in Jar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
