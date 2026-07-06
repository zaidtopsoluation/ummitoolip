"use client";

import React, { useState, useEffect } from "react";

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string; // for the polaroid inner preview gradient
  isCustom?: boolean;
}

const PRELOADED_MILESTONES: Milestone[] = [
  {
    id: 1,
    date: "First Connection",
    title: "The First Sparks",
    description: "That magical moment we started talking. We talked for hours and hours, losing track of time entirely. I knew right away that you were someone extraordinarily special.",
    emoji: "💬",
    bgColor: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: 2,
    date: "Late Night Calls",
    title: "Whispers in the Dark",
    description: "Staying up late, talking about everything and nothing. Hearing you laugh and listening to your breathing. It felt like the distance between us melted away.",
    emoji: "📞",
    bgColor: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: 3,
    date: "Deepening Bonds",
    title: "Stronger Together",
    description: "Supporting each other through thick and thin. Every challenge we faced only made our commitment stronger, proving that what we share is rare and beautiful.",
    emoji: "🤝",
    bgColor: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 4,
    date: "Sanctuary Launch",
    title: "Toolip Sanctuary",
    description: "I wanted to build a peaceful space just for you. A digital garden of CSS tulips, roses, and interactive widgets to make you smile whenever you need it.",
    emoji: "🌷",
    bgColor: "from-emerald-500/20 to-teal-500/20",
  }
];

interface MemoryLaneProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

export default function MemoryLane({ onBackToMenu, onLock }: MemoryLaneProps) {
  const [milestones, setMilestones] = useState<Milestone[]>(PRELOADED_MILESTONES);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  
  // Custom dream states
  const [isAddingDream, setIsAddingDream] = useState(false);
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamDate, setDreamDate] = useState("");
  const [dreamDesc, setDreamDesc] = useState("");
  const [dreamEmoji, setDreamEmoji] = useState("✨");

  // Keep track of rotation angles for each Polaroid to avoid re-generating on render
  const [angles, setAngles] = useState<number[]>([]);

  useEffect(() => {
    // Generate static random tilts for visual organic feel
    const randomAngles = Array.from({ length: 20 }).map(() => -4 + Math.random() * 8);
    setAngles(randomAngles);

    // Load custom dreams from local storage
    if (typeof window !== "undefined") {
      const savedDreams = localStorage.getItem("zaid_love_dreams");
      if (savedDreams) {
        try {
          const parsed = JSON.parse(savedDreams) as Milestone[];
          setMilestones([...PRELOADED_MILESTONES, ...parsed]);
        } catch (e) {
          console.error("Could not parse saved dreams", e);
        }
      }
    }
  }, []);

  const handleAddDreamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamTitle.trim() || !dreamDesc.trim() || !dreamDate.trim()) return;

    const newDream: Milestone = {
      id: Date.now(),
      date: dreamDate,
      title: dreamTitle,
      description: dreamDesc,
      emoji: dreamEmoji,
      bgColor: "from-pink-500/10 to-amber-500/10",
      isCustom: true
    };

    const customOnly = milestones.filter(m => m.isCustom);
    const updatedCustom = [...customOnly, newDream];
    localStorage.setItem("zaid_love_dreams", JSON.stringify(updatedCustom));

    setMilestones([...PRELOADED_MILESTONES, ...updatedCustom]);
    
    // Clear and close
    setDreamTitle("");
    setDreamDate("");
    setDreamDesc("");
    setDreamEmoji("✨");
    setIsAddingDream(false);
  };

  const handleDeleteDream = (id: number) => {
    const updated = milestones.filter(m => m.id !== id);
    const customOnly = updated.filter(m => m.isCustom);
    localStorage.setItem("zaid_love_dreams", JSON.stringify(customOnly));
    setMilestones(updated);
    if (selectedMilestone?.id === id) {
      setSelectedMilestone(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#060309] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-pink-950/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[50%] h-[50%] rounded-full bg-indigo-950/10 blur-[130px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">📷</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent uppercase">
              Memory Lane
            </h1>
            <p className="text-[10px] text-pink-300/60 font-mono tracking-widest uppercase">
              polaroid moments & future hopes
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 z-20 flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-12 max-w-lg">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
            Photo Album
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">Snapshots of Us</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Hover over the Polaroids to adjust them, and click to read the sweet memories inside. 
            Click "Add a Future Dream" to add a milestone you want to achieve together!
          </p>
          <button
            onClick={() => setIsAddingDream(true)}
            className="mt-6 py-2 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            ✨ Add a Future Dream
          </button>
        </div>

        {/* Polaroid Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-5xl justify-items-center mt-4">
          {milestones.map((item, idx) => {
            const rot = angles[idx] || 0;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMilestone(item)}
                className="polaroid-card w-56 text-slate-800"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <div className="polaroid-tape" />
                
                {/* Photo portion */}
                <div className={`polaroid-image-placeholder rounded flex flex-col items-center justify-center bg-gradient-to-br ${item.bgColor}`}>
                  <span className="text-5xl animate-pulse" style={{ animationDuration: "3s" }}>{item.emoji}</span>
                  {item.isCustom && (
                    <span className="absolute top-2 right-2 text-[8px] font-mono font-bold bg-pink-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      Dream
                    </span>
                  )}
                </div>

                {/* Caption portion */}
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 block uppercase">
                    {item.date}
                  </span>
                  <p className="font-serif italic font-bold text-sm text-slate-700 truncate mt-1">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Write a Dream Modal */}
      {isAddingDream && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col">
            <button
              onClick={() => setIsAddingDream(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
            >
              Cancel
            </button>

            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
                Future Wishlist
              </span>
              <h3 className="text-xl font-bold text-white mt-3">Add a Future Dream</h3>
              <p className="text-xs text-slate-400 mt-1">What's something you hope we will do together?</p>
            </div>

            <form onSubmit={handleAddDreamSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Dream Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Traveling to Paris, Our Wedding..."
                  value={dreamTitle}
                  onChange={(e) => setDreamTitle(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Date/Season</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Winter 2027"
                    value={dreamDate}
                    onChange={(e) => setDreamDate(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Emoji Symbol</label>
                  <select
                    value={dreamEmoji}
                    onChange={(e) => setDreamEmoji(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-300"
                  >
                    <option value="✨">✨ Sparkles</option>
                    <option value="✈️">✈️ Travel</option>
                    <option value="🏡">🏡 House / Home</option>
                    <option value="💍">💍 Ring / Wedding</option>
                    <option value="🍿">🍿 Movie Date</option>
                    <option value="☕">☕ Coffee / Cafe</option>
                    <option value="💖">💖 Love / Heart</option>
                    <option value="🌠">🌠 Shooting Star</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your dream here..."
                  value={dreamDesc}
                  onChange={(e) => setDreamDesc(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all duration-300 shadow-lg shadow-pink-500/20 text-xs"
              >
                Create Dream Polaroid
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Polaroid Detailed View Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-pink-950/20 to-indigo-950/20 border border-pink-500/20 shadow-2xl flex flex-col items-center text-center">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>

            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
              <span className="text-4xl">{selectedMilestone.emoji}</span>
            </div>

            <span className="text-[10px] font-bold font-mono text-pink-400 block uppercase mb-2 tracking-widest">
              {selectedMilestone.date}
            </span>

            <h3 className="text-2xl font-extrabold text-white mb-4">
              {selectedMilestone.title}
            </h3>

            <p className="text-slate-350 text-sm leading-relaxed max-w-sm italic">
              "{selectedMilestone.description}"
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 text-xs"
              >
                Back to Album
              </button>
              {selectedMilestone.isCustom && (
                <button
                  onClick={() => handleDeleteDream(selectedMilestone.id)}
                  className="py-2.5 px-6 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold transition-all duration-300 text-xs"
                >
                  Delete Dream
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
