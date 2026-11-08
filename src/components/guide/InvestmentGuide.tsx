import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Layers,
  Award,
  Bot,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { GUIDE_VIDEOS } from '../../data/guideData';
import { GuideVideo } from '../../types/guide';
import { VideoModal } from './VideoModal';
import { BudgetCalculator } from './BudgetCalculator';
import { JargonBuster } from './JargonBuster';
import { NavChartExplainer } from './NavChartExplainer';
import { SixSectionsGuide } from './SixSectionsGuide';
import { FundTypesCatalog } from './FundTypesCatalog';
import { AiJargonStudio } from './AiJargonStudio';

interface InvestmentGuideProps {
  onStartFirstSip?: () => void;
  initialTab?: 'videos' | 'jargon-studio' | 'budget' | 'jargon' | 'nav' | 'sections' | 'types';
  onOpenAiMitra?: () => void;
}

export const InvestmentGuide: React.FC<InvestmentGuideProps> = ({ 
  onStartFirstSip, 
  initialTab = 'videos',
  onOpenAiMitra
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'videos' | 'jargon-studio' | 'budget' | 'jargon' | 'nav' | 'sections' | 'types'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveGuideTab(initialTab);
    }
  }, [initialTab]);
  const [selectedVideo, setSelectedVideo] = useState<GuideVideo | null>(null);
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>([GUIDE_VIDEOS[0].id]);

  const toggleVideoComplete = (videoId: string) => {
    if (completedVideoIds.includes(videoId)) {
      setCompletedVideoIds(completedVideoIds.filter(id => id !== videoId));
    } else {
      setCompletedVideoIds([...completedVideoIds, videoId]);
    }
  };

  const progressPercentage = Math.round((completedVideoIds.length / GUIDE_VIDEOS.length) * 100);

  return (
    <div className="p-4 sm:p-5 space-y-5 max-w-4xl mx-auto pb-24">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-emerald-600 via-[#00B386] to-[#008f6b] text-white overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/20 text-emerald-100 backdrop-blur-md">
              🌱 First-Time Investor Academy
            </span>
            <span className="text-[11px] font-medium text-emerald-100">Zero Jargon • 100% Practical</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Mutual Fund Investment Guide
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed w-full">
            Everything you need before placing your first rupee: personal finance budgeting, deciphering NAV charts, all 6 fund disclosure sections, and avoiding common beginner pitfalls.
          </p>

          {/* Progress Tracker */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-emerald-100">
              <span>Learning Progress: {completedVideoIds.length} of {GUIDE_VIDEOS.length} Mastered</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveGuideTab('videos')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'videos'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#1E222B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2B313E]'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Video Masterclass ({GUIDE_VIDEOS.length})</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('jargon-studio')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'jargon-studio'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#1E222B] text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Jargon Video Studio</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('budget')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'budget'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#151b26] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Monthly Budget Planner</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('sections')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'sections'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#151b26] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>The 6 Fund Sections</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('nav')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'nav'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#151b26] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Reading NAV Charts</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('jargon')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'jargon'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#151b26] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Jargon Buster</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('types')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
            activeGuideTab === 'types'
              ? 'bg-[#00D09C] text-black shadow-sm'
              : 'bg-white dark:bg-[#151b26] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Fund Types</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeGuideTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Tap any masterclass to watch continuous AI animated video</span>
            <span className="flex items-center gap-1 text-[#00D09C] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>60 FPS Motion Graphics + Neural Voice</span>
            </span>
          </div>

          {/* Video Cards Grid - Full Width Covering the Screen */}
          <div className="grid grid-cols-1 gap-4 w-full">
            {GUIDE_VIDEOS.map((video) => {
              const isCompleted = completedVideoIds.includes(video.id);

              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                        {video.category}
                      </span>
                      {video.isAiGenerated && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/80 text-black backdrop-blur-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          AI Video
                        </span>
                      )}
                    </div>

                    {/* Duration / Complete Pill */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black flex items-center gap-1 shadow">
                          <CheckCircle className="w-3 h-3" />
                          Done
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-gray-200">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-[#00D09C] group-hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                        {video.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{video.takeaways.length} Key Takeaways</span>
                      <span className="text-emerald-500 font-semibold group-hover:underline">Watch Lesson →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeGuideTab === 'jargon-studio' && <AiJargonStudio />}
      {activeGuideTab === 'budget' && <BudgetCalculator />}
      {activeGuideTab === 'sections' && <SixSectionsGuide />}
      {activeGuideTab === 'nav' && <NavChartExplainer />}
      {activeGuideTab === 'jargon' && <JargonBuster />}
      {activeGuideTab === 'types' && <FundTypesCatalog />}

      {/* ========================================================
          PERSISTENT "WENT THROUGH THE AI GUIDE?" NUDGE CARD
          ======================================================== */}
      <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#E6FAF4] via-[#F4FDF9] to-[#DEF7EE] dark:bg-gradient-to-br dark:from-[#13241F] dark:via-[#162923] dark:to-[#0F1E19] border border-[#00D09C]/40 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C]">
                <Bot className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00875A] dark:text-[#00D09C]">
                AI Learning Companion
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug">
              Went through the AI guide and still have questions?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Ask AI Mitra! Get instant, zero-jargon answers to your specific doubts about personal finance budgeting, SIP dates, NAV charts, or tax rules.
            </p>
          </div>

          <button
            onClick={() => onOpenAiMitra?.()}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Mitra</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Modal Display */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onComplete={toggleVideoComplete}
          isCompleted={completedVideoIds.includes(selectedVideo.id)}
          onOpenAiMitra={onOpenAiMitra}
        />
      )}
    </div>
  );
};
