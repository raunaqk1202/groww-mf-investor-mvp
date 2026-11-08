import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Zap
} from 'lucide-react';
import { VisualType } from '../../types/guide';

interface AiVideoVisualizerProps {
  visualType: VisualType;
  isPlaying: boolean;
  progressPercent: number; // 0 to 100
}

export const AiVideoVisualizer: React.FC<AiVideoVisualizerProps> = ({
  visualType,
  isPlaying,
  progressPercent
}) => {
  const [pulse, setPulse] = useState(0);
  const [sineWave, setSineWave] = useState(0);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setPulse(Math.sin(elapsed * 2.5) * 0.5 + 0.5);
      setSineWave(Math.sin(elapsed * 4));
      animId = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      animId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2 overflow-hidden select-none">
      
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(0,208,156,0.18) 0%, rgba(83,103,254,0.08) 50%, transparent 80%)',
          transform: `scale(${1 + pulse * 0.25})`
        }}
      />

      {/* Floating Ambient Sparks / Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-emerald-400/40 animate-particle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-teal-300/30 animate-particle" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-yellow-400/40 animate-particle" style={{ animationDelay: '2.1s' }} />
        <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-particle" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* ========================================================
          1. PIE CHART / 50:30:20 BUDGET VISUALIZER
          ======================================================== */}
      {visualType === 'pieChart' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          
          <div className="relative flex items-center justify-center">
            {/* Outer Rotating Glow Ring */}
            <div 
              className="absolute w-32 h-32 rounded-full border border-dashed border-emerald-500/20"
              style={{
                transform: `rotate(${pulse * 360}deg)`,
                transition: 'transform 0.1s linear'
              }}
            />

            {/* Main Interactive Donut SVG */}
            <svg viewBox="0 0 140 140" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl overflow-visible">
              {/* 50% Needs slice (Emerald) */}
              <circle
                cx="70"
                cy="70"
                r="48"
                fill="transparent"
                stroke="#00D09C"
                strokeWidth="20"
                strokeDasharray="150.8 150.8"
                strokeDashoffset="0"
                className="transition-all duration-700"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,208,156,0.5))' }}
              />
              {/* 30% Wants slice (Blue) */}
              <circle
                cx="70"
                cy="70"
                r="48"
                fill="transparent"
                stroke="#5367FE"
                strokeWidth="20"
                strokeDasharray="90.5 211.1"
                strokeDashoffset="-150.8"
                className="transition-all duration-700"
                style={{ filter: 'drop-shadow(0 0 5px rgba(83,103,254,0.4))' }}
              />
              {/* 20% Wealth / Mutual Fund SIP slice (Golden) - Animated Pulse */}
              <circle
                cx="70"
                cy="70"
                r="49"
                fill="transparent"
                stroke="#FFB800"
                strokeWidth={22 + pulse * 2}
                strokeDasharray="60.3 241.3"
                strokeDashoffset="-241.3"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,184,0,0.8))' }}
              />

              {/* Center Donut Label */}
              <circle cx="70" cy="70" r="34" className="fill-white dark:fill-[#121620] stroke-gray-200 dark:stroke-gray-700" strokeWidth="1" />
              <text x="70" y="66" textAnchor="middle" className="fill-gray-900 dark:fill-white font-extrabold text-[11px] tracking-wider">50:30:20</text>
              <text x="70" y="80" textAnchor="middle" className="fill-[#00875A] dark:fill-[#00D09C] font-bold text-[9px]">RULE</text>
            </svg>

            {/* Animated Golden Sparkles floating badge */}
            <div className="absolute -top-1 -right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/60 text-amber-700 dark:text-yellow-300 text-[9px] font-bold shadow-lg animate-float-gentle">
              <Sparkles className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
              <span>₹10k SIP</span>
            </div>
          </div>

          {/* Animated 3 Category Badges */}
          <div className="grid grid-cols-3 gap-1.5 w-full text-[9px]">
            <div className="p-1 px-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center animate-float-gentle shadow-xs">
              <span className="block text-[#00875A] dark:text-emerald-400 font-extrabold text-[10px]">50% Needs</span>
              <span className="text-gray-600 dark:text-gray-300 font-mono text-[8px]">₹25k</span>
            </div>

            <div className="p-1 px-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center animate-float-gentle shadow-xs" style={{ animationDelay: '0.4s' }}>
              <span className="block text-[#3B49DF] dark:text-blue-400 font-extrabold text-[10px]">30% Wants</span>
              <span className="text-gray-600 dark:text-gray-300 font-mono text-[8px]">₹15k</span>
            </div>

            <div className="p-1 px-1.5 rounded-lg bg-yellow-500/20 border-2 border-yellow-500/60 text-center animate-float-gentle shadow-xs" style={{ animationDelay: '0.8s' }}>
              <span className="block text-amber-800 dark:text-yellow-300 font-extrabold text-[10px]">20% Groww SIP</span>
              <span className="text-amber-900 dark:text-yellow-400 font-mono text-[8px] font-bold">₹10k</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. POOLING COINS / AUM VISUALIZER
          ======================================================== */}
      {visualType === 'poolCoins' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          
          <div className="relative w-full h-32 flex items-center justify-center">
            
            {/* Investor A (Left) */}
            <div className="absolute top-0 left-1 p-1 rounded-lg bg-blue-500/15 border border-blue-400/50 text-[8px] text-blue-900 dark:text-blue-200 flex items-center gap-1 shadow-sm animate-float-gentle">
              <div className="w-4 h-4 rounded-full bg-[#5367FF] text-white flex items-center justify-center font-bold text-[8px]">
                A
              </div>
              <span className="font-mono font-semibold">₹500/mo</span>
            </div>

            {/* Dropping Coin from Left */}
            <div 
              className="absolute left-10 top-5 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-white text-[7px] font-black text-amber-950 flex items-center justify-center shadow-lg animate-coin-drop"
              style={{ animationDelay: '0s' }}
            >
              ₹
            </div>

            {/* Investor B (Right) */}
            <div className="absolute top-0 right-1 p-1 rounded-lg bg-purple-500/15 border border-purple-400/50 text-[8px] text-purple-900 dark:text-purple-200 flex items-center gap-1 shadow-sm animate-float-gentle" style={{ animationDelay: '0.6s' }}>
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[8px]">
                P
              </div>
              <span className="font-mono font-semibold">₹2,000/mo</span>
            </div>

            {/* Dropping Coin from Right */}
            <div 
              className="absolute right-10 top-5 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-white text-[7px] font-black text-amber-950 flex items-center justify-center shadow-lg animate-coin-drop"
              style={{ animationDelay: '1.1s' }}
            >
              ₹
            </div>

            {/* Big Central Mutual Fund Reservoir Tank with Undulating Fluid */}
            <div className="w-40 h-24 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#1C212D] dark:to-[#0E121B] border-2 border-emerald-500/60 shadow-xl flex flex-col justify-end relative overflow-hidden transition-colors">
              
              {/* Ripple Ring */}
              <div className="absolute left-1/2 bottom-8 -translate-x-1/2 w-10 h-5 rounded-full border border-emerald-400/60 animate-ripple" />

              {/* Undulating Animated Fluid Level */}
              <div 
                className="w-full relative transition-all duration-500"
                style={{ height: `${Math.min(85, 42 + progressPercent * 0.42)}%` }}
              >
                {/* SVG Sine Wave Surface */}
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-3 absolute -top-2 text-[#00D09C]">
                  <path 
                    d={`M 0 10 Q 25 ${10 + sineWave * 5} 50 10 T 100 10 L 100 20 L 0 20 Z`}
                    fill="currentColor"
                    className="opacity-70"
                  />
                </svg>

                {/* Pool Deep Water Fill */}
                <div className="w-full h-full bg-gradient-to-b from-[#00D09C]/80 via-[#00D09C]/40 to-emerald-800/60 p-1 flex flex-col items-center justify-center">
                  <span className="text-[8px] text-gray-900 font-extrabold uppercase tracking-wider">
                    MUTUAL FUND POOL (AUM)
                  </span>
                  <span className="text-base font-black text-gray-900 dark:text-white drop-shadow-sm">
                    ₹{(24500 + progressPercent * 120).toFixed(0)} Cr
                  </span>
                  <span className="text-[8px] text-emerald-950 dark:text-emerald-100 font-semibold">
                    65 Bluechip Companies
                  </span>
                </div>
              </div>

              {/* Security Shield Tag */}
              <div className="absolute top-1 left-1.5 flex items-center gap-1 text-[8px] text-[#00875A] dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>SEBI Custodian</span>
              </div>
            </div>
          </div>

          <div className="p-1 px-2.5 rounded-full bg-white/95 dark:bg-black/60 border border-emerald-500/30 text-[9px] text-[#00875A] dark:text-emerald-400 font-bold flex items-center gap-1 shadow-xs">
            <Zap className="w-2.5 h-2.5 fill-current" />
            <span>₹500 micro-investments unite into a multi-crore fund</span>
          </div>
        </div>
      )}

      {/* ========================================================
          3. NAV PIZZA / SLICING VISUALIZER
          ======================================================== */}
      {visualType === 'navPizza' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-2">
          
          <div className="flex items-center justify-center gap-4">
            {/* Fund A: 10 Slices */}
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-500/80 bg-white dark:bg-[#151C24] flex items-center justify-center shadow-md overflow-hidden transition-colors">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-float-slow">
                  <circle cx="50" cy="50" r="44" fill="#00D09C" fillOpacity="0.25" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
                      y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
                      stroke="#00D09C"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                <div className="absolute text-center bg-white/95 dark:bg-black/85 px-1.5 py-0.5 rounded border border-emerald-500/40 z-10 shadow-xs">
                  <span className="text-[7px] text-gray-500 dark:text-gray-400 block font-mono">NAV</span>
                  <span className="text-[10px] font-black text-[#00875A] dark:text-[#00D09C]">₹20</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[9px] text-gray-900 dark:text-white font-bold block">Fund A (50 units)</span>
                <span className="text-[8px] text-[#00875A] dark:text-emerald-400 font-bold block">₹1,000 Total</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-black text-gray-400 mb-0.5">=</span>
              <div className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[#00875A] dark:text-emerald-400 border border-emerald-500/40 text-[8px] font-bold">
                SAME
              </div>
            </div>

            {/* Fund B: 2 Slices */}
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-blue-500/80 bg-white dark:bg-[#151C24] flex items-center justify-center shadow-md overflow-hidden transition-colors">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-float-slow" style={{ animationDelay: '0.5s' }}>
                  <circle cx="50" cy="50" r="44" fill="#5367FE" fillOpacity="0.25" />
                  <line x1="6" y1="50" x2="94" y2="50" stroke="#5367FE" strokeWidth="2.5" />
                </svg>

                <div className="absolute text-center bg-white/95 dark:bg-black/85 px-1.5 py-0.5 rounded border border-blue-500/40 z-10 shadow-xs">
                  <span className="text-[7px] text-gray-500 dark:text-gray-400 block font-mono">NAV</span>
                  <span className="text-[10px] font-black text-[#3B49DF] dark:text-blue-400">₹200</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[9px] text-gray-900 dark:text-white font-bold block">Fund B (5 units)</span>
                <span className="text-[8px] text-[#3B49DF] dark:text-blue-400 font-bold block">₹1,000 Total</span>
              </div>
            </div>
          </div>

          {/* Interactive Proof: 10% Market Gain */}
          <div className="w-full p-1.5 rounded-xl bg-white/95 dark:bg-black/40 border border-emerald-500/30 text-center space-y-0.5 shadow-xs">
            <span className="text-[9px] font-bold text-gray-900 dark:text-white block">
              10% Gain = Exactly ₹100 Profit in Both Funds!
            </span>
            <span className="text-[8px] text-gray-600 dark:text-gray-400 block">
              NAV does NOT equal cheapness. Return percentage is what counts.
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          4. EXPENSE RATIO / BUCKET LEAK VISUALIZER
          ======================================================== */}
      {visualType === 'bucketLeak' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-2">
          
          <div className="flex items-center justify-center gap-5">
            {/* Direct Plan */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-20 h-26 rounded-xl bg-white dark:bg-[#151C24] border-2 border-[#00D09C] flex flex-col justify-end p-1.5 relative overflow-hidden shadow-lg transition-colors">
                <div className="w-full h-18 bg-gradient-to-t from-[#00D09C] to-emerald-400/80 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-1 left-2 w-1 h-1 rounded-full bg-white/60 animate-bubble" style={{ animationDelay: '0s' }} />
                  <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-white/70 animate-bubble" style={{ animationDelay: '0.8s' }} />
                  <span className="text-[8px] font-mono text-black font-semibold">20 Yrs</span>
                  <span className="text-[11px] font-black text-black">₹32.5 L</span>
                </div>
                <div className="absolute top-1 left-1.5 px-1 py-0.2 rounded bg-white/90 dark:bg-black/60 text-[7px] text-[#00875A] dark:text-[#00D09C] font-extrabold shadow-xs">
                  DIRECT
                </div>
              </div>
              <span className="text-[9px] text-[#00875A] dark:text-emerald-400 font-extrabold block">0.2% Fee • ₹0 Broker</span>
            </div>

            <span className="text-[10px] font-bold text-gray-400">VS</span>

            {/* Regular Plan */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-20 h-26 rounded-xl bg-white dark:bg-[#151C24] border-2 border-rose-500/60 flex flex-col justify-end p-1.5 relative overflow-hidden shadow-lg transition-colors">
                <div className="w-full h-12 bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg flex flex-col items-center justify-center relative">
                  <span className="text-[8px] font-mono text-gray-700 dark:text-gray-200 font-semibold">20 Yrs</span>
                  <span className="text-[11px] font-black text-gray-900 dark:text-white">₹24.1 L</span>
                </div>
                <div className="absolute top-1 left-1.5 px-1 py-0.2 rounded bg-white/90 dark:bg-black/60 text-[7px] text-rose-600 dark:text-rose-400 font-extrabold shadow-xs">
                  REGULAR
                </div>
                <div className="absolute bottom-1 right-2 text-rose-500 animate-water-drip">
                  <Droplets className="w-3.5 h-3.5 fill-rose-500" />
                </div>
              </div>
              <span className="text-[9px] text-rose-600 dark:text-rose-400 font-extrabold block">1.5% Fee (Broker Cut)</span>
            </div>
          </div>

          <div className="w-full p-1 px-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-center shadow-xs">
            <span className="text-[9px] font-black text-[#00875A] dark:text-[#00D09C] block">
              Direct Plan saves you ₹8.4 Lakhs in lost broker cuts!
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          5. COMPOUNDING SNOWBALL VISUALIZER
          ======================================================== */}
      {visualType === 'compounding' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          
          <div className="relative w-full h-24 flex items-center justify-center overflow-visible">
            <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible">
              <line x1="15" y1="90" x2="225" y2="90" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1.5" />
              <line x1="15" y1="90" x2="225" y2="65" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="60" y="82" className="fill-gray-500 dark:fill-gray-400 font-medium" fontSize="7">Your Deposits</text>

              <path
                d="M 15 90 Q 120 85 225 15"
                fill="none"
                stroke="#00D09C"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0,208,156,0.6))' }}
              />

              <circle cx="85" cy="80" r="3" fill="#3B82F6" />
              <circle cx="150" cy="58" r="3.5" fill="#F59E0B" />
              <circle cx="225" cy="15" r="4.5" fill="#00D09C" className="animate-ping" />
              <circle cx="225" cy="15" r="4.5" fill="#00D09C" />
              <circle cx="225" cy="15" r="2" fill="#FFFFFF" />
            </svg>

            <div className="absolute right-2 top-0 p-1 px-2 rounded-xl bg-white/95 dark:bg-black/85 border border-emerald-400 shadow-md flex items-center gap-1 animate-float-gentle">
              <span className="text-[11px]">🚀</span>
              <span className="text-[10px] font-black text-[#00875A] dark:text-[#00D09C]">₹27.5 L Compound</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 w-full text-[8px] text-center font-mono">
            <span className="p-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Yr 1-5: Base</span>
            <span className="p-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">Yr 5-10: Momentum</span>
            <span className="p-0.5 rounded bg-emerald-50 dark:bg-emerald-500/20 text-[#00875A] dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-500/40">Yr 15+: Snowball!</span>
          </div>
        </div>
      )}

      {/* ========================================================
          6. LINE CHART / REALISTIC NAV VISUALIZER
          ======================================================== */}
      {visualType === 'lineChart' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          
          {/* Top NAV readout matching user reference */}
          <div className="flex items-center justify-between w-full px-1 text-[9px]">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-gray-500 font-semibold">NAV:</span>
              <strong className="text-gray-900 dark:text-white font-extrabold">36.33</strong>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">5th Feb 2021</span>
            </div>
            <div className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-[#00875A] dark:text-[#00D09C] font-extrabold text-[8px]">
              +18.4% Alpha
            </div>
          </div>

          <div className="relative w-full h-24 flex items-center justify-center overflow-visible">
            <svg viewBox="0 0 240 85" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="videoNavGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D09C" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00D09C" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="5" y1="20" x2="235" y2="20" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3,3" />
              <line x1="5" y1="45" x2="235" y2="45" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3,3" />
              <line x1="5" y1="70" x2="235" y2="70" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3,3" />

              {/* Benchmark Line (Realistic Multi-Point Curve) */}
              <polyline
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.2"
                strokeDasharray="3,3"
                strokeOpacity="0.6"
                points="5,72 18,66 32,70 45,63 58,58 72,62 85,68 98,64 112,56 125,52 138,55 152,48 165,45 178,49 192,42 205,38 218,34 235,28"
              />

              {/* Area Gradient under NAV curve */}
              <path
                d="M 5,80 L 5,74 L 12,65 L 18,68 L 24,78 L 30,55 L 36,66 L 42,64 L 48,58 L 54,54 L 60,42 L 66,45 L 72,58 L 78,64 L 84,62 L 90,63 L 96,56 L 102,52 L 108,56 L 114,53 L 120,60 L 126,56 L 132,54 L 138,36 L 144,30 L 150,38 L 156,40 L 162,44 L 168,36 L 174,48 L 180,45 L 186,52 L 192,45 L 198,38 L 204,40 L 210,24 L 216,28 L 222,26 L 228,24 L 235,22 L 235,80 Z"
                fill="url(#videoNavGradient)"
              />

              {/* Realistic High-Density NAV Line matching user screenshot */}
              <polyline
                fill="none"
                stroke="#00D09C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="5,74 12,65 18,68 24,78 30,55 36,66 42,64 48,58 54,54 60,42 66,45 72,58 78,64 84,62 90,63 96,56 102,52 108,56 114,53 120,60 126,56 132,54 138,36 144,30 150,38 156,40 162,44 168,36 174,48 180,45 186,52 192,45 198,38 204,40 210,24 216,28 222,26 228,24 235,22"
                style={{ filter: 'drop-shadow(0 1px 3px rgba(0,208,156,0.3))' }}
              />

              {/* Hairline Crosshair & Tracking Dot at 60px (matching user screenshot) */}
              <line x1="60" y1="5" x2="60" y2="80" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />
              <circle cx="60" cy="42" r="5" fill="#00D09C" fillOpacity="0.25" className="animate-ping" />
              <circle cx="60" cy="42" r="3.5" fill="#FFFFFF" />
              <circle cx="60" cy="42" r="2" fill="#00D09C" />

              {/* End Point Dot */}
              <circle cx="235" cy="22" r="3" fill="#00D09C" />
            </svg>

            {/* Educational Marker: Dip Opportunity */}
            <div className="absolute top-8 left-16 px-1.5 py-0.5 rounded-full bg-white/95 dark:bg-black/80 border border-emerald-500/40 text-[#00875A] dark:text-[#00D09C] text-[8px] font-extrabold shadow-sm animate-bounce">
              Dip = SIP Discount!
            </div>
          </div>

          <div className="text-[9px] text-gray-700 dark:text-gray-300 text-center font-medium">
            <span className="text-[#00875A] dark:text-emerald-400 font-bold">Green:</span> Fund NAV •{' '}
            <span className="text-gray-500 dark:text-gray-400 font-bold">Dashed:</span> Benchmark (Nifty 50) •{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Zoom out:</span> Long-term growth
          </div>
        </div>
      )}

      {/* ========================================================
          7. RISKOMETER GAUGE
          ======================================================== */}
      {visualType === 'riskGauge' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          <div className="relative w-36 h-20 overflow-hidden flex justify-center items-end">
            <svg viewBox="0 0 160 85" className="w-full h-full">
              <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none" className="stroke-gray-200 dark:stroke-gray-800" strokeWidth="14" strokeLinecap="round" />
              <path d="M 15 80 A 65 65 0 0 1 42 36" fill="none" stroke="#3B82F6" strokeWidth="14" />
              <path d="M 42 36 A 65 65 0 0 1 118 36" fill="none" stroke="#FBBF24" strokeWidth="14" />
              <path d="M 118 36 A 65 65 0 0 1 145 80" fill="none" stroke="#EF4444" strokeWidth="14" />
              <g transform={`rotate(${-45 + pulse * 90} 80 80)`} className="transition-transform duration-300">
                <line x1="80" y1="80" x2="80" y2="28" stroke="#111827" className="dark:stroke-white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="80" cy="28" r="2.5" fill="#00D09C" />
              </g>
              <circle cx="80" cy="80" r="6" className="fill-white dark:fill-gray-900 stroke-gray-900 dark:stroke-white" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-0 px-2 py-0.2 rounded-full bg-white/95 dark:bg-yellow-500/20 text-amber-800 dark:text-yellow-300 border border-amber-300 dark:border-yellow-500/40 text-[8px] font-black shadow-xs">
              SEBI Riskometer
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 w-full text-[8px] font-bold text-center">
            <span className="p-0.5 rounded bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-transparent">Low (Debt)</span>
            <span className="p-0.5 rounded bg-yellow-50 dark:bg-yellow-500/20 text-amber-800 dark:text-yellow-300 border border-amber-200 dark:border-transparent">Moderate (Hybrid)</span>
            <span className="p-0.5 rounded bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-transparent">Very High (Equity)</span>
          </div>
        </div>
      )}

      {/* ========================================================
          8. TAX BREAKDOWN
          ======================================================== */}
      {visualType === 'taxBreakdown' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          <div className="w-full p-2 rounded-xl bg-white dark:bg-[#151C24] border border-emerald-500/40 space-y-1.5 shadow-md transition-colors">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100 dark:border-gray-700">
              <span className="text-[#00875A] dark:text-emerald-400 font-extrabold text-[10px]">Union Budget 2024</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-[#00875A] dark:text-[#00D09C] text-[8px] font-bold">Sec 112A</span>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-gray-700 dark:text-gray-300 font-semibold">Exemption:</span>
                <span className="text-[#00875A] dark:text-emerald-400 font-black">₹1,25,000 / Year 0% TAX</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex border border-gray-200 dark:border-gray-700">
                <div className="bg-[#00D09C] h-full flex items-center justify-center text-[7px] font-black text-black" style={{ width: '65%' }}>
                  0% (Up to ₹1.25L)
                </div>
                <div className="bg-amber-400 h-full flex items-center justify-center text-[7px] font-black text-black" style={{ width: '35%' }}>
                  12.5% LTCG
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] pt-0.5">
              <span className="p-1 rounded bg-emerald-500/10 text-[#00875A] dark:text-emerald-400 font-semibold border border-emerald-500/20">&gt; 12 Mo: 12.5% LTCG</span>
              <span className="p-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold border border-rose-500/20">&lt; 12 Mo: 20% STCG</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          9. SPECTRUM
          ======================================================== */}
      {visualType === 'spectrum' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          <div className="w-full space-y-1">
            <div className="flex justify-between text-[8px] font-bold">
              <span className="text-[#3B49DF] dark:text-blue-400">Debt</span>
              <span className="text-teal-600 dark:text-teal-400">Hybrid</span>
              <span className="text-[#00875A] dark:text-emerald-400">Large Cap</span>
              <span className="text-amber-600 dark:text-amber-400">Mid/Small</span>
            </div>

            <div className="relative w-full h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-teal-400 via-emerald-400 to-amber-500">
              <div 
                className="absolute -top-1 w-4.5 h-4.5 rounded-full bg-white border-2 border-emerald-600 shadow-xl flex items-center justify-center transition-all duration-300"
                style={{ 
                  left: `${Math.min(92, Math.max(4, progressPercent))}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>

            <div className="flex justify-between text-[7px] text-gray-500 dark:text-gray-400 font-mono font-medium">
              <span>0-1 Yr</span>
              <span>2-3 Yrs</span>
              <span>5+ Yrs</span>
              <span>7+ Yrs</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 w-full text-[8px]">
            <div className="p-1 rounded-lg bg-white dark:bg-[#151C24] border border-blue-500/40 shadow-xs">
              <span className="font-bold text-[#3B49DF] dark:text-blue-400 block">Debt / Liquid</span>
              <span className="text-gray-600 dark:text-gray-300 text-[7px]">Emergency fund</span>
            </div>
            <div className="p-1 rounded-lg bg-white dark:bg-[#151C24] border border-emerald-500/40 shadow-xs">
              <span className="font-bold text-[#00875A] dark:text-emerald-400 block">Large Cap</span>
              <span className="text-gray-600 dark:text-gray-300 text-[7px]">Top 100 leaders</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          10. SIX SECTIONS
          ======================================================== */}
      {visualType === 'sixSections' && (
        <div className="relative w-full max-w-xs flex flex-col items-center justify-center space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5 w-full text-[9px]">
            <div className="p-1.5 rounded-lg bg-white dark:bg-[#151C24] border border-emerald-500 shadow-xs transition-colors">
              <span className="font-bold text-[#00875A] dark:text-emerald-400 block">1. TER & Taxes</span>
              <span className="text-gray-600 dark:text-gray-300 text-[8px]">Low expense ratio</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white dark:bg-[#151C24] border border-blue-500/50 shadow-xs transition-colors">
              <span className="font-bold text-[#3B49DF] dark:text-blue-400 block">2. Calculator</span>
              <span className="text-gray-600 dark:text-gray-300 text-[8px]">Compounding slider</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white dark:bg-[#151C24] border border-purple-500/50 shadow-xs transition-colors">
              <span className="font-bold text-purple-700 dark:text-purple-400 block">3. Holdings</span>
              <span className="text-gray-600 dark:text-gray-300 text-[8px]">Top 10 stocks</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white dark:bg-[#151C24] border border-yellow-500/50 shadow-xs transition-colors">
              <span className="font-bold text-amber-700 dark:text-yellow-400 block">4. Returns & Rank</span>
              <span className="text-gray-600 dark:text-gray-300 text-[8px]">Peer comparison</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
