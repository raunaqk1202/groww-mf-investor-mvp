import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Sparkles, Sun, Moon } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isFirstTimeInvestor: boolean;
  setIsFirstTimeInvestor: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isFirstTimeInvestor,
  setIsFirstTimeInvestor,
  isDarkMode,
  setIsDarkMode
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'web'>('mobile');

  // Detect whether viewer is on a mobile device or screen width < 768px
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isSmall = window.innerWidth < 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isSmall || isMobileUA;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth < 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isSmall || isMobileUA);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When viewed on a real mobile device (or viewport < 768px), directly render the native mobile app
  // Without the emulator bezel, without dynamic island, without volume buttons, and without desktop headers
  if (isMobileDevice) {
    return (
      <div className={`w-full min-h-screen min-h-[100dvh] flex flex-col ${
        isDarkMode ? 'dark bg-[#121212] text-gray-100' : 'bg-white text-gray-900'
      }`}>
        {children}
      </div>
    );
  }

  return (
    // Outer page is ALWAYS crisp light mode - only the device screen inside turns dark when toggled
    <div className="min-h-screen bg-[#F4F6F8] text-gray-900 transition-colors duration-300">
      
      {/* Top Global Control Bar - Always Clean Light Mode */}
      <header className="sticky top-0 z-50 border-b border-[#EAECF0] bg-white/95 backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm text-gray-900">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <img 
            src="/groww-logo.png" 
            alt="Groww" 
            className="w-8 h-8 rounded-full shadow-md object-contain" 
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-gray-900">Groww</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00A87E] border border-emerald-500/20">
                Mutual Funds MVP
              </span>
            </div>
            <p className="text-[11px] text-gray-500">First-Time Investor Learning Platform</p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* First-time Investor Toggle */}
          <button
            onClick={() => setIsFirstTimeInvestor(!isFirstTimeInvestor)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
              isFirstTimeInvestor
                ? 'bg-emerald-500/15 border-emerald-500/30 text-[#00875A]'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:text-gray-900'
            }`}
            title="Toggle first-time investor persona to preview onboarding guides and first-order nudges"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>First-Time Investor: <strong className={isFirstTimeInvestor ? 'text-[#00875A]' : ''}>{isFirstTimeInvestor ? 'ON' : 'OFF'}</strong></span>
          </button>

          {/* Viewport Mode Switcher */}
          <div className="flex items-center p-0.5 rounded-lg border bg-gray-100 border-gray-200">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Mobile App View (simulates iOS/Android Groww app)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
            <button
              onClick={() => setDeviceMode('web')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                deviceMode === 'web'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Full Web View (Responsive desktop interface)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Web View</span>
            </button>
          </div>

          {/* Dark/Light Mode Switcher for the Device */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-sm font-medium transition-all"
            title={isDarkMode ? "Switch inner device to Light Mode" : "Switch inner device to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Device: Dark</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-gray-600" />
                <span>Device: Light</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container Rendering */}
      <main className="p-2 sm:p-6 flex justify-center items-start">
        {deviceMode === 'mobile' ? (
          // iPhone / Mobile Frame Simulation
          <div className="relative">
            {/* Outer Bezel Volume/Power details styling */}
            <div className="absolute top-28 -left-[4px] w-[4px] h-10 bg-gray-500 rounded-l-md pointer-events-none"></div>
            <div className="absolute top-44 -left-[4px] w-[4px] h-12 bg-gray-500 rounded-l-md pointer-events-none"></div>
            <div className="absolute top-36 -right-[4px] w-[4px] h-14 bg-gray-500 rounded-r-md pointer-events-none"></div>

            {/* Outer Phone Bezel */}
            <div 
              className="relative w-[390px] sm:w-[420px] max-w-full h-[880px] max-h-[92vh] bg-black rounded-[50px] p-[12px] shadow-2xl ring-1 ring-gray-900/20 flex flex-col"
              style={{
                clipPath: 'inset(0 round 50px)',
                WebkitClipPath: 'inset(0 round 50px)',
              }}
            >
              {/* Inner Phone Screen with Hardware-Accelerated Clipping */}
              <div 
                className={`relative w-full h-full rounded-[38px] flex flex-col overflow-hidden transition-colors duration-300 ${
                  isDarkMode ? 'dark bg-[#121212] text-gray-100' : 'bg-white text-gray-900'
                }`}
                style={{
                  clipPath: 'inset(0 round 38px)',
                  WebkitClipPath: 'inset(0 round 38px)',
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  isolation: 'isolate',
                  contain: 'paint'
                }}
              >
                {/* Dynamic Island / Status Bar */}
                <div className={`relative pt-2.5 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold select-none z-40 shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-[#121212] text-gray-100' : 'bg-white text-gray-900'
                }`}>
                  <span>9:41</span>
                  {/* Dynamic Island pill */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 text-[9px] text-gray-400 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00D09C] animate-pulse"></div>
                    <span className="text-gray-300 font-mono text-[9px]">Groww Safe</span>
                    <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span>5G</span>
                    <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                      <div className="w-3 h-full bg-current rounded-xs"></div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Mobile App Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-none">
                  {children}
                </div>

                {/* Home indicator bar at bottom */}
                <div className={`w-full py-1.5 flex justify-center z-40 shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-[#121212]' : 'bg-white'
                }`}>
                  <div className={`w-32 h-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Full Web View Container
          <div 
            className={`w-full max-w-6xl rounded-2xl border shadow-xl overflow-hidden min-h-[85vh] flex flex-col transition-colors duration-300 ${
              isDarkMode ? 'dark bg-[#121212] border-[#2B313E] text-gray-100' : 'bg-white border-[#EAECF0] text-gray-900'
            }`}
            style={{ contain: 'paint', transform: 'translateZ(0)' }}
          >
            {/* Browser-like window header bar */}
            <div className={`px-4 py-2.5 border-b flex items-center justify-between transition-colors duration-300 ${
              isDarkMode ? 'bg-[#1A1D24] border-[#2B313E]' : 'bg-white border-[#EAECF0]'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className={`ml-3 px-3 py-1 rounded-md text-xs font-mono flex items-center gap-2 ${
                  isDarkMode ? 'bg-black/40 text-gray-300 border border-gray-800' : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  <span className="text-[#00D09C]">https://</span>
                  <span>groww.in/mutual-funds/explore</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>Groww Web View</span>
              </div>
            </div>

            {/* Scrollable Web View Body */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
