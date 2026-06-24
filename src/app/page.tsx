"use client";

import React, { useState, useEffect, useRef } from "react";

// Tulip color palette options (with Velvet Rose as rich red matching the user's photo)
const TULIP_COLORS = [
  {
    id: "red",
    name: "Crimson Scarlet",
    main: "#dc2626",
    light: "#f87171",
    dark: "#7f1d1d",
    description: "Classic red tulips represent true, passionate, and everlasting love.",
  },
  {
    id: "yellow",
    name: "Amber Sun",
    main: "#f59e0b",
    light: "#fcd34d",
    dark: "#78350f",
    description: "Bright yellow tulips represent cheerfulness, hope, and sunny thoughts.",
  },
  {
    id: "purple",
    name: "Royal Velvet",
    main: "#8b5cf6",
    light: "#c084fc",
    dark: "#4c1d95",
    description: "Deep purple tulips carry the royal meaning of nobility and rebirth.",
  },
  {
    id: "cyan",
    name: "Glacier Blue",
    main: "#0ea5e9",
    light: "#7dd3fc",
    dark: "#0f172a",
    description: "A rare, fantasy shade representing uniqueness and looking forward to the future.",
  },
  {
    id: "white",
    name: "White Lily",
    main: "#e2e8f0",
    light: "#ffffff",
    dark: "#475569",
    description: "Pure white tulips symbolise respect, apology, and new beginnings.",
  },
];

// Interactive Tulip Parts with detailed facts (The "Toolips")
const TULIP_PARTS = {
  blossom: {
    id: "blossom",
    name: "The Petals (Blossom)",
    emoji: "🌷",
    tagline: "The crowning glory of the tulip flower.",
    fact: "In daylight, the petals open wide to catch sun rays and invite pollinators. At night, they close shut in a process called nictinasty to protect the delicate pollen from dew and cold.",
    didYouKnow: "During World War II in the Netherlands, a famine led citizens to eat tulip bulbs. Tulip petals are also edible and have a crisp, peppery taste!",
  },
  leaves: {
    id: "leaves",
    name: "The Foliage (Leaves)",
    emoji: "🍃",
    tagline: "Waxy, green powerhouses.",
    fact: "Tulip leaves are coated with a protective waxy cuticle that locks in moisture and prevents water loss. They grow spirally up the stem to capture as much sunlight as possible.",
    didYouKnow: "Tulip leaves have parallel veins, characteristic of monocot plants. A healthy green color tells you the bulb has stored enough nitrogen.",
  },
  stem: {
    id: "stem",
    name: "The Stem (Scape)",
    emoji: "🌱",
    tagline: "A flexible and active support structure.",
    fact: "Unlike most cut flowers that stop growing, tulip stems continue to grow and stretch in height even after being cut and placed in a vase of water!",
    didYouKnow: "Tulip stems are phototropic—they will bend and curve dynamically in search of the strongest light source in a room.",
  },
  pot: {
    id: "pot",
    name: "The Bulb & Soil",
    emoji: "🪵",
    tagline: "The underground food storage.",
    fact: "Tulips grow from underground bulbs, which are actually modified stems wrapped in thick, fleshy leaves that store nutrients during winter dormancy.",
    didYouKnow: "During 'Tulip Mania' in 1637, single tulip bulbs sold for more than 10 times the annual income of a skilled craftsman, triggering history's first major asset bubble!",
  },
};

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

interface Sparkle {
  id: number;
  left: string;
  bottom: string;
  dx: string;
  dy: string;
  size: string;
}

interface BouquetTulipProps {
  leftOffset: string;
  rotation: string;
  scale: number;
  zIndex: number;
  colorOffset: number;
  isBlooming: boolean;
  windClass: string;
  blossomWindClass: string;
  activeColor: typeof TULIP_COLORS[0];
}

// Reusable Bouquet Tulip Component for clean rendering of secondary flowers
function BouquetTulip({
  leftOffset,
  rotation,
  scale,
  zIndex,
  colorOffset,
  isBlooming,
  windClass,
  blossomWindClass,
  activeColor,
}: BouquetTulipProps) {
  const bouquetColor = TULIP_COLORS[(TULIP_COLORS.findIndex((c) => c.id === activeColor.id) + colorOffset) % TULIP_COLORS.length];
  
  return (
    <div 
      className={`stem-sway-container ${windClass}`}
      style={{
        position: "absolute",
        bottom: "105px",
        left: leftOffset,
        transformOrigin: "bottom center",
        zIndex: zIndex,
        transform: `scale(${scale}) rotate(${rotation})`,
      }}
    >
      <div 
        className="tulip-stem grow-stem"
        style={{
          // @ts-expect-error custom property passing
          "--tulip-color": bouquetColor.main,
          "--tulip-color-light": bouquetColor.light,
          "--tulip-color-dark": bouquetColor.dark,
        }}
      >
        <div className="tulip-leaf tulip-leaf-left grow-leaf-left" />
        <div className="tulip-leaf tulip-leaf-right grow-leaf-right" />
        
        <div 
          className={`blossom-sway-container ${blossomWindClass}`}
          style={{
            position: "absolute",
            top: "-84px",
            left: "calc(50% - 40px)",
            transformOrigin: "bottom center",
            zIndex: 5,
          }}
        >
          <div className="tulip-blossom grow-blossom">
            <div className="tulip-receptacle" />
            <div className={`petal petal-back-left ${isBlooming ? "open-back-left" : ""}`} />
            <div className={`petal petal-back-right ${isBlooming ? "open-back-right" : ""}`} />
            <div className={`petal petal-center ${isBlooming ? "open-center" : ""}`} />
            <div className={`petal petal-left ${isBlooming ? "open-left" : ""}`} />
            <div className={`petal petal-right ${isBlooming ? "open-right" : ""}`} />
            <div className={`petal petal-front ${isBlooming ? "open-front" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Auth state
  const [authInput, setAuthInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // Tulip State
  const [activePart, setActivePart] = useState<keyof typeof TULIP_PARTS | null>(null);
  const [activeColor, setActiveColor] = useState(TULIP_COLORS[0]);
  const [themeMode, setThemeMode] = useState<"sunset" | "day" | "night">("sunset");
  const [windSpeed, setWindSpeed] = useState<"calm" | "gentle" | "strong">("gentle");
  const [viewMode, setViewMode] = useState<"single" | "bouquet">("single");
  
  // Interactive stats
  const [hydration, setHydration] = useState(70);
  const [growth, setGrowth] = useState(80);
  const [isWatering, setIsWatering] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<Sparkle>>([]);
  const [rainDrops, setRainDrops] = useState<Array<Particle>>([]);

  const gardenRef = useRef<HTMLDivElement>(null);

  // Set mounted state and check auth status
  useEffect(() => {
    setMounted(true);
    
    // Check if previously unlocked
    if (typeof window !== "undefined") {
      const savedUnlock = localStorage.getItem("zaid_garden_unlocked");
      if (savedUnlock === "true") {
        setIsUnlocked(true);
      }
    }

    // Generate rain drop indices
    const drops = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${0.8 + Math.random() * 0.5}s`,
    }));
    setRainDrops(drops);
  }, []);

  // Set hydration decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHydration((h) => Math.max(15, h - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Apply custom CSS variables for the tulip colors
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--tulip-color", activeColor.main);
      root.style.setProperty("--tulip-color-light", activeColor.light);
      root.style.setProperty("--tulip-color-dark", activeColor.dark);
    }
  }, [activeColor]);

  // Handle Auth Gate Submission
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = authInput.trim().toLowerCase();
    
    // Accept "black", "master", "back", "red", "crimson" (case-insensitive)
    const allowed = ["black", "master", "back", "red", "crimson"];
    if (allowed.includes(answer)) {
      if (typeof window !== "undefined") {
        localStorage.setItem("zaid_garden_unlocked", "true");
      }
      setIsUnlocked(true);
    } else {
      setAuthError("Incorrect answer. Try Zaid's favorite dark color or nickname!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Handle Watering Action
  const handleWatering = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isWatering) return;
    setIsWatering(true);
    
    // Get relative click coordinate for ripple in pot or soil
    if (gardenRef.current) {
      const rect = gardenRef.current.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height - 70; // Adjusted for shifted pot position (bottom: 20px)
      
      const newRipple = { id: Date.now(), x, y };
      setRipples((r) => [...r, newRipple]);
      
      // Clear ripples later
      setTimeout(() => {
        setRipples((r) => r.filter((item) => item.id !== newRipple.id));
      }, 1500);
    }

    // Hydration increases
    setHydration((h) => Math.min(100, h + 20));
    // Growth increases
    setGrowth((g) => Math.min(100, g + 5));

    // Generate floating sparkles
    const newSparkles = Array.from({ length: 12 }).map((_, i) => {
      const dx = `${-80 + Math.random() * 160}px`;
      const dy = `${-180 - Math.random() * 120}px`;
      const size = `${4 + Math.random() * 6}px`;
      return {
        id: Date.now() + i,
        left: `${35 + Math.random() * 30}%`,
        bottom: `115px`, // Adjusted for shifted pot
        dx,
        dy,
        size,
      };
    });
    setSparkles((s) => [...s, ...newSparkles]);

    // Clear sparkles and stop watering animation
    setTimeout(() => {
      setIsWatering(false);
    }, 2000);

    setTimeout(() => {
      setSparkles((s) => s.filter((item) => !newSparkles.find((ns) => ns.id === item.id)));
    }, 3000);
  };

  // Determine stem wind classes
  const getWindClass = (base: string) => {
    if (windSpeed === "calm") return `${base}-calm`;
    if (windSpeed === "strong") return `${base}-strong`;
    return `${base}-gentle`;
  };

  // Determine blossom secondary wind classes
  const getBlossomWindClass = () => {
    if (windSpeed === "calm") return "wind-sway-blossom-calm";
    if (windSpeed === "strong") return "wind-sway-blossom-strong";
    return "wind-sway-blossom-gentle";
  };

  // Determine if tulip is open (blossoming) based on environment
  const isTulipBlooming = themeMode !== "night";

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0614]">
        <div className="text-center text-slate-400">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="animate-pulse">Cultivating garden...</p>
        </div>
      </div>
    );
  }

  // Security Verification Screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#07040d] text-slate-100 p-6 relative overflow-hidden">
        {/* Animated background lights */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-900/30 filter blur-[80px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-900/20 filter blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

        {/* Floating background petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 pointer-events-none animate-bounce"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            🌷
          </div>
        ))}

        {/* Security Challenge Card */}
        <div className={`w-full max-w-md p-8 rounded-2xl glass-panel border border-white/10 z-10 transition-all duration-300 ${
          isShaking ? "animate-shake border-rose-500/40" : ""
        }`}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mx-auto mb-4 animate-bounce">
              <span className="text-4xl">🌷</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-white to-pink-200 bg-clip-text text-transparent">
              Toolip Sanctuary
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              authentication required
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-slate-300 mb-2.5">
                Do you know Zaid's favorite color or nickname?
              </label>
              <input
                type="text"
                value={authInput}
                onChange={(e) => {
                  setAuthInput(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter answer..."
                className="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 transition-all duration-300"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-405 font-semibold leading-relaxed text-center bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-lg">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold transition-all duration-300 shadow-lg shadow-white/5 flex items-center justify-center gap-2"
            >
              <span>Unlock Garden</span>
              <span>🔑</span>
            </button>
          </form>

          <div className="text-[10px] text-center text-slate-500 font-mono mt-6 border-t border-white/5 pt-4">
            🔒 Security Gate &bull; Capital/Small both accepted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between transition-all duration-1000 ${
      themeMode === "day" ? "bg-day text-amber-950" : themeMode === "night" ? "bg-night text-slate-100" : "bg-sunset text-slate-100"
    }`}>
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌷</span>
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${themeMode === 'day' ? 'text-amber-950' : 'text-white'}`}>
              Toolip
            </h1>
            <p className={`text-xs opacity-75 font-mono`}>
              the css bloom interactive
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("zaid_garden_unlocked");
              }
              setIsUnlocked(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              themeMode === "day" ? "bg-amber-100 hover:bg-amber-200 text-amber-800" : "bg-white/10 hover:bg-white/20 text-white/90"
            } backdrop-blur-md border border-white/10 transition-colors mr-2`}
          >
            🔒 Lock
          </button>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            themeMode === "day" ? "bg-amber-100 text-amber-800" : "bg-white/10 text-white/90"
          } backdrop-blur-md border border-white/10`}>
            🌱 Interactive Garden v1.3
          </span>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
        {/* Left Column: The Interactive CSS Tulip Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[500px]">
          {/* Glassmorphic border ring around garden */}
          <div className={`absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ${
            themeMode === "day" ? "bg-white/40 shadow-inner" : "bg-black/35 shadow-2xl"
          } backdrop-blur-sm border border-white/10 flex items-center justify-center`}>
            {/* Ambient Sun/Moon light reflection */}
            <div className={`absolute top-10 w-72 h-72 rounded-full filter blur-[80px] opacity-35 transition-all duration-1000 ${
              themeMode === "day" ? "bg-amber-300" : themeMode === "night" ? "bg-indigo-900" : "bg-pink-500"
            }`} />
          </div>

          {/* Environmental animations (Rain / Dust) */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {isWatering && rainDrops.map((drop) => (
              <div
                key={drop.id}
                className="rain-particle"
                style={{
                  left: drop.left,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                }}
              />
            ))}
            
            {/* Ambient slow-floating dust/pollen */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-200/40 rounded-full animate-pulse pointer-events-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Interactive instruction banner */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono opacity-80 z-20">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              Hover / Click components to inspect
            </span>
            <span>State: {isWatering ? "☔ Watering" : windSpeed === "strong" ? "🍃 Windy" : "☀️ Ambient"}</span>
          </div>

          {/* The Tulip Showcase Garden container (Using inline style positioning to guarantee order correctness) */}
          <div 
            ref={gardenRef}
            className="tulip-garden scale-95 md:scale-105 transition-transform duration-500"
            style={{
              position: "relative",
              width: "320px",
              height: "480px",
            }}
          >
            {/* Floating click/water ripples */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="water-ripple"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}

            {/* Sparkles rising from watering */}
            {sparkles.map((sparkle) => (
              <div
                key={sparkle.id}
                className="sparkle-particle"
                style={{
                  left: sparkle.left,
                  bottom: sparkle.bottom,
                  width: sparkle.size,
                  height: sparkle.size,
                  // @ts-expect-error Custom CSS variables passed to keyframes
                  "--dx": sparkle.dx,
                  "--dy": sparkle.dy,
                }}
              />
            ))}

            {/* Bouquet Mode: Render 4 Additional Tulips (Total 5 Flowers) */}
            {viewMode === "bouquet" && (
              <>
                {/* Tulip 1: Left Outer (Shifted left, smaller, rotated left) */}
                <BouquetTulip
                  leftOffset="calc(50% - 46px)"
                  rotation="-18deg"
                  scale={0.8}
                  zIndex={2}
                  colorOffset={3}
                  isBlooming={isTulipBlooming}
                  windClass={getWindClass("wind-sway")}
                  blossomWindClass={getBlossomWindClass()}
                  activeColor={activeColor}
                />

                {/* Tulip 2: Left Inner (Shifted left, medium, rotated left) */}
                <BouquetTulip
                  leftOffset="calc(50% - 25px)"
                  rotation="-8deg"
                  scale={0.9}
                  zIndex={3}
                  colorOffset={1}
                  isBlooming={isTulipBlooming}
                  windClass={getWindClass("wind-sway")}
                  blossomWindClass={getBlossomWindClass()}
                  activeColor={activeColor}
                />

                {/* Tulip 3: Right Inner (Shifted right, medium, rotated right) */}
                <BouquetTulip
                  leftOffset="calc(50% + 17px)"
                  rotation={window.innerWidth < 0 ? "0deg" : "8deg"}
                  scale={0.9}
                  zIndex={3}
                  colorOffset={2}
                  isBlooming={isTulipBlooming}
                  windClass={getWindClass("wind-sway")}
                  blossomWindClass={getBlossomWindClass()}
                  activeColor={activeColor}
                />

                {/* Tulip 4: Right Outer (Shifted right, smaller, rotated right) */}
                <BouquetTulip
                  leftOffset="calc(50% + 38px)"
                  rotation="18deg"
                  scale={0.8}
                  zIndex={2}
                  colorOffset={4}
                  isBlooming={isTulipBlooming}
                  windClass={getWindClass("wind-sway")}
                  blossomWindClass={getBlossomWindClass()}
                  activeColor={activeColor}
                />
              </>
            )}

            {/* Central Main Interactive Tulip */}
            <div 
              className={`stem-sway-container ${getWindClass("wind-sway")}`}
              style={{
                position: "absolute",
                bottom: "105px",
                left: "calc(50% - 4px)",
                transformOrigin: "bottom center",
                zIndex: 4,
              }}
            >
              <div
                className="tulip-stem grow-stem toolip-trigger"
                onMouseEnter={() => setActivePart("stem")}
                onClick={() => setActivePart("stem")}
              >
                {/* Glowing indicator for stem */}
                <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2" />

                {/* Left Leaf (nested inside stem, relative coordinate positioning) */}
                <div 
                  className="tulip-leaf tulip-leaf-left grow-leaf-left toolip-trigger"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setActivePart("leaves");
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart("leaves");
                  }}
                >
                  <div className="glow-indicator top-1/3 left-1/3" />
                </div>

                {/* Right Leaf (nested inside stem, relative coordinate positioning) */}
                <div 
                  className="tulip-leaf tulip-leaf-right grow-leaf-right toolip-trigger"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setActivePart("leaves");
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart("leaves");
                  }}
                >
                  <div className="glow-indicator top-1/3 right-1/3" />
                </div>

                {/* Blossom sway container (holds independent sway logic) */}
                <div 
                  className={`blossom-sway-container ${getBlossomWindClass()}`}
                  style={{
                    position: "absolute",
                    top: "-84px",
                    left: "calc(50% - 40px)",
                    transformOrigin: "bottom center",
                    zIndex: 5,
                  }}
                >
                  {/* Blossom shape (direct child of sway, handles scale-based growth) */}
                  <div 
                    className="tulip-blossom grow-blossom toolip-trigger"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setActivePart("blossom");
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePart("blossom");
                    }}
                  >
                    {/* Receptacle (green base connection) */}
                    <div className="tulip-receptacle" />

                    {/* Petals backing */}
                    <div className={`petal petal-back-left ${isTulipBlooming ? "open-back-left" : ""}`} />
                    <div className={`petal petal-back-right ${isTulipBlooming ? "open-back-right" : ""}`} />
                    
                    {/* Center petal */}
                    <div className={`petal petal-center ${isTulipBlooming ? "open-center" : ""}`} />
                    
                    {/* Left/Right foreground overlapping petals */}
                    <div className={`petal petal-left ${isTulipBlooming ? "open-left" : ""}`} />
                    <div className={`petal petal-right ${isTulipBlooming ? "open-right" : ""}`} />
                    
                    {/* Front overlay petal */}
                    <div className={`petal petal-front ${isTulipBlooming ? "open-front" : ""}`} />

                    {/* Glowing highlight indicator */}
                    <div className="glow-indicator top-6 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Soil (Above Pot Rim, Absolute positioned relative to garden) */}
            <div 
              className="soil toolip-trigger"
              style={{
                position: "absolute",
                bottom: "100px",
                left: "calc(50% - 66px)",
                zIndex: 9,
              }}
              onMouseEnter={() => setActivePart("pot")}
              onClick={() => setActivePart("pot")}
            />

            {/* Pot Rim (Absolute positioned relative to garden) */}
            <div 
              className="pot-rim toolip-trigger"
              style={{
                position: "absolute",
                bottom: "104px",
                left: "calc(50% - 75px)",
                zIndex: 11,
              }}
              onMouseEnter={() => setActivePart("pot")}
              onClick={() => setActivePart("pot")}
            />

            {/* The Soil Pot (Absolute positioned relative to garden) */}
            <div 
              className="flower-pot toolip-trigger"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "calc(50% - 70px)",
                zIndex: 10,
              }}
              onMouseEnter={() => setActivePart("pot")}
              onClick={() => setActivePart("pot")}
            >
              <div className="glow-indicator top-6 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphic Control Dashboard */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full z-10">
          {/* Section 1: Dashboard Panel */}
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200"
              : "glass-panel text-slate-100 border-white/10"
          }`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎛️</span> Environmental Controls
            </h2>

            {/* Arrangement Toggle (Single vs Bouquet) */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Garden Arrangement</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "single", name: "🌷 Single Bloom", desc: "One custom flower" },
                  { id: "bouquet", name: "💐 Bouquet", desc: "5-Flower arrangement" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as "single" | "bouquet")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      viewMode === mode.id
                        ? themeMode === "day"
                          ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                          : "bg-white text-slate-900 border-white shadow-lg"
                        : themeMode === "day"
                          ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                          : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Day/Night Toggles */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Time of Day</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "day", name: "☀️ Day", desc: "Bright sunshine" },
                  { id: "sunset", name: "🌅 Sunset", desc: "Warm glow" },
                  { id: "night", name: "🌙 Night", desc: "Petals close" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setThemeMode(mode.id as "sunset" | "day" | "night")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      themeMode === mode.id
                        ? themeMode === "day"
                          ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                          : "bg-white text-slate-900 border-white shadow-lg shadow-white/5"
                        : themeMode === "day"
                          ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                          : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Breeze Toggles */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Breeze Strength</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "calm", name: "Silent", desc: "No wind" },
                  { id: "gentle", name: "Gentle", desc: "Soft sway" },
                  { id: "strong", name: "Gale", desc: "Heavy sway" },
                ].map((wind) => (
                  <button
                    key={wind.id}
                    onClick={() => setWindSpeed(wind.id as "calm" | "gentle" | "strong")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      windSpeed === wind.id
                        ? themeMode === "day"
                          ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                          : "bg-white text-slate-900 border-white shadow-lg"
                        : themeMode === "day"
                          ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                          : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                    }`}
                  >
                    {wind.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Water and Nourish */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Nourishment</label>
              <button
                onClick={handleWatering}
                disabled={isWatering}
                className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all duration-500 shadow-lg ${
                  isWatering
                    ? "bg-sky-600/50 text-sky-100 border-sky-400 cursor-not-allowed animate-pulse"
                    : themeMode === "day"
                      ? "bg-amber-900 hover:bg-amber-950 text-white border-amber-950 shadow-amber-900/10"
                      : "bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-sky-300 shadow-sky-500/20"
                }`}
              >
                <span>{isWatering ? "🌧️ Watering..." : "💦 Water the Flower"}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Color Customizer */}
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200"
              : "glass-panel text-slate-100 border-white/10"
          }`}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>🎨</span> Color Customizer
            </h2>
            <p className="text-xs opacity-75 mb-4">
              Select a pigment to modify the primary tulip petals' color profile.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {TULIP_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(color)}
                  className={`group relative p-2.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 ${
                    activeColor.id === color.id
                      ? themeMode === "day"
                        ? "bg-amber-200/80 border-amber-800 shadow"
                        : "bg-white/15 border-white/40 shadow-inner"
                      : themeMode === "day"
                        ? "bg-amber-100/30 hover:bg-amber-100/70 border-amber-200"
                        : "bg-white/5 hover:bg-white/10 border-white/10"
                  }`}
                >
                  {/* Miniature petal color circle */}
                  <span
                    className="w-4 h-4 rounded-full inline-block border border-black/20 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
                    }}
                  />
                  <span className="text-xs font-semibold">{color.name}</span>

                  {/* Tick selection mark */}
                  {activeColor.id === color.id && (
                    <span className="text-emerald-500 text-[10px] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Color symbolism tooltip details */}
            <div className="mt-3.5 pt-3.5 border-t border-white/10 text-xs italic opacity-75">
              <strong>Symbolism:</strong> {activeColor.description}
            </div>
          </div>

          {/* Section 3: Toolip Encyclopedia (Interactive display) */}
          <div className={`p-6 rounded-2xl border min-h-[190px] flex flex-col justify-between transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200 shadow-lg"
              : "glass-panel text-slate-100 border-white/10 shadow-xl"
          }`}>
            {activePart ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <span>{TULIP_PARTS[activePart].emoji}</span> {TULIP_PARTS[activePart].name}
                  </h3>
                  <button 
                    onClick={() => setActivePart(null)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition-colors"
                  >
                    Clear Focus
                  </button>
                </div>
                <p className="text-xs font-semibold text-sky-400 mb-2 italic">
                  &ldquo;{TULIP_PARTS[activePart].tagline}&rdquo;
                </p>
                <p className="text-xs opacity-90 leading-relaxed mb-3">
                  {TULIP_PARTS[activePart].fact}
                </p>
                <div className="p-3 rounded-xl bg-black/25 text-[11px] leading-relaxed border border-white/5">
                  <strong className="text-amber-350 block mb-1">💡 Did you know?</strong>
                  {TULIP_PARTS[activePart].didYouKnow}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 my-auto opacity-75 animate-fade-in">
                <span className="text-3xl mb-2 animate-bounce">🐝</span>
                <h3 className="font-bold text-sm mb-1">Hover over the Tulip components</h3>
                <p className="text-xs max-w-[280px]">
                  Explore different anatomical parts (Petals, Leaves, Stem, or Pot) to unlock their botanical secrets and history!
                </p>
              </div>
            )}
            
            {/* Garden Health Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 mt-4 text-center">
              <div>
                <span className="text-xs opacity-75 block font-mono">Hydration</span>
                <span className={`text-sm font-bold font-mono ${hydration < 35 ? "text-rose-400 animate-pulse" : "text-sky-400"}`}>
                  {hydration}%
                </span>
                <div className="w-full h-1 bg-black/30 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-sky-400 transition-all duration-500" style={{ width: `${hydration}%` }} />
                </div>
              </div>
              
              <div>
                <span className="text-xs opacity-75 block font-mono">Growth Progress</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {growth}%
                </span>
                <div className="w-full h-1 bg-black/30 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${growth}%` }} />
                </div>
              </div>

              <div>
                <span className="text-xs opacity-75 block font-mono">Sun Exposure</span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  {themeMode === "day" ? "Optimal" : themeMode === "sunset" ? "Medium" : "None"}
                </span>
                <div className="w-full h-1 bg-black/30 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-500" 
                    style={{ width: themeMode === "day" ? "100%" : themeMode === "sunset" ? "50%" : "0%" }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full max-w-7xl mx-auto px-6 py-6 border-t mt-4 flex flex-col md:flex-row items-center justify-between text-xs opacity-75 z-20 ${
        themeMode === "day" ? "border-amber-200 text-amber-900" : "border-white/10 text-slate-400"
      }`}>
        <p>&copy; 2026 Toolip Garden Explorer. Made with CSS shapes & React.</p>
        <div className="flex gap-4 mt-2 md:mt-0 font-mono">
          <span>HTML/CSS Artistry</span>
          <span>&bull;</span>
          <span>Interactive Tooltips</span>
        </div>
      </footer>
    </div>
  );
}
