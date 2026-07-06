"use client";

import React, { useState, useRef, useEffect } from "react";

interface LoveGameProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

export default function LoveGame({ onBackToMenu, onLock }: LoveGameProps) {
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "55%" });
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [hasClickedYes, setHasClickedYes] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate floating hearts when she clicks Yes
  const [successHearts, setSuccessHearts] = useState<Array<{ id: number; left: number; delay: number; scale: number }>>([]);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    // Switch to absolute positioning after first attempt
    if (!isAbsolute) {
      setIsAbsolute(true);
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const buttonWidth = 100;
    const buttonHeight = 44;
    const padding = 24;

    const maxX = Math.max(rect.width - buttonWidth - padding * 2, 10);
    const maxY = Math.max(rect.height - buttonHeight - padding * 2, 10);

    const randomX = padding + Math.random() * maxX;
    const randomY = padding + Math.random() * maxY;

    setNoPosition({
      top: `${randomY}px`,
      left: `${randomX}px`,
    });
  };

  const handleYesClick = () => {
    setHasClickedYes(true);
    
    // Generate 25 floating hearts for celebration
    const hearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 2,
      scale: 0.6 + Math.random() * 0.8,
    }));
    setSuccessHearts(hearts);
  };

  return (
    <div className="min-h-screen bg-[#050208] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-rose-950/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-pink-950/15 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">💝</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-rose-350 to-pink-400 bg-clip-text text-transparent uppercase">
              Secret Chamber
            </h1>
            <p className="text-[10px] text-pink-300/60 font-mono tracking-widest uppercase">
              love challenge & surprises
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBackToMenu}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center gap-1"
          >
            🏠 Back to Menu
          </button>
          <button
            onClick={onLock}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 backdrop-blur-md border border-rose-500/20 transition-all duration-300"
          >
            🔒 Lock
          </button>
        </div>
      </header>

      {/* Game Content Box */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 z-20 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-lg min-h-[380px] p-10 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden"
        >
          {/* Celebrating Hearts */}
          {hasClickedYes && successHearts.map((h) => (
            <span
              key={h.id}
              className="absolute text-3xl animate-float-heart select-none pointer-events-none opacity-0"
              style={{
                left: `${h.left}%`,
                bottom: `-20px`,
                animationDelay: `${h.delay}s`,
                transform: `scale(${h.scale})`,
              }}
            >
              💖
            </span>
          ))}

          {!hasClickedYes ? (
            <>
              {/* Question Screen */}
              <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 animate-bounce">
                <span className="text-3xl">❓</span>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
                Love Question
              </span>

              <h2 className="text-3xl font-extrabold text-white mt-4 max-w-xs leading-tight">
                Do you love me, Ummi?
              </h2>

              <p className="text-slate-400 text-xs mt-2 max-w-xs">
                Answer carefully. There are no wrong choices, but only one correct way! 😉
              </p>

              {/* Buttons Container */}
              <div className="w-full h-24 mt-12 flex items-center justify-center gap-6">
                {/* YES Button */}
                <button
                  onClick={handleYesClick}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95"
                >
                  Yes! 😍
                </button>

                {/* NO Button */}
                <button
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  style={
                    isAbsolute
                      ? { position: "absolute", top: noPosition.top, left: noPosition.left, margin: 0 }
                      : {}
                  }
                  className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white/80 border border-white/10 font-bold text-sm transition-all duration-150 select-none"
                >
                  No 😢
                </button>
              </div>
            </>
          ) : (
            /* Success Reveal Screen */
            <div className="animate-fade-in flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-6 animate-pulse">
                <span className="text-4xl">❤️</span>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20 uppercase tracking-widest font-mono">
                Sanctuary Confession
              </span>

              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent mt-4 mb-3">
                I love you so much my baby girl! 💖
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-sm italic">
                "I knew it! There was never any doubt. Insha'Allah, our patience now will make our union at the Nikah even more beautiful. I am counting down the moments until then."
              </p>

              <button
                onClick={() => {
                  setHasClickedYes(false);
                  setIsAbsolute(false);
                }}
                className="mt-10 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-300 text-xs font-semibold"
              >
                Play Again 🔄
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
