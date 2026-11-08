import React, { useState, useRef } from 'react';
import { NavPoint } from '../../types/mutualFund';

interface NavChartProps {
  navHistory: {
    '1M': NavPoint[];
    '6M': NavPoint[];
    '1Y': NavPoint[];
    '3Y': NavPoint[];
    '5Y': NavPoint[];
    'ALL': NavPoint[];
  };
  benchmarkName: string;
}

export const NavChart: React.FC<NavChartProps> = ({ navHistory, benchmarkName }) => {
  const [timeframe, setTimeframe] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL'>('1Y');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const points = navHistory[timeframe] || navHistory['1Y'];

  // Calculate min & max for scaling
  const minNav = Math.min(...points.map(p => Math.min(p.nav, p.benchmarkNav))) * 0.985;
  const maxNav = Math.max(...points.map(p => Math.max(p.nav, p.benchmarkNav))) * 1.015;
  const navRange = maxNav - minNav || 1;

  const width = 360;
  const height = 170;
  const paddingX = 10;
  const paddingTop = 20;
  const paddingBottom = 20;
  const innerHeight = height - paddingTop - paddingBottom;
  const innerWidth = width - 2 * paddingX;

  // Active point (either hovered or the latest point)
  const activePoint = hoverIndex !== null && points[hoverIndex] 
    ? points[hoverIndex] 
    : points[points.length - 1];

  // Convert points to SVG coordinates
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

  // SVG Area path under the curve
  const areaPath = `M ${coords[0].x},${height - paddingBottom} ` +
    coords.map(c => `L ${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ') +
    ` L ${coords[coords.length - 1].x},${height - paddingBottom} Z`;

  // Return calculation
  const startNav = points[0]?.nav || 1;
  const endNav = activePoint?.nav || 1;
  const periodReturn = (((endNav - startNav) / startNav) * 100).toFixed(2);
  const isPositive = Number(periodReturn) >= 0;

  // Mouse / Touch drag interaction
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (relativeX - paddingX) / innerWidth));
    const index = Math.round(ratio * (points.length - 1));
    setHoverIndex(index);
  };

  const activeCoord = hoverIndex !== null && coords[hoverIndex] ? coords[hoverIndex] : null;

  return (
    <div className="space-y-3.5 select-none">
      
      {/* 1. Header with user's exact requested reference format: "NAV: 36.33 | 5th Feb 2021" */}
      <div className="flex items-center justify-between px-1">
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

        {/* Return badge */}
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
            isPositive 
              ? 'bg-[#00D09C]/15 text-[#00875A] dark:text-[#00D09C]' 
              : 'bg-rose-500/15 text-rose-600'
          }`}>
            {isPositive ? '+' : ''}{periodReturn}%
          </span>
        </div>
      </div>

      {/* 2. Detailed Realistic SVG Chart with Interactive Crosshair Hairline */}
      <div className="relative w-full h-48 bg-transparent overflow-hidden rounded-xl">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          onPointerDown={handlePointerMove}
        >
          <defs>
            {/* Emerald Gradient Fill */}
            <linearGradient id="navGradientEmerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D09C" stopOpacity="0.18" />
              <stop offset="85%" stopColor="#00D09C" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#00D09C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle Horizontal Reference Grid Lines */}
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.25} x2={width - paddingX} y2={paddingTop + innerHeight * 0.25} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.50} x2={width - paddingX} y2={paddingTop + innerHeight * 0.50} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />
          <line x1={paddingX} y1={paddingTop + innerHeight * 0.75} x2={width - paddingX} y2={paddingTop + innerHeight * 0.75} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3,3" />

          {/* Benchmark comparison line (subtle dashed gray) */}
          <polyline
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeDasharray="3,3"
            strokeOpacity="0.5"
            points={bmkPolylinePoints}
          />

          {/* Area Fill Under Curve */}
          <path
            d={areaPath}
            fill="url(#navGradientEmerald)"
          />

          {/* Realistic High-Density NAV Line */}
          <polyline
            fill="none"
            stroke="#00D09C"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
            className="transition-all duration-150"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,208,156,0.25))' }}
          />

          {/* Interactive Vertical Hairline & Tracking Dot on Hover/Touch */}
          {activeCoord && (
            <g className="transition-opacity duration-150">
              {/* Vertical Crosshair Line (matching reference image) */}
              <line
                x1={activeCoord.x}
                y1={paddingTop}
                x2={activeCoord.x}
                y2={height - paddingBottom}
                stroke="#64748B"
                strokeWidth="1"
                strokeDasharray="3,3"
                strokeOpacity="0.45"
              />

              {/* Outer Pulse Ring */}
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="7"
                fill="#00D09C"
                fillOpacity="0.25"
                className="animate-ping"
              />

              {/* Solid White Halo */}
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="5"
                fill="#FFFFFF"
                className="drop-shadow-md"
              />

              {/* Center Emerald Dot (matching reference image) */}
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="3"
                fill="#00D09C"
              />
            </g>
          )}
        </svg>

        {/* Small Benchmark Indicator in top right */}
        <div className="absolute top-0 right-2 flex items-center gap-1.5 text-[9px] text-gray-400 pointer-events-none">
          <span className="w-2.5 h-0.5 border-t border-dashed border-gray-400 inline-block" />
          <span className="truncate max-w-[130px]">{benchmarkName}</span>
        </div>
      </div>

      {/* 3. Timeframe Selector with Authentic Groww Rounded Mint Pill */}
      <div className="flex items-center justify-between px-1 pt-1">
        {(['1M', '6M', '1Y', '3Y', '5Y', 'ALL'] as const).map(tf => {
          const isActive = timeframe === tf;
          return (
            <button
              key={tf}
              onClick={() => {
                setTimeframe(tf);
                setHoverIndex(null);
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

    </div>
  );
};
