"use client";

import React, { useState, useEffect } from "react";

interface SwappingPuzzleProps {
  onBackToMenu: () => void;
  onLock: () => void;
}

export default function SwappingPuzzle({ onBackToMenu, onLock }: SwappingPuzzleProps) {
  // Puzzle Game state
  const [puzzleGridSize, setPuzzleGridSize] = useState<number>(6);
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [puzzleMoves, setPuzzleMoves] = useState<number>(0);
  const [showTileNumbers, setShowTileNumbers] = useState<boolean>(false);
  const [showOriginalPreview, setShowOriginalPreview] = useState<boolean>(false);

  // Initialize and Shuffle Puzzle using Fisher-Yates shuffle
  const initPuzzle = (size: number) => {
    const total = size * size;
    const shuffled = Array.from({ length: total }, (_, i) => i);
    
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    
    // Ensure it's not randomly fully solved (though extremely rare for larger sizes)
    const isAlreadySolved = shuffled.every((val, i) => val === i);
    if (isAlreadySolved && total > 1) {
      const temp = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = temp;
    }
    
    setPuzzleTiles(shuffled);
    setPuzzleGridSize(size);
    setSelectedTileIndex(null);
    setPuzzleSolved(false);
    setPuzzleMoves(0);
  };

  // Handle click on puzzle tiles (swapping mechanism)
  const handleTileClick = (clickedIdx: number) => {
    if (puzzleSolved) return;
    
    if (selectedTileIndex === null) {
      // Select the first tile
      setSelectedTileIndex(clickedIdx);
    } else if (selectedTileIndex === clickedIdx) {
      // Clicking the same tile deselects it
      setSelectedTileIndex(null);
    } else {
      // Swap the two selected tiles
      const nextTiles = [...puzzleTiles];
      const temp = nextTiles[selectedTileIndex];
      nextTiles[selectedTileIndex] = nextTiles[clickedIdx];
      nextTiles[clickedIdx] = temp;
      
      setPuzzleTiles(nextTiles);
      setPuzzleMoves(m => m + 1);
      setSelectedTileIndex(null);
      
      // Check if solved
      const isWon = nextTiles.every((val, i) => val === i);
      if (isWon) {
        setPuzzleSolved(true);
      }
    }
  };

  // Cheat solve helper (makes the puzzle 1 swap away from solved by swapping index 0 and 1)
  const cheatSolve = () => {
    const size = puzzleGridSize;
    const total = size * size;
    const solved = Array.from({ length: total }, (_, i) => i);
    const cheatTiles = [...solved];
    
    // Swap the first two tiles so the user only has to swap them back to win
    cheatTiles[0] = 1;
    cheatTiles[1] = 0;
    
    setPuzzleTiles(cheatTiles);
    setSelectedTileIndex(null);
    setPuzzleSolved(false);
  };

  // Auto-initialize puzzle
  useEffect(() => {
    if (puzzleTiles.length === 0) {
      initPuzzle(6);
    }
  }, [puzzleTiles.length]);

  return (
    <div className="min-h-screen bg-[#07030c] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />

      {/* Floating puzzle shapes in background */}
      <div className="absolute top-1/4 left-10 text-white/5 text-4xl select-none pointer-events-none">🧩</div>
      <div className="absolute top-1/3 left-20 text-white/5 text-2xl select-none pointer-events-none">🧩</div>
      <div className="absolute bottom-1/4 right-20 text-white/5 text-4xl select-none pointer-events-none">🧩</div>
      <div className="absolute bottom-1/3 right-10 text-white/5 text-2xl select-none pointer-events-none">🧩</div>

      {/* Header bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">🧩</span>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent uppercase">
              Puzzle Chamber
            </h1>
            <p className="text-[10px] text-indigo-300/60 font-mono tracking-widest uppercase">
              zaid's sliding matrix challenge
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

      {/* Main interactive area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 z-20">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-5">
            <div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase tracking-wider font-mono">
                Challenge Level
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white mt-2">
                Image Swapping Puzzle
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Click a tile to select it, then click another tile to swap their positions. Swap the pieces until the portrait of Zaid is correctly reconstructed.
              </p>
            </div>

            {/* Grid Size Selectors */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold font-mono text-slate-300 block uppercase tracking-wider">
                Grid Matrix Dimension:
              </span>
              <div className="flex gap-2">
                {[3, 6, 7].map((size) => (
                  <button
                    key={size}
                    onClick={() => initPuzzle(size)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      puzzleGridSize === size
                        ? "bg-pink-500/20 border-pink-500 text-pink-200 shadow-md shadow-pink-500/10"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                    }`}
                  >
                    {size} x {size} {size === 6 ? "(6x6)" : size === 7 ? "(7x7)" : "(3x3)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Swaps Made</span>
                <span className="text-xl font-bold font-mono text-pink-400">{puzzleMoves}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Status</span>
                <span className={`text-xs font-bold ${puzzleSolved ? "text-emerald-400" : "text-amber-400"}`}>
                  {puzzleSolved ? "✨ Solved" : "🎮 In Progress"}
                </span>
              </div>
            </div>

            {/* Helpers / Toggles */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <span className="text-[11px] font-semibold font-mono text-slate-300 block uppercase tracking-wider">
                Assistance Tools:
              </span>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showTileNumbers}
                    onChange={(e) => setShowTileNumbers(e.target.checked)}
                    className="accent-pink-500 w-4 h-4 rounded border-white/10 bg-white/5"
                  />
                  Show Helper Numbers
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showOriginalPreview}
                    onChange={(e) => setShowOriginalPreview(e.target.checked)}
                    className="accent-pink-500 w-4 h-4 rounded border-white/10 bg-white/5"
                  />
                  Preview Target Image
                </label>
              </div>
            </div>

            {/* Reset and Cheat Solve */}
            <div className="flex gap-2 border-t border-white/5 pt-4">
              <button
                onClick={() => initPuzzle(puzzleGridSize)}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                🔄 Reshuffle
              </button>
              {!puzzleSolved && (
                <button
                  onClick={cheatSolve}
                  className="flex-1 py-3 px-4 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  💡 Cheat Solve
                </button>
              )}
            </div>
          </div>

          {/* Target Image Preview Box */}
          {showOriginalPreview && (
            <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex flex-col items-center text-center animate-fade-in">
              <span className="text-[10px] font-semibold font-mono text-slate-400 block uppercase mb-2">
                Goal Preview
              </span>
              <div className="w-32 aspect-[3/4] rounded-lg border border-white/20 overflow-hidden shadow-lg">
                <img src="/zaid.png" alt="Target Goal" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Grid Canvas Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {/* The outer decorative frame */}
          <div className="relative w-full max-w-[380px] p-3 rounded-3xl bg-black/45 border border-white/10 shadow-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
            {/* Inner ambient board light */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

            {/* Success celebration screen */}
            {puzzleSolved && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-30 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 animate-bounce">
                  <span className="text-5xl">👑</span>
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent animate-pulse">
                  Congratulations!
                </h3>
                <p className="text-lg font-bold text-white mt-4 max-w-xs leading-relaxed">
                  Thank you so much for your effort!
                </p>
                <p className="text-slate-400 text-xs font-mono mt-2">
                  Completed in {puzzleMoves} swaps
                </p>
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => initPuzzle(puzzleGridSize)}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold transition-all duration-300 shadow-lg shadow-amber-500/20 text-xs"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onBackToMenu}
                    className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 text-xs"
                  >
                    Return to Menu
                  </button>
                </div>
              </div>
            )}

            {/* The Swapping Tile Canvas */}
            <div 
              className="grid w-full h-full gap-[2px] bg-slate-950 rounded-xl overflow-hidden select-none"
              style={{
                gridTemplateColumns: `repeat(${puzzleGridSize}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${puzzleGridSize}, minmax(0, 1fr))`
              }}
            >
              {puzzleTiles.map((tileValue, idx) => {
                const isSelected = selectedTileIndex === idx;
                
                // Compute background position coordinates
                const origRow = Math.floor(tileValue / puzzleGridSize);
                const origCol = tileValue % puzzleGridSize;
                const backgroundPosition = `${(origCol / (puzzleGridSize - 1)) * 100}% ${(origRow / (puzzleGridSize - 1)) * 100}%`;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(idx)}
                    disabled={puzzleSolved}
                    className={`relative w-full h-full overflow-hidden transition-all duration-300 focus:outline-none ${
                      puzzleSolved 
                        ? "cursor-default border-transparent" 
                        : isSelected
                          ? "border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.85)] scale-[0.93] z-10 rounded-lg"
                          : "hover:scale-[0.98] active:scale-95 border border-white/[0.05]"
                    }`}
                    style={{
                      backgroundImage: `url('/zaid.png')`,
                      backgroundSize: `${puzzleGridSize * 100}% ${puzzleGridSize * 100}%`,
                      backgroundPosition: backgroundPosition,
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    {/* Optional helper tile numbers */}
                    {showTileNumbers && (
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-xs font-mono font-bold text-white pointer-events-none">
                        {tileValue + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 text-center text-xs text-slate-500">
        <p>&copy; 2026 Toolip Sanctuary. Made with love for Zaid.</p>
      </footer>
    </div>
  );
}
