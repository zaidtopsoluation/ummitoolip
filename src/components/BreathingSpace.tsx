"use client";

import React, { useState, useEffect } from "react";

interface BreathingSpaceProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

type BreathingPhase = "inhale" | "holdIn" | "exhale" | "holdOut";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

export default function BreathingSpace({ onBackToMenu, onLock }: BreathingSpaceProps) {
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [breathCount, setBreathCount] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate random calming particles on mount
  useEffect(() => {
    const list: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(list);
  }, []);

  // Breathing state machine cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Transition to next phase
          if (phase === "inhale") {
            setPhase("holdIn");
            return 2; // Hold for 2s
          } else if (phase === "holdIn") {
            setPhase("exhale");
            return 4; // Exhale for 4s
          } else if (phase === "exhale") {
            setPhase("holdOut");
            return 2; // Hold for 2s
          } else {
            setPhase("inhale");
            setBreathCount((c) => c + 1);
            return 4; // Inhale for 4s
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Get display text and scale based on phase
  const getPhaseData = () => {
    switch (phase) {
      case "inhale":
        return {
          text: "Breathe In...",
          description: "Fill your lungs with peace and calm",
          scaleClass: "scale-[1.3] shadow-[0_0_60px_rgba(236,72,153,0.5)] bg-pink-500/20 border-pink-400",
          progressColor: "bg-pink-500",
        };
      case "holdIn":
        return {
          text: "Hold...",
          description: "Let the serenity settle inside you",
          scaleClass: "scale-[1.3] shadow-[0_0_70px_rgba(139,92,246,0.6)] bg-purple-500/20 border-purple-400",
          progressColor: "bg-purple-500",
        };
      case "exhale":
        return {
          text: "Breathe Out...",
          description: "Release all stress, tension, and worry",
          scaleClass: "scale-[0.85] shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-sky-500/10 border-sky-400",
          progressColor: "bg-sky-500",
        };
      case "holdOut":
        return {
          text: "Hold...",
          description: "Rest in this quiet, empty space",
          scaleClass: "scale-[0.85] shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/10 border-emerald-400",
          progressColor: "bg-emerald-500",
        };
    }
  };

  const { text, description, scaleClass, progressColor } = getPhaseData();

  // Progress percentage within the current phase
  const maxDuration = phase === "inhale" || phase === "exhale" ? 4 : 2;
  const progressPercent = ((maxDuration - secondsLeft) / maxDuration) * 100;

  return (
    <div className="min-h-screen bg-[#06030a] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none" />

      {/* Floating stars/particles in background */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20 pointer-events-none animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.speed}s`,
          }}
        />
      ))}

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">🍃</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent uppercase">
              Calming Sanctuary
            </h1>
            <p className="text-[10px] text-pink-300/60 font-mono tracking-widest uppercase">
              breathe with me & relax
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

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center py-10 z-20">
        <div className="text-center mb-6 max-w-md">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
            Mindful Breathing
          </span>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            "Take a deep breath. Whenever you feel overwhelmed, I am right here with you."
          </p>
        </div>

        {/* Breathing Circle Container */}
        <div className="relative w-80 h-80 flex items-center justify-center my-6">
          {/* Decorative outer wave circles */}
          <div className="absolute inset-0 rounded-full border border-pink-500/5 scale-125 animate-ping opacity-25 pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-purple-500/5 scale-110 animate-pulse pointer-events-none" style={{ animationDuration: "6s" }} />

          {/* The actual interactive expanding/contracting breathing orb */}
          <div
            className={`w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center text-center p-6 transition-all duration-1000 ease-in-out cursor-default relative z-10 ${scaleClass}`}
          >
            {/* Inner pulsing core light */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/10 to-transparent -z-10 animate-pulse" />

            <span className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase">
              {phase}
            </span>
            <span className="text-3xl font-extrabold text-white mt-1 select-none">
              {secondsLeft}s
            </span>
          </div>
        </div>

        {/* Dynamic Instruction Labels */}
        <div className="text-center h-20 flex flex-col items-center justify-center space-y-1">
          <h2 className="text-2xl font-black tracking-wide text-white transition-all duration-500">
            {text}
          </h2>
          <p className="text-xs text-slate-400 transition-all duration-500">
            {description}
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 my-4">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${progressColor}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Breathing stats */}
        <div className="mt-8 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 flex gap-6 text-xs text-slate-400 font-mono">
          <span>Breaths Completed: <strong className="text-pink-400">{breathCount}</strong></span>
          <span>&bull;</span>
          <span>Cycle: <strong className="text-indigo-400">4-2-4-2</strong></span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 text-center text-xs text-slate-500">
        <p>&copy; 2026 Toolip Sanctuary. Made with love for Zaid.</p>
      </footer>
    </div>
  );
}
