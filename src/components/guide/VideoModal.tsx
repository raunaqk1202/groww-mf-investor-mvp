import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Clock,
  FastForward,
  Rewind,
  FileText,
  Bot
} from 'lucide-react';
import { GuideVideo } from '../../types/guide';
import { AiVideoVisualizer } from './AiVideoVisualizer';

// Clean phonetic script for flawless speech synthesis without crashing on symbols or currency characters
const cleanScriptForVoice = (text: string): string => {
  return text
    .replace(/₹\s*([0-9,.]+)\s*(Crore|Cr|Lakh|L)/gi, '$1 $2 rupees')
    .replace(/₹\s*([0-9,.]+)/g, '$1 rupees')
    .replace(/%/g, ' percent ')
    .replace(/&/g, ' and ')
    .replace(/~/g, 'approximately ')
    .replace(/•/g, '')
    .replace(/\bLTCG\b/g, 'Long Term Capital Gains')
    .replace(/\bSTCG\b/g, 'Short Term Capital Gains')
    .replace(/\bTER\b/g, 'Total Expense Ratio')
    .replace(/\bAUM\b/g, 'Assets Under Management')
    .replace(/\bSIP\b/g, 'S I P')
    .replace(/\bNAV\b/g, 'N A V')
    .replace(/\bCAGR\b/g, 'C A G R')
    .replace(/\bXIRR\b/g, 'X I R R')
    .replace(/\bELSS\b/g, 'E L S S')
    .replace(/\bAMC\b/g, 'A M C')
    .replace(/\bSEBI\b/g, 'Sebi');
};

interface VideoModalProps {
  video: GuideVideo | null;
  onClose: () => void;
  onComplete: (videoId: string) => void;
  isCompleted: boolean;
  onOpenAiMitra?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onComplete,
  isCompleted,
  onOpenAiMitra
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'takeaways' | 'transcript'>('takeaways');

  const totalDuration = video?.totalDurationSec || 125;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exact scene calculation matching explicit timeStartSec and timeEndSec boundaries
  const activeSceneIndex = video?.scenes?.findIndex(
    s => currentTimeSec >= s.timeStartSec && currentTimeSec < s.timeEndSec
  ) ?? 0;
  const safeSceneIndex = activeSceneIndex === -1 
    ? (video?.scenes?.length ? video.scenes.length - 1 : 0) 
    : activeSceneIndex;
  const activeScene = video?.scenes?.[safeSceneIndex] || video?.scenes?.[0];

  // Dynamic glow colors per scene
  const sceneGlowColors = [
    'rgba(0, 208, 156, 0.20)',  // Scene 1: Emerald
    'rgba(83, 103, 254, 0.20)',  // Scene 2: Electric Blue
    'rgba(255, 184, 0, 0.20)',   // Scene 3: Amber Gold
    'rgba(0, 229, 255, 0.20)',   // Scene 4: Cyber Teal
    'rgba(168, 85, 247, 0.20)',  // Scene 5: Purple (for 5/6-scene videos)
    'rgba(244, 63, 94, 0.20)'    // Scene 6: Coral (for 6-scene videos)
  ];
  const activeGlow = sceneGlowColors[safeSceneIndex % sceneGlowColors.length];

  // Continuous uninterrupted playback timer loop synchronized with speech
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTimeSec(prev => {
          // If we reached the end boundary of the current scene, but voice is still actively speaking, wait for voice to finish
          const curScene = video?.scenes?.find(s => prev >= s.timeStartSec && prev < s.timeEndSec);
          if (curScene && !isMuted && isSpeakingRef.current && prev >= curScene.timeEndSec - 1) {
            return prev;
          }

          if (prev >= totalDuration) {
            if (!isMuted && isSpeakingRef.current) {
              return prev; // Wait for final speech to complete
            }
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000 / speechRate);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration, speechRate, isMuted, video?.scenes]);

  // Continuous Neural Voiceover Narration synchronized with scene changes
  useEffect(() => {
    // Clear previous keep-alive and timeouts
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    if (isMuted || !isPlaying || !activeScene) {
      isSpeakingRef.current = false;
      utteranceRef.current = null;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const phoneticScript = cleanScriptForVoice(activeScene.voiceScript);
      const utterance = new SpeechSynthesisUtterance(phoneticScript);
      utterance.rate = speechRate * 1.0;
      utterance.pitch = 1.0;
      
      // Retain utterance in ref so it is NEVER collected by JavaScript GC mid-speech
      utteranceRef.current = utterance;
      isSpeakingRef.current = true;

      const handleSpeechComplete = () => {
        isSpeakingRef.current = false;
        utteranceRef.current = null;
        if (keepAliveRef.current) {
          clearInterval(keepAliveRef.current);
          keepAliveRef.current = null;
        }
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
          speechTimeoutRef.current = null;
        }
      };

      utterance.onend = handleSpeechComplete;
      utterance.onerror = handleSpeechComplete;

      // Chrome keep-alive ping: Chromium pauses long speech synthesis after ~14s unless refreshed
      keepAliveRef.current = setInterval(() => {
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 6000);

      // Safety timeout (35 seconds) to ensure playback never hangs if audio finishes silently
      speechTimeoutRef.current = setTimeout(handleSpeechComplete, 35000);

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      isSpeakingRef.current = false;
      utteranceRef.current = null;
      if (keepAliveRef.current) {
        clearInterval(keepAliveRef.current);
        keepAliveRef.current = null;
      }
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
        speechTimeoutRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeScene?.id, isPlaying, isMuted, speechRate]);

  // Clean up speech on close
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, []);

  if (!video) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = (currentTimeSec / totalDuration) * 100;

  return (
    // Covers 100% of the screen edge-to-edge with ZERO gaps, fully adhering to Light/Dark Mode
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col overflow-hidden animate-fade-in bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      
      {/* ========================================================
          1. PINNED TOP HEADER BAR (LIGHT / DARK THEMED)
          ======================================================== */}
      <div className="pt-3.5 pb-2.5 px-3.5 border-b border-gray-200 dark:border-[#2B313E] flex items-center justify-between bg-white dark:bg-[#1A1D24] shrink-0 transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/30">
            {video.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{video.duration}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-[#00875A] dark:text-[#00D09C] font-semibold border border-emerald-500/25 hidden sm:inline">
            Continuous Masterclass
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <button
            onClick={() => {
              const rates = [1.0, 1.25, 1.5];
              const nextIdx = (rates.indexOf(speechRate) + 1) % rates.length;
              setSpeechRate(rates[nextIdx]);
            }}
            className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[10px] font-mono font-bold text-gray-700 dark:text-gray-200 transition-colors"
            title="Playback Speed"
          >
            {speechRate}x
          </button>

          {/* Mute/Unmute Voice */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded-lg border transition-all ${
              isMuted 
                ? 'bg-rose-500/15 text-rose-500 border-rose-500/30' 
                : 'bg-emerald-500/15 text-[#00875A] dark:text-[#00D09C] border-emerald-500/30 dark:border-emerald-500/40'
            }`}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
            title="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          2. PINNED VIDEO PLAYER CANVAS (LIGHT / DARK THEMED)
          ======================================================== */}
      <div className="shrink-0 w-full overflow-hidden border-b border-gray-200 dark:border-[#2B313E] transition-colors">
        <div className="relative w-full h-[275px] sm:h-[295px] flex flex-col justify-between p-2.5 sm:p-3 bg-gradient-to-br from-[#E6FAF4] via-[#F4FDF9] to-[#E2F7EF] dark:bg-gradient-to-br dark:from-[#0A0D14] dark:via-[#10141F] dark:to-[#081512] text-gray-900 dark:text-white overflow-hidden transition-colors">
          
          {/* Dynamic Ambient Background Glow that morphs color per scene */}
          <div 
            className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-1000 -top-10 -left-10"
            style={{ backgroundColor: activeGlow }}
          />

          {/* Floating Ambient Sparks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-emerald-500/40 animate-particle" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-yellow-500/40 animate-particle" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* Top Video Status & Dynamic Scene Indicator */}
          <div className="relative z-10 flex items-center justify-between text-[11px] shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/40 text-[9px] font-bold shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-[#00875A] dark:text-[#00D09C] animate-pulse" />
                <span>60 FPS AI Video</span>
              </span>
              
              {/* Dynamic Scene Transition Badge */}
              <div 
                key={activeScene?.id}
                className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-white/10 border border-emerald-500/30 text-gray-900 dark:text-white font-extrabold text-[9px] shadow-sm animate-scale-in flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] animate-ping" />
                <span className="text-[#00875A] dark:text-[#00D09C] font-mono">
                  {safeSceneIndex + 1}/{video.scenes?.length || 1}
                </span>
                <span className="truncate max-w-[120px] sm:max-w-[200px]">{activeScene?.headline}</span>
              </div>
            </div>

            {/* 4-Bar Dancing Soundwave Visualizer */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/60 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-xs">
              {!isMuted && isPlaying ? (
                <div className="flex items-center gap-0.5 h-2.5">
                  <div className="w-0.5 bg-[#00D09C] rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
                  <div className="w-0.5 bg-emerald-500 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '120ms' }} />
                  <div className="w-0.5 bg-teal-400 rounded-full animate-bounce" style={{ height: '50%', animationDelay: '240ms' }} />
                  <div className="w-0.5 bg-[#00D09C] rounded-full animate-bounce" style={{ height: '90%', animationDelay: '360ms' }} />
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              )}
              <span className="text-[9px] font-semibold text-gray-600 dark:text-gray-300">
                {isMuted ? 'Muted' : isPlaying ? 'Voice Active' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Dynamic Animated Motion Graphics Scene Canvas (Changes smoothly every 12s) */}
          <div 
            key={activeScene?.id}
            className="relative my-auto flex-1 flex items-center justify-center py-0.5 overflow-hidden animate-fade-in"
          >
            <AiVideoVisualizer
              visualType={activeScene?.visualType || 'pieChart'}
              isPlaying={isPlaying}
              progressPercent={progressPercent}
            />
          </div>

          {/* Dynamic Subtitle Bar (Light / Dark themed) */}
          <div className="relative z-10 mx-auto max-w-md w-full text-center mb-1 shrink-0">
            <div className="inline-block w-full px-3 py-1.5 rounded-xl bg-white/95 dark:bg-black/85 backdrop-blur-md border border-emerald-500/30 shadow-md">
              <p className="text-[10px] sm:text-[11px] text-gray-800 dark:text-gray-200 line-clamp-1 font-medium">
                "{activeScene?.caption || video.summary}"
              </p>
            </div>
          </div>

          {/* Playback Scrubber & Control Bar */}
          <div className="relative z-10 space-y-1 pt-1.5 border-t border-gray-200 dark:border-white/10 shrink-0">
            {/* Continuous Seek Bar */}
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={totalDuration}
                value={currentTimeSec}
                onChange={(e) => setCurrentTimeSec(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {/* Play/Pause / Restart */}
                <button
                  onClick={() => {
                    if (currentTimeSec >= totalDuration) {
                      setCurrentTimeSec(0);
                      setIsPlaying(true);
                    } else {
                      setIsPlaying(!isPlaying);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-[#00D09C] text-black font-extrabold hover:bg-emerald-400 transition-colors shadow"
                  title={currentTimeSec >= totalDuration ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : currentTimeSec >= totalDuration ? (
                    <RotateCcw className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={() => setCurrentTimeSec(Math.max(0, currentTimeSec - 10))}
                  className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Rewind 10s"
                >
                  <Rewind className="w-3.5 h-3.5" />
                </button>

                {/* Fast Forward 10s */}
                <button
                  onClick={() => setCurrentTimeSec(Math.min(totalDuration, currentTimeSec + 10))}
                  className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Forward 10s"
                >
                  <FastForward className="w-3.5 h-3.5" />
                </button>

                {/* Replay */}
                <button
                  onClick={() => {
                    setCurrentTimeSec(0);
                    setIsPlaying(true);
                  }}
                  className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>

                {/* Time Counter */}
                <span className="font-mono text-[10px] text-gray-600 dark:text-gray-300 ml-1">
                  {formatTime(currentTimeSec)} / {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] text-[#00875A] dark:text-[#00D09C] font-bold">
                <span>Continuous Video</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          3. CLEAN MASTERCLASS NOTES TABS
          ======================================================== */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#181B22] border-b border-gray-200 dark:border-[#2B313E] shrink-0 text-xs transition-colors">
        <button
          onClick={() => setActiveTab('takeaways')}
          className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
            activeTab === 'takeaways'
              ? 'bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/40 shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Key Takeaways</span>
        </button>

        <button
          onClick={() => setActiveTab('transcript')}
          className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
            activeTab === 'transcript'
              ? 'bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/40 shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Masterclass Script</span>
        </button>
      </div>

      {/* ========================================================
          4. SCROLLABLE NOTES PANE (LIGHT / DARK THEMED)
          ======================================================== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB] dark:bg-[#121212] scrollbar-thin transition-colors">
        
        {/* TAB 1: KEY TAKEAWAYS */}
        {activeTab === 'takeaways' && (
          <div className="space-y-3 animate-fade-in">
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">{video.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {video.summary}
              </p>
            </div>

            {/* Key Takeaways Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] space-y-2 shadow-xs transition-colors">
              <h4 className="font-extrabold text-xs text-[#00875A] dark:text-[#00D09C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Investor Rules</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                {video.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ask AI Mitra Nudge inside video player */}
            {onOpenAiMitra && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C]">
                    <Bot className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 text-xs font-semibold">
                    Have questions about this video?
                  </span>
                </div>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    onClose();
                    onOpenAiMitra();
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-[11px] shadow-xs transition-colors cursor-pointer"
                >
                  Ask Mitra →
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FULL NARRATION SCRIPT */}
        {activeTab === 'transcript' && (
          <div className="space-y-2.5 animate-fade-in">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
              Complete Masterclass Audio Narration:
            </span>
            <div className="space-y-2">
              {video.scenes.map((scene, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] space-y-1 text-xs shadow-xs transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#00875A] dark:text-[#00D09C] text-xs">
                      {scene.headline}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 font-semibold">
                      {scene.timeLabel}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-normal">{scene.voiceScript}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          5. PINNED FOOTER BAR (LIGHT / DARK THEMED)
          ======================================================== */}
      <div className="px-4 py-2.5 border-t border-gray-200 dark:border-[#2B313E] bg-white dark:bg-[#1A1D24] flex items-center justify-between shrink-0 transition-colors">
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          {isCompleted ? '✅ Completed' : 'Module Progress'}
        </span>

        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onComplete(video.id);
            onClose();
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
            isCompleted
              ? 'bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/40'
              : 'bg-[#00D09C] hover:bg-emerald-400 text-black'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
        </button>
      </div>

    </div>
  );
};
