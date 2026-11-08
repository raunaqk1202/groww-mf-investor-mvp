import React, { useState, useRef } from 'react';
import { TrendingUp, HelpCircle, Eye, Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExplainerPoint {
  date: string;
  nav: number;
  benchmarkNav: number;
  callout?: {
    id: number;
    title: string;
    text: string;
  };
}

// Generate realistic points with education callouts
const generateExplainerSeries = (
  count: number,
  startNav: number,
  endNav: number,
  dateFormatter: (idx: number) => string,
  volatility: number,
  calloutsMap: { [idx: number]: { id: number; title: string; text: string } }
): ExplainerPoint[] => {
  const points: ExplainerPoint[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const cycle1 = Math.sin(t * Math.PI * 3.5) * volatility * 1.4;
    const cycle2 = Math.cos(t * Math.PI * 7.0) * (volatility * 0.7);
    const marketDip = (t > 0.32 && t < 0.46) 
      ? -Math.sin(((t - 0.32) / 0.14) * Math.PI) * (volatility * 2.5) 
      : 0;

    const trend = Math.pow(t, 1.15);
    const rawNav = startNav + (endNav - startNav) * trend;
    const navVal = +(rawNav * (1 + cycle1 + cycle2 + marketDip)).toFixed(2);

    const bmkCycle = Math.sin(t * Math.PI * 3.2 + 0.2) * (volatility * 1.0);
    const rawBmk = startNav * 0.99 + (endNav * 0.92 - startNav * 0.99) * Math.pow(t, 1.05);
    const bmkVal = +(rawBmk * (1 + bmkCycle + marketDip * 0.8)).toFixed(2);

    const finalNav = (i === 0) ? startNav : (i === count - 1) ? endNav : navVal;
    const finalBmk = (i === 0) ? +(startNav * 0.99).toFixed(2) : (i === count - 1) ? +(endNav * 0.92).toFixed(2) : bmkVal;

    points.push({
      date: dateFormatter(i),
      nav: +finalNav.toFixed(2),
      benchmarkNav: +finalBmk.toFixed(2),
      callout: calloutsMap[i]
    });
  }

  return points;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const NavChartExplainer: React.FC = () => {
  const [activeTf, setActiveTf] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL'>('5Y');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [selectedCallout, setSelectedCallout] = useState<{ id: number; title: string; text: string } | null>({
    id: 1,
    title: 'Market Pullback / SIP Discount',
    text: 'A normal 12% market pullback that panicked short-term speculators. For 5-year SIP investors, this was an opportunity to accumulate extra units at discount prices!'
  });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Timeframe datasets with realistic data matching user reference
  const tfDatasets: { [key: string]: { points: ExplainerPoint[]; summary: string } } = {
    '1M': {
      summary: '1-Month View: Daily media noise and emotional sentiment. Never judge mutual fund quality based on 30-day fluctuations.',
      points: generateExplainerSeries(
        30,
        35.40,
        36.33,
        (i) => {
          const d = new Date(2026, 9, 8);
          d.setDate(d.getDate() + i);
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} 2026`;
        },
        0.015,
        {
          11: {
            id: 101,
            title: '1-Day Media Noise Dip',
            text: 'Notice this sharp dip: it represents a 1.2% headline drop. Zooming out shows it was completely irrelevant to long-term wealth.'
          }
        }
      )
    },
    '6M': {
      summary: '6-Month View: Trend begins absorbing short-term shocks. Look for how quality funds consolidate before continuing upwards.',
      points: generateExplainerSeries(
        45,
        32.80,
        36.33,
        (i) => {
          const d = new Date(2026, 4, 7);
          d.setDate(d.getDate() + Math.floor(i * (184 / 45)));
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} 2026`;
        },
        0.022,
        {
          18: {
            id: 201,
            title: 'Quarterly Consolidation Zone',
            text: 'After a strong rally, the fund moves sideways for 6-8 weeks as company earnings catch up.'
          }
        }
      )
    },
    '1Y': {
      summary: '1-Year View: Medium-term trajectory starts reflecting business earnings and macroeconomic momentum.',
      points: generateExplainerSeries(
        52,
        29.60,
        36.33,
        (i) => {
          const d = new Date(2025, 10, 7);
          d.setDate(d.getDate() + i * 7);
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        },
        0.03,
        {
          20: {
            id: 301,
            title: 'Annual Market Correction',
            text: 'Healthy corrections shake out panic sellers while long-term compounding continues unbroken.'
          }
        }
      )
    },
    '3Y': {
      summary: '3-Year View: The minimum timeframe for equity investments. Notice how initial dips now look like tiny bumps.',
      points: generateExplainerSeries(
        60,
        23.40,
        36.33,
        (i) => {
          const d = new Date(2023, 10, 7);
          d.setDate(d.getDate() + Math.floor(i * (1095 / 60)));
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        },
        0.038,
        {
          23: {
            id: 401,
            title: 'Alpha Expansion',
            text: 'Notice the widening green gap over the dashed benchmark line: this is Alpha generated by superior stock selection.'
          }
        }
      )
    },
    '5Y': {
      summary: '5-Year View: The true economic growth of corporate India. 5-year equity SIPs have historically never delivered negative returns in Indian mutual fund history.',
      points: generateExplainerSeries(
        60,
        18.20,
        36.33,
        (i) => {
          const d = new Date(2021, 1, 5); // 5th Feb 2021 exact match to user reference!
          d.setDate(d.getDate() + Math.floor(i * (2090 / 60)));
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        },
        0.044,
        {
          22: {
            id: 1,
            title: 'Market Pullback / SIP Discount',
            text: 'A normal 12% market pullback that panicked short-term speculators. For 5-year SIP investors, this was an opportunity to accumulate extra units at discount prices!'
          },
          48: {
            id: 2,
            title: 'Alpha Outperformance Gap',
            text: 'The gap between the fund (solid green) and benchmark (dashed line) shows the compounding wealth advantage over simple index holding.'
          }
        }
      )
    },
    'ALL': {
      summary: 'Full Inception View: Over 7-10+ years, equity mutual funds deliver high inflation-beating wealth creation.',
      points: generateExplainerSeries(
        70,
        10.00,
        36.33,
        (i) => {
          const d = new Date(2018, 0, 15);
          d.setDate(d.getDate() + Math.floor(i * (3218 / 70)));
          return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        },
        0.048,
        {
          26: {
            id: 501,
            title: 'Crash & Spectacular Recovery',
            text: 'Historical market crisis followed by a massive multifold rally. Long-term discipline beats panic selling every single time.'
          }
        }
      )
    }
  };

  const currentDataset = tfDatasets[activeTf] || tfDatasets['5Y'];
  const points = currentDataset.points;

  const minNav = Math.min(...points.map(p => Math.min(p.nav, p.benchmarkNav))) * 0.985;
  const maxNav = Math.max(...points.map(p => Math.max(p.nav, p.benchmarkNav))) * 1.015;
  const navRange = maxNav - minNav || 1;

  const width = 360;
  const height = 175;
  const paddingX = 10;
  const paddingTop = 20;
  const paddingBottom = 20;
  const innerHeight = height - paddingTop - paddingBottom;
  const innerWidth = width - 2 * paddingX;

  const activePoint = hoverIndex !== null && points[hoverIndex] 
    ? points[hoverIndex] 
    : points[points.length - 1];

  const coords = points.map((p, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * innerWidth;
    const y = paddingTop + innerHeight - ((p.nav - minNav) / navRange) * innerHeight;
    return { x, y, point: p };
  });

  const bmkCoords = points.map((p, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * innerWidth;
    const y = paddingTop + innerHeight - ((p.benchmarkNav - minNav) / navRange) * innerHeight;
    return { x, y };
  });

  const polylinePoints = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const bmkPolylinePoints = bmkCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const areaPath = `M ${coords[0].x},${height - paddingBottom} ` +
    coords.map(c => `L ${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ') +
    ` L ${coords[coords.length - 1].x},${height - paddingBottom} Z`;

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (relativeX - paddingX) / innerWidth));
    const index = Math.round(ratio * (points.length - 1));
    setHoverIndex(index);

    if (points[index]?.callout) {
      setSelectedCallout(points[index].callout || null);
    }
  };

  const activeCoord = hoverIndex !== null && coords[hoverIndex] ? coords[hoverIndex] : null;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] space-y-4 shadow-sm select-none">
      
      {/* Header with Title & Benchmark toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00D09C]" />
            <span>Interactive NAV Chart Anatomy</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Hover or drag across the curve to inspect NAV history and market lessons.
          </p>
        </div>

        <button
          onClick={() => setShowBenchmark(!showBenchmark)}
          className={`text-[11px] px-2.5 py-1 rounded-full border font-bold transition-all ${
            showBenchmark
              ? 'bg-[#5367FF]/15 text-[#5367FF] border-[#5367FF]/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-transparent'
          }`}
        >
          {showBenchmark ? 'Benchmark ON' : 'Benchmark OFF'}
        </button>
      </div>

      {/* 1. User's exact reference format: "NAV: 36.33 | 5th Feb 2021" */}
      <div className="flex items-baseline justify-between px-1 pt-1 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-baseline gap-1.5 text-xs sm:text-sm">
          <span className="text-gray-500 dark:text-gray-400 font-semibold text-xs tracking-tight">NAV:</span>
          <span className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight">
            ₹{activePoint?.nav?.toFixed(2)}
          </span>
          <span className="text-gray-300 dark:text-gray-600 font-normal">|</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            {activePoint?.date}
          </span>
        </div>

        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 font-medium">
          {activeTf === '5Y' ? '5-Yr Compounding Horizon' : activeTf === '1M' ? 'Short-Term Market Noise' : `${activeTf} Period`}
        </span>
      </div>

      {/* 2. High-Density Realistic SVG Chart Canvas with Crosshair */}
      <div className="relative w-full h-48 bg-transparent overflow-hidden rounded-2xl">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          onPointerDown={handlePointerMove}
        >
          <defs>
            <linearGradient id="explainerEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D09C" stopOpacity="0.18" />
              <stop offset="85%" stopColor="#00D09C" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#00D09C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Reference Grid lines */}
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.25} x2={width - paddingX} y2={paddingTop + innerHeight * 0.25} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.50} x2={width - paddingX} y2={paddingTop + innerHeight * 0.50} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.75} x2={width - paddingX} y2={paddingTop + innerHeight * 0.75} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />

          {/* Benchmark Line */}
          {showBenchmark && (
            <polyline
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.3"
              strokeDasharray="3,3"
              strokeOpacity="0.55"
              points={bmkPolylinePoints}
            />
          )}

          {/* Gradient area under NAV line */}
          <path
            d={areaPath}
            fill="url(#explainerEmeraldGradient)"
          />

          {/* High-Resolution NAV Line */}
          <polyline
            fill="none"
            stroke="#00D09C"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,208,156,0.25))' }}
          />

          {/* Educational Highlight Hotspots */}
          {coords.filter(c => c.point.callout).map(c => (
            <g
              key={c.point.callout?.id}
              className="cursor-pointer"
              onClick={() => setSelectedCallout(c.point.callout || null)}
            >
              <circle
                cx={c.x}
                cy={c.y}
                r="6"
                fill="#00D09C"
                fillOpacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={c.x}
                cy={c.y}
                r="4"
                fill="#00D09C"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* Interactive Hairline & Tracking Dot */}
          {activeCoord && (
            <g>
              <line
                x1={activeCoord.x}
                y1={paddingTop}
                x2={activeCoord.x}
                y2={height - paddingBottom}
                stroke="#64748B"
                strokeWidth="1"
                strokeDasharray="3,3"
                strokeOpacity="0.5"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="6"
                fill="#FFFFFF"
                className="drop-shadow-sm"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="3.5"
                fill="#00D09C"
              />
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-0 right-1 flex items-center gap-3 text-[9px] text-gray-400 pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#00D09C] inline-block" />
            <span>Fund NAV</span>
          </div>
          {showBenchmark && (
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 border-t border-dashed border-gray-400 inline-block" />
              <span>Nifty 50 TRI</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Timeframe Selector with Authentic Groww Rounded Mint Pill */}
      <div className="flex items-center justify-between px-1">
        {(['1M', '6M', '1Y', '3Y', '5Y', 'ALL'] as const).map(tf => {
          const isActive = activeTf === tf;
          return (
            <button
              key={tf}
              onClick={() => {
                setActiveTf(tf);
                setHoverIndex(null);
                const firstCallout = tfDatasets[tf]?.points.find(p => p.callout)?.callout;
                if (firstCallout) setSelectedCallout(firstCallout);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#00D09C]/15 text-[#00875A] dark:text-[#00D09C] shadow-xs ring-1 ring-[#00D09C]/30'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tf}
            </button>
          );
        })}
      </div>

      {/* 4. Interactive Callout Insight Card */}
      {selectedCallout && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-xs space-y-1 animate-fade-in">
          <div className="flex items-center gap-1.5 font-extrabold text-[#00875A] dark:text-[#00D09C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{selectedCallout.title}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[11px]">
            {selectedCallout.text}
          </p>
        </div>
      )}

      {/* Summary note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
        💡 {currentDataset.summary}
      </p>

    </div>
  );
};
