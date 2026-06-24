"use client";

import React, { useState, useEffect, useRef } from "react";

// Tulip color palette options
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

// Sunflower color palette options
const SUNFLOWER_COLORS = [
  {
    id: "gold",
    name: "Amber Gold",
    main: "#f59e0b",
    light: "#fef08a",
    dark: "#78350f",
    description: "Classic golden yellow sunflowers represent warmth, adoration, and longevity.",
  },
  {
    id: "bronze",
    name: "Autumn Bronze",
    main: "#b45309",
    light: "#f59e0b",
    dark: "#451a03",
    description: "Rich terracotta and bronze shades represent harvest, strength, and grounding.",
  },
  {
    id: "lemon",
    name: "Lemon Ice",
    main: "#eab308",
    light: "#fef9c3",
    dark: "#713f12",
    description: "Pale primrose yellow represents fresh energy, cheerfulness, and lightheartedness.",
  },
  {
    id: "burgundy",
    name: "Velvet Wine",
    main: "#991b1b",
    light: "#f87171",
    dark: "#450a0a",
    description: "Rare deep red/burgundy sunflowers symbolize mystery, passion, and unique beauty.",
  },
  {
    id: "cream",
    name: "Vanilla Cream",
    main: "#fef08a",
    light: "#ffffff",
    dark: "#78350f",
    description: "Soft off-white and cream petals represent peace, gratitude, and purity.",
  },
];

// Rose color palette options
const ROSE_COLORS = [
  {
    id: "rose-red",
    name: "Classic Crimson",
    main: "#dc2626",
    light: "#f87171",
    dark: "#7f1d1d",
    description: "Deep red roses represent love, romance, and beautiful passion.",
  },
  {
    id: "rose-pink",
    name: "Blushing Pink",
    main: "#ec4899",
    light: "#fbcfe8",
    dark: "#9d174d",
    description: "Gentle pink roses represent gratitude, grace, admiration, and joy.",
  },
  {
    id: "rose-white",
    name: "Pure Alabaster",
    main: "#f1f5f9",
    light: "#ffffff",
    dark: "#475569",
    description: "White roses represent innocence, purity, spirituality, and new beginnings.",
  },
  {
    id: "rose-yellow",
    name: "Golden Joy",
    main: "#eab308",
    light: "#fef08a",
    dark: "#854d0e",
    description: "Yellow roses represent warm friendship, caring, and welcoming thoughts.",
  },
  {
    id: "rose-coral",
    name: "Sunset Coral",
    main: "#f97316",
    light: "#ffedd5",
    dark: "#9a3412",
    description: "Coral orange roses represent desire, excitement, and fierce enthusiasm.",
  },
];

// Interactive Tulip Parts
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

// Interactive Sunflower Parts
const SUNFLOWER_PARTS = {
  blossom: {
    id: "blossom",
    name: "The Seed Disk & Ray Petals",
    emoji: "🌻",
    tagline: "A composite flower head made of thousands of tiny flowers.",
    fact: "The center disk of a sunflower is actually made of thousands of tiny individual flowers called disk florets, which mature into sunflower seeds. The bright yellow outer petals are ray florets.",
    didYouKnow: "The pattern of seeds in a sunflower disk follows the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21, 34...), providing the most efficient packing of seeds possible!",
  },
  leaves: {
    id: "leaves",
    name: "The Broad Leaves",
    emoji: "🍃",
    tagline: "Large, rough, sun-tracking collectors.",
    fact: "Sunflower leaves are heart-shaped (cordate), rough-textured, and grow alternately along the thick stem to capture maximum light for photosynthesis.",
    didYouKnow: "Before blooming, young sunflowers track the sun from east to west every day in a process called heliotropism, resetting back to the east at night!",
  },
  stem: {
    id: "stem",
    name: "The Giant Stem",
    emoji: "🌱",
    tagline: "A thick, fibrous support beam.",
    fact: "Sunflower stems are exceptionally thick, hairy, and fibrous. They must support the weight of a massive flower head that can hold over 2,000 seeds.",
    didYouKnow: "The tallest sunflower ever recorded grew to a height of 30 feet and 1 inch (9.17 meters) in Germany!",
  },
  pot: {
    id: "pot",
    name: "The Root & Soil",
    emoji: "🪵",
    tagline: "A deep root anchor.",
    fact: "Sunflowers have a strong, deep taproot system that can reach up to 10 feet (3 meters) underground, allowing them to pull water and nutrients from deep soils.",
    didYouKnow: "Sunflowers are hyperaccumulators—they can extract toxic heavy metals and radiation from the soil. They were planted to clean up Chernobyl and Fukushima!",
  },
};

// Interactive Rose Parts
const ROSE_PARTS = {
  blossom: {
    id: "blossom",
    name: "The Rose Bloom",
    emoji: "🌹",
    tagline: "A spiral of overlapping velvet petals.",
    fact: "Rose petals grow in a spiral sequence following the Golden Ratio (approximately 137.5 degrees). This ensures each petal gets the maximum amount of sunlight and dew.",
    didYouKnow: "All roses are edible! Their petals are often used to make rose water, syrups, and jellies, and they have a sweet, floral flavor.",
  },
  leaves: {
    id: "leaves",
    name: "Serrated Foliage",
    emoji: "🍃",
    tagline: "Glossy green leaflets with saw-like edges.",
    fact: "Rose leaves are pinnately compound, meaning each leaf is divided into multiple small leaflets arranged along a central stalk, featuring sharp serrated edges.",
    didYouKnow: "A rose leaf extract is rich in antioxidants and is often used in traditional skincare to soothe irritation.",
  },
  stem: {
    id: "stem",
    name: "The Thorny Stem",
    emoji: "🌱",
    tagline: "A defensive stem lined with prickles.",
    fact: "What we call rose 'thorns' are botanically 'prickles'—extensions of the stem's outer layer (epidermis), unlike true thorns which are modified branches.",
    didYouKnow: "Prickles help wild roses climb over other vegetation by hooking onto branches, in addition to deterring hungry herbivores!",
  },
  pot: {
    id: "pot",
    name: "The Root & Soil",
    emoji: "🪵",
    tagline: "Sturdy anchorage for a woody shrub.",
    fact: "Roses develop a woody, deep root system that prefers well-drained, nutrient-rich soil. They require regular deep watering to keep their root crown healthy.",
    didYouKnow: "The oldest living rose bush in the world is estimated to be 1,000 years old! It grows on the wall of Hildesheim Cathedral in Germany.",
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
  bottomOffset?: string;
}

// Reusable Bouquet Tulip Component
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
  bottomOffset = "105px",
}: BouquetTulipProps) {
  const bouquetColor = TULIP_COLORS[(TULIP_COLORS.findIndex((c) => c.id === activeColor.id) + colorOffset) % TULIP_COLORS.length];
  
  return (
    <div 
      className={`stem-sway-container ${windClass}`}
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: leftOffset,
        transformOrigin: "bottom center",
        zIndex: zIndex,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "bottom center",
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
    </div>
  );
}

interface BouquetSunflowerProps {
  leftOffset: string;
  rotation: string;
  scale: number;
  zIndex: number;
  colorOffset: number;
  windClass: string;
  blossomWindClass: string;
  activeColor: typeof SUNFLOWER_COLORS[0];
  bottomOffset?: string;
}

// Reusable Bouquet Sunflower Component
function BouquetSunflower({
  leftOffset,
  rotation,
  scale,
  zIndex,
  colorOffset,
  windClass,
  blossomWindClass,
  activeColor,
  bottomOffset = "105px",
}: BouquetSunflowerProps) {
  const bouquetColor = SUNFLOWER_COLORS[(SUNFLOWER_COLORS.findIndex((c) => c.id === activeColor.id) + colorOffset) % SUNFLOWER_COLORS.length];
  
  return (
    <div 
      className={`stem-sway-container ${windClass}`}
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: leftOffset,
        transformOrigin: "bottom center",
        zIndex: zIndex,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "bottom center",
          transform: `scale(${scale}) rotate(${rotation})`,
        }}
      >
        <div 
          className="sunflower-stem grow-stem"
          style={{
            // @ts-expect-error custom property passing
            "--tulip-color": bouquetColor.main,
            "--tulip-color-light": bouquetColor.light,
            "--tulip-color-dark": bouquetColor.dark,
          }}
        >
          <div className="sunflower-leaf sunflower-leaf-left grow-sunflower-leaf-left" />
          <div className="sunflower-leaf sunflower-leaf-right grow-sunflower-leaf-right" />
          
          <div 
            className={`blossom-sway-container ${blossomWindClass}`}
            style={{
              position: "absolute",
              top: "-90px",
              left: "calc(50% - 50px)",
              transformOrigin: "bottom center",
              zIndex: 5,
              width: "100px",
              height: "100px",
            }}
          >
            <div className="grow-blossom w-full h-full relative" style={{ transformOrigin: "bottom center" }}>
              {/* Back Petal Layer (24 petals) */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={`back-${i}`}
                  className="sunflower-petal"
                  style={{
                    transform: `rotate(${i * 15}deg) translateY(-22px) scale(0.95)`,
                    opacity: 0.9,
                    filter: "brightness(0.9)",
                  }}
                />
              ))}
              
              {/* Front Petal Layer (24 petals) */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={`front-${i}`}
                  className="sunflower-petal"
                  style={{
                    transform: `rotate(${i * 15 + 7.5}deg) translateY(-18px)`,
                  }}
                />
              ))}

              {/* Center Disk */}
              <div className="sunflower-center-disk">
                <div className="sunflower-seeds" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BouquetRoseProps {
  leftOffset: string;
  rotation: string;
  scale: number;
  zIndex: number;
  colorOffset: number;
  windClass: string;
  blossomWindClass: string;
  activeColor: typeof ROSE_COLORS[0];
  bottomOffset?: string;
}

// Reusable Bouquet Rose Component
function BouquetRose({
  leftOffset,
  rotation,
  scale,
  zIndex,
  colorOffset,
  windClass,
  blossomWindClass,
  activeColor,
  bottomOffset = "105px",
}: BouquetRoseProps) {
  const bouquetColor = ROSE_COLORS[(ROSE_COLORS.findIndex((c) => c.id === activeColor.id) + colorOffset) % ROSE_COLORS.length];
  
  return (
    <div 
      className={`stem-sway-container ${windClass}`}
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: leftOffset,
        transformOrigin: "bottom center",
        zIndex: zIndex,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "bottom center",
          transform: `scale(${scale}) rotate(${rotation})`,
        }}
      >
        <div 
          className="rose-stem grow-stem"
          style={{
            // @ts-expect-error custom property passing
            "--tulip-color": bouquetColor.main,
            "--tulip-color-light": bouquetColor.light,
            "--tulip-color-dark": bouquetColor.dark,
          }}
        >
          {/* Thorns */}
          <div className="rose-thorn rose-thorn-left" style={{ bottom: "60px" }} />
          <div className="rose-thorn rose-thorn-right" style={{ bottom: "120px" }} />
          <div className="rose-thorn rose-thorn-left" style={{ bottom: "180px" }} />

          <div className="rose-leaf rose-leaf-left grow-rose-leaf-left" />
          <div className="rose-leaf rose-leaf-right grow-rose-leaf-right" />
          
          <div 
            className={`blossom-sway-container ${blossomWindClass}`}
            style={{
              position: "absolute",
              top: "-80px",
              left: "calc(50% - 40px)",
              transformOrigin: "bottom center",
              zIndex: 5,
              width: "80px",
              height: "80px",
            }}
          >
            <div className="grow-blossom w-full h-full relative" style={{ transformOrigin: "bottom center" }}>
              {/* Back Petal Layer (6 petals) */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`back-${i}`}
                  className="rose-petal"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-14px) scale(1)`,
                    borderRadius: "50% 50% 0 50% / 50% 50% 0 50%",
                  }}
                />
              ))}
              
              {/* Mid Petal Layer (6 petals) */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`mid-${i}`}
                  className="rose-petal"
                  style={{
                    transform: `rotate(${i * 60 + 30}deg) translateY(-8px) scale(0.8)`,
                    borderRadius: "50% 50% 50% 0 / 50% 50% 50% 0",
                    opacity: 0.95,
                  }}
                />
              ))}

              {/* Core Petal Layer (4 petals) */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`core-${i}`}
                  className="rose-petal"
                  style={{
                    transform: `rotate(${i * 90 + 45}deg) translateY(-3px) scale(0.6)`,
                    borderRadius: "50%",
                    opacity: 0.9,
                  }}
                />
              ))}

              {/* Central Rose Bud Core */}
              <div 
                className="rose-bud-core"
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${bouquetColor.light} 0%, ${bouquetColor.dark} 100%)`,
                  left: "calc(50% - 8px)",
                  top: "calc(50% - 8px)",
                  zIndex: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              />
            </div>
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

  // Flower Config state
  const [flowerType, setFlowerType] = useState<"tulip" | "sunflower" | "rose">("tulip");
  const [activePart, setActivePart] = useState<"blossom" | "leaves" | "stem" | "pot" | null>(null);
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

  // Setup mounted state and check local storage
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedUnlock = localStorage.getItem("zaid_garden_unlocked");
      if (savedUnlock === "true") {
        setIsUnlocked(true);
      }
    }

    // Generate rain particles
    const drops = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${0.8 + Math.random() * 0.5}s`,
    }));
    setRainDrops(drops);
  }, []);

  // Sync default color when flower type changes
  useEffect(() => {
    if (flowerType === "tulip") {
      setActiveColor(TULIP_COLORS[0]);
    } else if (flowerType === "sunflower") {
      setActiveColor(SUNFLOWER_COLORS[0]);
    } else {
      setActiveColor(ROSE_COLORS[0]);
    }
    setActivePart(null);
  }, [flowerType]);

  // Sync hydration decay
  useEffect(() => {
    const interval = setInterval(() => {
      setHydration((h) => Math.max(15, h - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update dynamic CSS variables for petals
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--tulip-color", activeColor.main);
      root.style.setProperty("--tulip-color-light", activeColor.light);
      root.style.setProperty("--tulip-color-dark", activeColor.dark);
    }
  }, [activeColor]);

  // Handle Gate Unlock Submission
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = authInput.trim().toLowerCase();
    const allowedAnswers = ["black", "master", "back", "red", "crimson"];
    
    if (allowedAnswers.includes(answer)) {
      if (typeof window !== "undefined") {
        localStorage.setItem("zaid_garden_unlocked", "true");
      }
      setIsUnlocked(true);
    } else {
      setAuthError("Incorrect answer. Try Zaid's favorite color or nickname!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Water the Flower Interaction
  const handleWatering = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isWatering) return;
    setIsWatering(true);
    
    if (gardenRef.current) {
      const rect = gardenRef.current.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height - 70;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples((r) => [...r, newRipple]);
      
      setTimeout(() => {
        setRipples((r) => r.filter((item) => item.id !== newRipple.id));
      }, 1500);
    }

    setHydration((h) => Math.min(100, h + 20));
    setGrowth((g) => Math.min(100, g + 5));

    const newSparkles = Array.from({ length: 12 }).map((_, i) => {
      const dx = `${-80 + Math.random() * 160}px`;
      const dy = `${-180 - Math.random() * 120}px`;
      const size = `${4 + Math.random() * 6}px`;
      return {
        id: Date.now() + i,
        left: `${35 + Math.random() * 30}%`,
        bottom: `115px`,
        dx,
        dy,
        size,
      };
    });
    setSparkles((s) => [...s, ...newSparkles]);

    setTimeout(() => {
      setIsWatering(false);
    }, 2000);

    setTimeout(() => {
      setSparkles((s) => s.filter((item) => !newSparkles.find((ns) => ns.id === item.id)));
    }, 3000);
  };

  const getWindClass = (base: string) => {
    if (windSpeed === "calm") return `${base}-calm`;
    if (windSpeed === "strong") return `${base}-strong`;
    return `${base}-gentle`;
  };

  const getBlossomWindClass = () => {
    if (windSpeed === "calm") return "wind-sway-blossom-calm";
    if (windSpeed === "strong") return "wind-sway-blossom-strong";
    return "wind-sway-blossom-gentle";
  };

  const isTulipBlooming = themeMode !== "night";
  
  // Dynamic selectors based on flower species type
  const activeEncyclopedia = 
    flowerType === "tulip" ? TULIP_PARTS : 
    flowerType === "sunflower" ? SUNFLOWER_PARTS : 
    ROSE_PARTS;
    
  const colorsList = 
    flowerType === "tulip" ? TULIP_COLORS : 
    flowerType === "sunflower" ? SUNFLOWER_COLORS : 
    ROSE_COLORS;

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between transition-all duration-1000 ${
      themeMode === "day" ? "bg-day text-amber-950" : themeMode === "night" ? "bg-night text-slate-100" : "bg-sunset text-slate-100"
    }`}>
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {flowerType === "tulip" ? "🌷" : flowerType === "sunflower" ? "🌻" : "🌹"}
          </span>
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${themeMode === 'day' ? 'text-amber-950' : 'text-white'}`}>
              Toolip Garden
            </h1>
            <p className="text-xs opacity-75 font-mono">
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
            🌱 Interactive Garden v1.6
          </span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
        {/* Left Column: Garden Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[500px]">
          <div className={`absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ${
            themeMode === "day" ? "bg-white/40 shadow-inner" : "bg-black/35 shadow-2xl"
          } backdrop-blur-sm border border-white/10 flex items-center justify-center`}>
            <div className={`absolute top-10 w-72 h-72 rounded-full filter blur-[80px] opacity-35 transition-all duration-1000 ${
              themeMode === "day" ? "bg-amber-300" : themeMode === "night" ? "bg-indigo-900" : "bg-pink-500"
            }`} />
          </div>

          {/* Environmental animations */}
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
            
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-250/40 rounded-full animate-pulse pointer-events-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* User Instructions */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono opacity-80 z-20">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Hover / Click components to inspect
            </span>
            <span>State: {isWatering ? "☔ Watering" : windSpeed === "strong" ? "🍃 Windy" : "☀️ Ambient"}</span>
          </div>

          {/* The Showcase Garden Container */}
          <div 
            ref={gardenRef}
            className="tulip-garden scale-95 md:scale-105 transition-transform duration-500"
            style={{
              position: "relative",
              width: "320px",
              height: "480px",
            }}
          >
            {/* Click/water ripples */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="water-ripple"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}

            {/* Sparkles rising */}
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

            {/* Bouquet Mode: Render 5 Additional Fanned-out Flowers (Total 6 Flowers) */}
            {viewMode === "bouquet" && (
              <>
                {flowerType === "tulip" && (
                  <>
                    <BouquetTulip leftOffset="calc(50% - 10px)" rotation="-4deg" scale={0.85} zIndex={2} colorOffset={5} isBlooming={isTulipBlooming} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} bottomOffset="120px" />
                    <BouquetTulip leftOffset="calc(50% - 46px)" rotation="-20deg" scale={0.8} zIndex={4} colorOffset={3} isBlooming={isTulipBlooming} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetTulip leftOffset="calc(50% - 25px)" rotation="-10deg" scale={0.9} zIndex={5} colorOffset={1} isBlooming={isTulipBlooming} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetTulip leftOffset="calc(50% + 15px)" rotation="10deg" scale={0.9} zIndex={5} colorOffset={2} isBlooming={isTulipBlooming} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetTulip leftOffset="calc(50% + 35px)" rotation="20deg" scale={0.8} zIndex={4} colorOffset={4} isBlooming={isTulipBlooming} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                  </>
                )}

                {flowerType === "sunflower" && (
                  <>
                    <BouquetSunflower leftOffset="calc(50% - 10px)" rotation="-4deg" scale={0.85} zIndex={2} colorOffset={5} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} bottomOffset="120px" />
                    <BouquetSunflower leftOffset="calc(50% - 46px)" rotation="-20deg" scale={0.8} zIndex={4} colorOffset={3} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetSunflower leftOffset="calc(50% - 25px)" rotation="-10deg" scale={0.9} zIndex={5} colorOffset={1} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetSunflower leftOffset="calc(50% + 15px)" rotation="10deg" scale={0.9} zIndex={5} colorOffset={2} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetSunflower leftOffset="calc(50% + 35px)" rotation="20deg" scale={0.8} zIndex={4} colorOffset={4} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                  </>
                )}

                {flowerType === "rose" && (
                  <>
                    <BouquetRose leftOffset="calc(50% - 10px)" rotation="-4deg" scale={0.85} zIndex={2} colorOffset={5} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} bottomOffset="120px" />
                    <BouquetRose leftOffset="calc(50% - 46px)" rotation="-20deg" scale={0.8} zIndex={4} colorOffset={3} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetRose leftOffset="calc(50% - 25px)" rotation="-10deg" scale={0.9} zIndex={5} colorOffset={1} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetRose leftOffset="calc(50% + 15px)" rotation="10deg" scale={0.9} zIndex={5} colorOffset={2} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                    <BouquetRose leftOffset="calc(50% + 35px)" rotation="20deg" scale={0.8} zIndex={4} colorOffset={4} windClass={getWindClass("wind-sway")} blossomWindClass={getBlossomWindClass()} activeColor={activeColor} />
                  </>
                )}
              </>
            )}

            {/* Central Main Interactive Flower */}
            {flowerType === "tulip" && (
              <div 
                className={`stem-sway-container ${getWindClass("wind-sway")}`}
                style={{
                  position: "absolute",
                  bottom: "105px",
                  left: "calc(50% - 4px)",
                  transformOrigin: "bottom center",
                  zIndex: 6,
                }}
              >
                <div style={{ width: "100%", height: "100%", transformOrigin: "bottom center" }}>
                  <div
                    className="tulip-stem grow-stem toolip-trigger"
                    onMouseEnter={() => setActivePart("stem")}
                    onClick={() => setActivePart("stem")}
                  >
                    <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2" />

                    <div 
                      className="tulip-leaf tulip-leaf-left grow-leaf-left toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 left-1/3" />
                    </div>

                    <div 
                      className="tulip-leaf tulip-leaf-right grow-leaf-right toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 right-1/3" />
                    </div>

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
                      <div 
                        className="tulip-blossom grow-blossom toolip-trigger"
                        onMouseEnter={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                        onClick={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                      >
                        <div className="tulip-receptacle" />
                        <div className={`petal petal-back-left ${isTulipBlooming ? "open-back-left" : ""}`} />
                        <div className={`petal petal-back-right ${isTulipBlooming ? "open-back-right" : ""}`} />
                        <div className={`petal petal-center ${isTulipBlooming ? "open-center" : ""}`} />
                        <div className={`petal petal-left ${isTulipBlooming ? "open-left" : ""}`} />
                        <div className={`petal petal-right ${isTulipBlooming ? "open-right" : ""}`} />
                        <div className={`petal petal-front ${isTulipBlooming ? "open-front" : ""}`} />
                        <div className="glow-indicator top-6 left-1/2 -translate-x-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {flowerType === "sunflower" && (
              <div 
                className={`stem-sway-container ${getWindClass("wind-sway")}`}
                style={{
                  position: "absolute",
                  bottom: "105px",
                  left: "calc(50% - 6px)",
                  transformOrigin: "bottom center",
                  zIndex: 6,
                }}
              >
                <div style={{ width: "100%", height: "100%", transformOrigin: "bottom center" }}>
                  <div
                    className="sunflower-stem grow-stem toolip-trigger"
                    onMouseEnter={() => setActivePart("stem")}
                    onClick={() => setActivePart("stem")}
                  >
                    <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2" />

                    <div 
                      className="sunflower-leaf sunflower-leaf-left grow-sunflower-leaf-left toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 left-1/3" />
                    </div>

                    <div 
                      className="sunflower-leaf sunflower-leaf-right grow-sunflower-leaf-right toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 right-1/3" />
                    </div>

                    <div 
                      className={`blossom-sway-container ${getBlossomWindClass()}`}
                      style={{
                        position: "absolute",
                        top: "-90px",
                        left: "calc(50% - 50px)",
                        transformOrigin: "bottom center",
                        zIndex: 5,
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <div 
                        className="grow-blossom w-full h-full relative toolip-trigger"
                        style={{ transformOrigin: "bottom center" }}
                        onMouseEnter={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                        onClick={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={`back-${i}`} className="sunflower-petal" style={{ transform: `rotate(${i * 15}deg) translateY(-22px) scale(0.95)`, opacity: 0.9, filter: "brightness(0.9)" }} />
                        ))}
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={`front-${i}`} className="sunflower-petal" style={{ transform: `rotate(${i * 15 + 7.5}deg) translateY(-18px)` }} />
                        ))}
                        <div className="sunflower-center-disk">
                          <div className="sunflower-seeds" />
                        </div>
                        <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {flowerType === "rose" && (
              <div 
                className={`stem-sway-container ${getWindClass("wind-sway")}`}
                style={{
                  position: "absolute",
                  bottom: "105px",
                  left: "calc(50% - 4px)",
                  transformOrigin: "bottom center",
                  zIndex: 6,
                }}
              >
                <div style={{ width: "100%", height: "100%", transformOrigin: "bottom center" }}>
                  <div
                    className="rose-stem grow-stem toolip-trigger"
                    onMouseEnter={() => setActivePart("stem")}
                    onClick={() => setActivePart("stem")}
                  >
                    {/* Thorns */}
                    <div className="rose-thorn rose-thorn-left" style={{ bottom: "60px" }} />
                    <div className="rose-thorn rose-thorn-right" style={{ bottom: "120px" }} />
                    <div className="rose-thorn rose-thorn-left" style={{ bottom: "180px" }} />
                    <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2" />

                    <div 
                      className="rose-leaf rose-leaf-left grow-rose-leaf-left toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 left-1/3" />
                    </div>

                    <div 
                      className="rose-leaf rose-leaf-right grow-rose-leaf-right toolip-trigger"
                      onMouseEnter={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                      onClick={(e) => { e.stopPropagation(); setActivePart("leaves"); }}
                    >
                      <div className="glow-indicator top-1/3 right-1/3" />
                    </div>

                    <div 
                      className={`blossom-sway-container ${getBlossomWindClass()}`}
                      style={{
                        position: "absolute",
                        top: "-80px",
                        left: "calc(50% - 40px)",
                        transformOrigin: "bottom center",
                        zIndex: 5,
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <div 
                        className="grow-blossom w-full h-full relative toolip-trigger"
                        style={{ transformOrigin: "bottom center" }}
                        onMouseEnter={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                        onClick={(e) => { e.stopPropagation(); setActivePart("blossom"); }}
                      >
                        {/* Back Petal Layer (6 petals) */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={`back-${i}`} className="rose-petal" style={{ transform: `rotate(${i * 60}deg) translateY(-14px) scale(1)`, borderRadius: "50% 50% 0 50% / 50% 50% 0 50%" }} />
                        ))}
                        
                        {/* Mid Petal Layer (6 petals) */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={`mid-${i}`} className="rose-petal" style={{ transform: `rotate(${i * 60 + 30}deg) translateY(-8px) scale(0.8)`, borderRadius: "50% 50% 50% 0 / 50% 50% 50% 0", opacity: 0.95 }} />
                        ))}

                        {/* Core Petal Layer (4 petals) */}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={`core-${i}`} className="rose-petal" style={{ transform: `rotate(${i * 90 + 45}deg) translateY(-3px) scale(0.6)`, borderRadius: "50%", opacity: 0.9 }} />
                        ))}

                        {/* Central Rose Bud Core */}
                        <div 
                          className="rose-bud-core"
                          style={{
                            position: "absolute",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${activeColor.light} 0%, ${activeColor.dark} 100%)`,
                            left: "calc(50% - 8px)",
                            top: "calc(50% - 8px)",
                            zIndex: 10,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                          }}
                        />
                        <div className="glow-indicator top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Soil */}
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

            {/* Pot Rim */}
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

            {/* The Soil Pot */}
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

        {/* Right Column: Controls Dashboard */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full z-10">
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200"
              : "glass-panel text-slate-100 border-white/10"
          }`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎛️</span> Environmental Controls
            </h2>

            {/* Flower Species Toggle */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Flower Species</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFlowerType("tulip")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    flowerType === "tulip"
                      ? themeMode === "day"
                        ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                        : "bg-white text-slate-900 border-white shadow-lg"
                      : themeMode === "day"
                        ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  🌷 Tulip
                </button>
                <button
                  onClick={() => setFlowerType("sunflower")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    flowerType === "sunflower"
                      ? themeMode === "day"
                        ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                        : "bg-white text-slate-900 border-white shadow-lg"
                      : themeMode === "day"
                        ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  🌻 Sunflower
                </button>
                <button
                  onClick={() => setFlowerType("rose")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    flowerType === "rose"
                      ? themeMode === "day"
                        ? "bg-amber-800 text-amber-100 border-amber-900 shadow-md"
                        : "bg-white text-slate-900 border-white shadow-lg"
                      : themeMode === "day"
                        ? "bg-amber-100/50 hover:bg-amber-100 text-amber-900 border-amber-200"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  🌹 Rose
                </button>
              </div>
            </div>

            {/* Arrangement Toggle */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Garden Arrangement</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "single", name: "🌷 Single Bloom" },
                  { id: "bouquet", name: "💐 Bouquet (6)" },
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

            {/* Time of Day */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Time of Day</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "day", name: "☀️ Day" },
                  { id: "sunset", name: "🌅 Sunset" },
                  { id: "night", name: "🌙 Night" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setThemeMode(mode.id as "sunset" | "day" | "night")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      themeMode === mode.id
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

            {/* Breeze Toggles */}
            <div className="mb-5">
              <label className="text-xs font-semibold opacity-70 block mb-2 uppercase tracking-wider font-mono">Breeze Strength</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "calm", name: "Silent" },
                  { id: "gentle", name: "Gentle" },
                  { id: "strong", name: "Gale" },
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

            {/* Water Flower */}
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
                <span>{isWatering ? "🌧️ Watering..." : "💦 Water the Garden"}</span>
              </button>
            </div>
          </div>

          {/* Color Customizer */}
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200"
              : "glass-panel text-slate-100 border-white/10"
          }`}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>🎨</span> Color Customizer
            </h2>
            <p className="text-xs opacity-75 mb-4">
              Select a pigment to modify the primary petals' color profile.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {colorsList.map((color) => (
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
                  <span
                    className="w-4 h-4 rounded-full inline-block border border-black/20 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
                    }}
                  />
                  <span className="text-xs font-semibold">{color.name}</span>

                  {activeColor.id === color.id && (
                    <span className="text-emerald-500 text-[10px] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3.5 pt-3.5 border-t border-white/10 text-xs italic opacity-75">
              <strong>Symbolism:</strong> {activeColor.description}
            </div>
          </div>

          {/* encyclopedia display */}
          <div className={`p-6 rounded-2xl border min-h-[190px] flex flex-col justify-between transition-colors duration-500 ${
            themeMode === "day"
              ? "glass-panel-light text-amber-950 border-amber-200 shadow-lg"
              : "glass-panel text-slate-100 border-white/10 shadow-xl"
          }`}>
            {activePart ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <span>{activeEncyclopedia[activePart].emoji}</span> {activeEncyclopedia[activePart].name}
                  </h3>
                  <button 
                    onClick={() => setActivePart(null)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition-colors"
                  >
                    Clear Focus
                  </button>
                </div>
                <p className="text-xs font-semibold text-sky-400 mb-2 italic">
                  &ldquo;{activeEncyclopedia[activePart].tagline}&rdquo;
                </p>
                <p className="text-xs opacity-90 leading-relaxed mb-3">
                  {activeEncyclopedia[activePart].fact}
                </p>
                <div className="p-3 rounded-xl bg-black/25 text-[11px] leading-relaxed border border-white/5">
                  <strong className="text-amber-350 block mb-1">💡 Did you know?</strong>
                  {activeEncyclopedia[activePart].didYouKnow}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 my-auto opacity-75 animate-fade-in">
                <span className="text-3xl mb-2 animate-bounce">
                  {flowerType === "tulip" ? "🐝" : flowerType === "sunflower" ? "🌻" : "🦋"}
                </span>
                <h3 className="font-bold text-sm mb-1">
                  Hover over the {flowerType === "tulip" ? "Tulip" : flowerType === "sunflower" ? "Sunflower" : "Rose"} components
                </h3>
                <p className="text-xs max-w-[280px]">
                  Explore different anatomical parts (Petals, Leaves, Stem, or Pot) to unlock their botanical secrets and history!
                </p>
              </div>
            )}
            
            {/* stats */}
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
