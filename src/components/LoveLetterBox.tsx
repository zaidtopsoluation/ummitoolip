"use client";

import React, { useState, useEffect } from "react";

interface LoveLetter {
  id: number;
  date: string;
  sender: string;
  subject: string;
  content: string;
}

const PRELOADED_LETTERS: LoveLetter[] = [
  {
    id: 1,
    date: "July 4, 2026",
    sender: "Zaidi",
    subject: "A little reminder...",
    content: "My Dearest Ummi,\n\nJust a little note to remind you how deeply you are loved. These past few days might have been busy, but you have never left my thoughts. You are my peace, my comfort, and my greatest source of joy.\n\nThank you for being you, for your beautiful heart, and for bringing so much light into my life.\n\nWith all my love,\nZaid"
  },
  {
    id: 2,
    date: "July 5, 2026",
    sender: "Zaidi",
    subject: "Thinking of you",
    content: "Hey Sweetie,\n\nI was looking at our messages and couldn't help but smile. Even when we are apart, I feel so close to you. I promise to always stand by you, to protect you, and to fulfill every single wish of yours. You deserve the entire world, and I will do everything to give it to you.\n\nKeep smiling today, okay? Your smile is my absolute favorite thing.\n\nAlways yours,\nZaid"
  },
  {
    id: 3,
    date: "July 6, 2026",
    sender: "Zaidi",
    subject: "Our Sanctuary",
    content: "To My Beautiful Girl,\n\nI built this digital sanctuary for us, a place where you can always come to relax, breathe, and find comfort. Whenever you feel stressed or overwhelmed, just open this page and remember that I am right here with you, holding your hand.\n\nLet's make countess more memories together, build a beautiful home, and look after each other forever.\n\nLove you to the moon and back,\nZaid"
  }
];

interface LoveLetterBoxProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

export default function LoveLetterBox({ onBackToMenu, onLock }: LoveLetterBoxProps) {
  const [letters, setLetters] = useState<LoveLetter[]>(PRELOADED_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  // Reply / Message writing state
  const [isWritingReply, setIsWritingReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replies, setReplies] = useState<LoveLetter[]>([]);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

  // Load sent replies & custom letters from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Ummi's replies
      const savedReplies = localStorage.getItem("zaid_love_replies");
      if (savedReplies) {
        try {
          setReplies(JSON.parse(savedReplies));
        } catch (e) {
          console.error("Could not parse replies", e);
        }
      }

      // Load Zaidi's custom letters
      const savedCustomLetters = localStorage.getItem("zaid_received_letters");
      if (savedCustomLetters) {
        try {
          const parsedCustom = JSON.parse(savedCustomLetters) as LoveLetter[];
          setLetters([...PRELOADED_LETTERS, ...parsedCustom]);
        } catch (e) {
          console.error("Could not parse custom letters", e);
        }
      }
    }
  }, []);

  // Open letter flow: click envelope -> crack seal -> unfold letter
  const openLetter = (letter: LoveLetter) => {
    setSelectedLetter(letter);
    setIsOpening(true);
    setSealCracked(false);
  };

  const handleCrackSeal = () => {
    if (sealCracked) return;
    setSealCracked(true);
    // Wait for cracking animation to finish, then show unfolded letter text
    setTimeout(() => {
      setIsOpening(false);
    }, 850);
  };

  // Submit message and save to localStorage
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !replySubject.trim()) return;

    const isZaidi = activeTab === "received";

    const newMsg: LoveLetter = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      sender: isZaidi ? "Zaidi" : "Ummi",
      subject: replySubject,
      content: replyText
    };

    if (isZaidi) {
      const saved = localStorage.getItem("zaid_received_letters");
      let currentCustom: LoveLetter[] = [];
      if (saved) {
        try {
          currentCustom = JSON.parse(saved);
        } catch {}
      }
      const updatedCustom = [...currentCustom, newMsg];
      localStorage.setItem("zaid_received_letters", JSON.stringify(updatedCustom));
      setLetters([...PRELOADED_LETTERS, ...updatedCustom]);
      setActiveTab("received");
    } else {
      const updatedReplies = [newMsg, ...replies];
      setReplies(updatedReplies);
      localStorage.setItem("zaid_love_replies", JSON.stringify(updatedReplies));
      setActiveTab("sent");
    }

    // Reset fields
    setReplyText("");
    setReplySubject("");
    setIsWritingReply(false);
  };

  const handleDeleteMessage = (id: number) => {
    const inReplies = replies.some(r => r.id === id);
    if (inReplies) {
      const updated = replies.filter(r => r.id !== id);
      setReplies(updated);
      localStorage.setItem("zaid_love_replies", JSON.stringify(updated));
    } else {
      const saved = localStorage.getItem("zaid_received_letters");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as LoveLetter[];
          const updated = parsed.filter(l => l.id !== id);
          localStorage.setItem("zaid_received_letters", JSON.stringify(updated));
          setLetters([...PRELOADED_LETTERS, ...updated]);
        } catch {}
      }
    }
    if (selectedLetter?.id === id) {
      setSelectedLetter(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#07030c] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* Floating letters in background */}
      <div className="absolute top-1/4 left-10 text-white/5 text-4xl select-none pointer-events-none animate-bounce" style={{ animationDuration: "5s" }}>✉️</div>
      <div className="absolute bottom-1/4 right-20 text-white/5 text-4xl select-none pointer-events-none animate-bounce" style={{ animationDuration: "7s", animationDelay: "2s" }}>✉️</div>

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">📮</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-purple-350 to-pink-400 bg-clip-text text-transparent uppercase">
              Letter Box
            </h1>
            <p className="text-[10px] text-pink-300/60 font-mono tracking-widest uppercase">
              sealed messages & replies
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

      {/* Main Mailbox Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 z-20 flex flex-col items-center">

        {/* Tabs and Actions (Commented out for frontend-only local scope. Uncomment when database is added.)
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => { setActiveTab("received"); setIsWritingReply(false); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === "received" && !isWritingReply
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                  : "hover:bg-white/5 text-slate-350"
                }`}
            >
              📥 Letters from Zaidi ({letters.length})
            </button>
            <button
              onClick={() => { setActiveTab("sent"); setIsWritingReply(false); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === "sent" && !isWritingReply
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                  : "hover:bg-white/5 text-slate-350"
                }`}
            >
              📤 Sent Replies ({replies.length})
            </button>
          </div>

          <button
            onClick={() => setIsWritingReply(true)}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold transition-all duration-300 shadow-lg shadow-pink-500/10 text-xs flex items-center gap-2"
          >
            {activeTab === "received" ? "✍️ Write a Letter as Zaidi" : "✍️ Write a Reply as Ummi"}
          </button>
        </div>
        */}

        {/* Writing Stationary View */}
        {isWritingReply ? (
          <div className="w-full max-w-2xl p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl animate-fade-in relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsWritingReply(false)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono">
                Stationary Card
              </span>
              <h2 className="text-2xl font-black text-white mt-3">
                {activeTab === "received" ? "Compose Letter as Zaidi" : "Compose Reply as Ummi"}
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                {activeTab === "received"
                  ? "This letter will be sealed and added to the envelopes list."
                  : "This message will be sealed and placed in the outbox."}
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., My response, A sweet note, Commitment..."
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-355"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Your Letter</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write your heart out here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full py-4 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-xs font-semibold focus:outline-none focus:border-pink-500/80 transition-all duration-355 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all duration-300 shadow-lg shadow-pink-500/20 text-xs flex items-center justify-center gap-2"
              >
                <span>{activeTab === "received" ? "📬 Seal & Add to Envelopes" : "📬 Seal & Send Letter"}</span>
              </button>
            </form>
          </div>
        ) : activeTab === "received" ? (
          /* Envelopes Desk View (Received from Zaidi) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl justify-items-center mt-6">
            {letters.map((letter) => (
              <div key={letter.id} className="flex flex-col items-center gap-4">
                <div
                  onClick={() => openLetter(letter)}
                  className="envelope-container hover:scale-105 transition-transform duration-300"
                >
                  <div className="envelope flex items-center justify-center">
                    <div className="envelope-flap" />
                    <div className="wax-seal" />
                    <div className="text-center z-20 px-4 mt-6">
                      <span className="text-[10px] font-mono text-amber-950 font-bold uppercase tracking-wider opacity-60">
                        {letter.date}
                      </span>
                      <p className="text-slate-900 font-extrabold text-sm truncate max-w-[200px] mt-1">
                        {letter.subject}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">From: {letter.sender}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Sent Replies Desk View (Written by Ummi) */
          <div className="w-full max-w-3xl space-y-4">
            {replies.length === 0 ? (
              <div className="text-center py-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-slate-500">
                <span className="text-4xl block mb-3">📭</span>
                <p className="text-sm font-semibold">No sent letters yet.</p>
                <p className="text-xs mt-1">Click "Write a Reply" above to start sending sweet notes back to Zaidi!</p>
              </div>
            ) : (
              replies.map((reply) => (
                <div
                  key={reply.id}
                  className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
                >
                  <div onClick={() => setSelectedLetter(reply)} className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Sealed Reply
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{reply.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-white hover:text-pink-300 transition-colors">
                      {reply.subject}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{reply.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(reply.id)}
                    className="self-end md:self-center px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 text-[10px] font-bold transition-all duration-300"
                  >
                    🗑️ Shred Letter
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Wax Seal Opening Modal Overlay */}
      {selectedLetter && isOpening && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="relative w-full max-w-sm p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col items-center text-center overflow-hidden">
            <button
              onClick={() => {
                setSelectedLetter(null);
                setIsOpening(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-widest font-mono mb-4">
              Security Seal
            </span>

            <h3 className="text-lg font-bold text-white mb-2">Unseal Zaidi's Letter</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-8">
              Click the pink wax seal below to break it and open the letter.
            </p>

            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              {/* Spinning circular background glow */}
              <div className="absolute inset-4 rounded-full border border-pink-500/15 scale-110 animate-ping opacity-25" />

              <div
                onClick={handleCrackSeal}
                className={`wax-seal scale-125 select-none ${sealCracked ? "cracked" : ""}`}
                style={{ top: "calc(50% - 24px)", left: "calc(50% - 24px)" }}
              />
            </div>

            <span className="text-[10px] font-semibold font-mono text-slate-500 uppercase tracking-widest">
              {sealCracked ? "Cracking seal..." : "Click seal to break"}
            </span>
          </div>
        </div>
      )}

      {/* Unfolded Letter Sheet Overlay */}
      {selectedLetter && !isOpening && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="parchment-letter relative w-full max-w-xl p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col min-h-[420px] max-h-[90vh] text-slate-900 overflow-y-auto">

            {/* Header info */}
            <div className="flex justify-between items-center border-b border-amber-900/15 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-900/50 uppercase tracking-wider block">
                  Sender: {selectedLetter.sender}
                </span>
                <h3 className="text-xl font-bold text-amber-950 font-serif leading-tight">
                  {selectedLetter.subject}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-amber-900/60 font-semibold">{selectedLetter.date}</span>
            </div>

            {/* Letter Content */}
            <div className="flex-1 font-serif text-base leading-relaxed text-amber-950 whitespace-pre-wrap italic">
              {selectedLetter.content}
            </div>

            {/* Put Back / Close Button */}
            <div className="mt-8 pt-4 border-t border-amber-900/15 flex justify-between items-center">
              <div>
                {(selectedLetter.id !== 1 && selectedLetter.id !== 2 && selectedLetter.id !== 3) && (
                  <button
                    onClick={() => handleDeleteMessage(selectedLetter.id)}
                    className="py-2.5 px-5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-800 font-bold font-serif transition-all duration-300 text-xs border border-rose-500/30"
                  >
                    🗑️ Shred Letter
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedLetter(null)}
                className="py-2.5 px-6 rounded-xl bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 font-bold font-serif transition-all duration-300 text-xs border border-amber-900/25"
              >
                Close Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
