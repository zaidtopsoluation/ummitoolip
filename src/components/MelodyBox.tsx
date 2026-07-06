"use client";

import React, { useState, useEffect, useRef } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    id: 1,
    title: "Sweet Whispers",
    artist: "Zaid & Ummi's Lofi",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Coffee & Tulips",
    artist: "Sanctuary Acoustic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Under the Starry Sky",
    artist: "Midnight Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

interface Note {
  id: number;
  symbol: string;
  left: number;
  bottom: number;
  xDest: number;
  yDest: number;
  rotDest: number;
}

interface MelodyBoxProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

export default function MelodyBox({ onBackToMenu, onLock }: MelodyBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [particles, setParticles] = useState<Note[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const particleIdRef = useRef(0);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Set up audio object
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(currentTrack.url);
      audioRef.current.volume = volume;
      audioRef.current.loop = false;

      const onTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      };

      const onLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
      };

      const onTrackEnded = () => {
        handleNextTrack();
      };

      audioRef.current.addEventListener("timeupdate", onTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
      audioRef.current.addEventListener("ended", onTrackEnded);

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("timeupdate", onTimeUpdate);
          audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
          audioRef.current.removeEventListener("ended", onTrackEnded);
        }
      };
    }
  }, [currentTrackIndex]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay block / playback error: ", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume Change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Spawn note particles when playing
  useEffect(() => {
    if (!isPlaying) {
      setParticles([]);
      return;
    }

    const symbols = ["🎵", "🎶", "💜", "✨", "🎼"];
    const interval = setInterval(() => {
      const id = particleIdRef.current++;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      // Random starting offset (near the center center/right where the arm meets the vinyl)
      const left = 45 + Math.random() * 20; 
      const bottom = 45 + Math.random() * 20;

      // Random target end points
      const xDest = -80 + Math.random() * 160;
      const yDest = -120 - Math.random() * 80;
      const rotDest = -90 + Math.random() * 180;

      const newParticle: Note = { id, symbol, left, bottom, xDest, yDest, rotDest };
      setParticles((prev) => [...prev, newParticle]);

      // Remove after 3.5 seconds
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 3500);
    }, 450);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setIsPlaying(false);
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTime(0);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handlePrevTrack = () => {
    setIsPlaying(false);
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setCurrentTime(0);
    setTimeout(() => setIsPlaying(true), 200);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div className="min-h-screen bg-[#090510] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-purple-950/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-pink-950/15 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">📻</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-teal-300 bg-clip-text text-transparent uppercase">
              Melody Box
            </h1>
            <p className="text-[10px] text-pink-300/60 font-mono tracking-widest uppercase">
              Retro record player & beats
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

      {/* Main Music Player */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 z-20 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* Left Column: Visual Vinyl Record Player */}
        <div className="relative w-80 h-80 rounded-3xl vinyl-player p-6 flex items-center justify-center">
          {/* Tone Arm Needle (CSS Art) */}
          <div className={`tone-arm ${isPlaying ? "tone-arm-active" : ""}`}>
            {/* Base hinge */}
            <div className="absolute top-[10px] right-[10px] w-6 h-6 rounded-full bg-slate-400 border border-slate-500 shadow-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            {/* The metal rod arm */}
            <div className="absolute top-[20px] right-[21px] w-2 h-20 bg-slate-400 border-l border-slate-500 origin-top rotate-[22deg]" />
            {/* Lower pivot arm */}
            <div className="absolute top-[88px] right-[26px] w-1.5 h-16 bg-slate-350 origin-top rotate-[-12deg]" />
            {/* Cartridge needle head */}
            <div className="absolute top-[138px] right-[40px] w-3 h-6 bg-slate-800 rounded-sm border border-slate-600 flex flex-col justify-between">
              <div className="w-full h-1 bg-red-500" />
            </div>
          </div>

          {/* Turntable Platter */}
          <div className="w-[220px] h-[220px] bg-slate-800 border-4 border-slate-750 rounded-full flex items-center justify-center shadow-lg relative">
            {/* Spinning Vinyl Disk */}
            <div className={`w-[200px] h-[200px] vinyl-disk flex items-center justify-center ${isPlaying ? "vinyl-spin" : ""}`}>
              {/* Colorful center label */}
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center border border-black/30 shadow-md">
                {/* Tiny center hole */}
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-black/20" />
              </div>
            </div>

            {/* Note Particles Wrapper */}
            {particles.map((p) => (
              <span
                key={p.id}
                className="note-particle select-none"
                style={{
                  left: `${p.left}%`,
                  bottom: `${p.bottom}%`,
                  "--x-dest": `${p.xDest}px`,
                  "--y-dest": `${p.yDest}px`,
                  "--rot-dest": `${p.rotDest}deg`,
                } as React.CSSProperties}
              >
                {p.symbol}
              </span>
            ))}
          </div>

          {/* Wooden / Glass Base shadow accents */}
          <div className="absolute bottom-4 left-6 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            Model LP-90
          </div>
          <div className="absolute bottom-4 right-6 flex gap-1.5 items-center">
            <span className={`w-2.5 h-2.5 rounded-full border border-black/20 ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              {isPlaying ? "On" : "Off"}
            </span>
          </div>
        </div>

        {/* Right Column: Audio Controls & Info */}
        <div className="flex-1 w-full max-w-md p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col justify-between h-80">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
              Now Playing
            </span>

            {/* Song Meta */}
            <div className="mt-4 mb-6">
              <h2 className="text-2xl font-black text-white leading-tight truncate">
                {currentTrack.title}
              </h2>
              <p className="text-slate-400 font-medium text-xs mt-1">
                {currentTrack.artist}
              </p>
            </div>
            
            {/* Progress Bar Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSliderChange}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={handlePrevTrack}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                title="Previous Track"
              >
                ⏮️
              </button>

              <button
                onClick={handlePlayPause}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 flex items-center justify-center text-white text-lg transition-transform shadow-lg shadow-pink-500/20 active:scale-95"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <button
                onClick={handleNextTrack}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                title="Next Track"
              >
                ⏭️
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 bg-black/25 px-4 py-2.5 rounded-xl border border-white/5">
              <span className="text-xs">🔊</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
