import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Cpu,
  ChevronRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { TERMINOLOGIES, convertTerminologyToGuideVideo } from '../../data/guideData';
import { TerminologyItem, GuideVideo } from '../../types/guide';
import { VideoModal } from './VideoModal';

export const AiJargonStudio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<GuideVideo | null>(null);
  const [completedJargonIds, setCompletedJargonIds] = useState<string[]>([]);
  const [showTechnicalExplainer, setShowTechnicalExplainer] = useState<boolean>(false);

  const handleOpenJargonVideo = (term: TerminologyItem) => {
    const video = convertTerminologyToGuideVideo(term);
    setActiveVideo(video);
  };

  const toggleJargonComplete = (videoId: string) => {
    if (completedJargonIds.includes(videoId)) {
      setCompletedJargonIds(completedJargonIds.filter(id => id !== videoId));
    } else {
      setCompletedJargonIds([...completedJargonIds, videoId]);
    }
  };

  const filteredTerms = TERMINOLOGIES.filter(
    t => selectedCategory === 'All' || t.category === selectedCategory
  );

  return (
    <div className="space-y-5">
      
      {/* 1. Educational Studio Banner - High Contrast Theme */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#E6FAF4] via-[#F0FDF9] to-[#DEF7EE] dark:bg-gradient-to-br dark:from-[#13241F] dark:via-[#162923] dark:to-[#0F1E19] border border-[#00D09C]/50 text-gray-900 dark:text-gray-100 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00D09C]/20 border border-[#00D09C]/40">
            <span className="text-xs">✨</span>
            <span className="text-[11px] font-extrabold text-[#00875A] dark:text-[#00D09C] uppercase tracking-wider">
              AI Jargon Video Studio
            </span>
          </div>
          <button
            onClick={() => setShowTechnicalExplainer(!showTechnicalExplainer)}
            className="text-[11px] text-[#00875A] dark:text-[#00D09C] hover:underline flex items-center gap-1 font-bold"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{showTechnicalExplainer ? 'Hide Architecture' : 'How AI Video Works'}</span>
          </button>
        </div>

        <h3 className="font-black text-base text-gray-900 dark:text-white leading-snug">
          Yes! Every Mutual Fund Jargon Can Be Explained via AI Video
        </h3>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
          Tap any terminology card below to launch its <strong className="text-gray-900 dark:text-white font-bold">interactive masterclass video</strong> in a proper full-screen player combining real-time motion graphics, neural AI voice narration, and visual metaphors.
        </p>

        {/* Technical Architecture Dropdown */}
        {showTechnicalExplainer && (
          <div className="mt-3 p-3.5 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#00D09C]/40 space-y-2 text-xs text-gray-800 dark:text-gray-200 shadow-md animate-fade-in">
            <h4 className="font-extrabold text-[#00875A] dark:text-[#00D09C] text-xs">How Production AI Video Generation Works:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <strong className="text-gray-900 dark:text-white block mb-0.5 font-bold">1. Scripting (LLM)</strong>
                <span className="text-gray-600 dark:text-gray-300">Gemini or GPT-4o generates dynamic bite-sized masterclass scripts with clear analogies and zero jargon.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <strong className="text-gray-900 dark:text-white block mb-0.5 font-bold">2. Voice (Neural TTS)</strong>
                <span className="text-gray-600 dark:text-gray-300">ElevenLabs or Google Cloud TTS synthesizes lifelike, natural voices in English or Hindi.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <strong className="text-gray-900 dark:text-white block mb-0.5 font-bold">3. Motion Graphics (Remotion)</strong>
                <span className="text-gray-600 dark:text-gray-300">Programmatic Canvas & Remotion render crisp, vector financial infographics at 60 FPS without hallucinations.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Jargon Video Catalog Header & Category Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
              <span>Interactive Jargon Masterclasses</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00875A] dark:text-[#00D09C] border border-[#00D09C]/25">
                {TERMINOLOGIES.length} Videos
              </span>
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Tap any lesson to open the continuous video player with motion graphics, audio narration, and key takeaways.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {['All', 'Basics', 'Costs & Taxes', 'Performance', 'Safety & Structure'].map(cat => {
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                    isCatActive
                      ? 'bg-[#00D09C] text-black font-extrabold shadow-sm'
                      : 'bg-white dark:bg-[#1E222B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2B313E] hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Full-Width Jargon Video Cards List */}
        <div className="space-y-3">
          {filteredTerms.map((term) => {
            const short = term.shortName || term.term;
            const videoId = `jargon-${short.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            const isCompleted = completedJargonIds.includes(videoId);

            return (
              <div
                key={term.term}
                onClick={() => handleOpenJargonVideo(term)}
                className="group cursor-pointer p-4 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] hover:border-[#00D09C] dark:hover:border-[#00D09C] hover:shadow-md transition-all space-y-3 w-full"
              >
                {/* Top Row: Term, Category, Duration & Watched Status */}
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-[#00D09C] transition-colors">
                      {term.term}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {term.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#00875A] dark:text-[#00D09C] bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        <span>Watched</span>
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 font-mono font-bold px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/60">
                      2:05 min
                    </span>
                  </div>
                </div>

                {/* Description spanning the entire width */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed w-full">
                  {term.simpleExplanation}
                </p>

                {/* Real-World Analogy Preview & Watch Video Button */}
                <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 flex-1 min-w-0">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-semibold text-amber-600 dark:text-yellow-400 shrink-0">Analogy:</span>
                    <span className="italic truncate text-[11px] sm:text-xs">{term.realWorldAnalogy}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenJargonVideo(term);
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs shadow-sm group-hover:scale-105 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch AI Video</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PROPER FULL-SCREEN VIDEO PLAYER MODAL (Identical Format to Masterclass Videos) */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onComplete={toggleJargonComplete}
          isCompleted={completedJargonIds.includes(activeVideo.id)}
        />
      )}

    </div>
  );
};
