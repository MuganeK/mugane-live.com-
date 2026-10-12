import React, { useState, useEffect } from 'react';
import { getSermons } from '../services/churchDataService';
import { SERMONS as DEFAULT_SERMONS } from '../data/churchData';
import { Sermon } from '../types/church';
import { Play, Pause, Volume2, BookOpen, Clock, Calendar, User, FileText, ChevronRight, X, Radio } from 'lucide-react';

export const SermonsPlayer: React.FC = () => {
  const [sermonsList, setSermonsList] = useState<Sermon[]>(DEFAULT_SERMONS);
  const [currentSermonIndex, setCurrentSermonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(25); // percentage
  const [activeNotesSermon, setActiveNotesSermon] = useState<Sermon | null>(null);

  const refreshSermons = async () => {
    const fetched = await getSermons();
    setSermonsList(fetched);
    if (currentSermonIndex >= fetched.length) {
      setCurrentSermonIndex(0);
    }
  };

  useEffect(() => {
    refreshSermons();
    window.addEventListener('church-data-updated', refreshSermons);
    return () => window.removeEventListener('church-data-updated', refreshSermons);
  }, []);

  const currentSermon = sermonsList[currentSermonIndex] || DEFAULT_SERMONS[0];

  const handleTogglePlay = (index?: number) => {
    if (typeof index === 'number' && index !== currentSermonIndex) {
      setCurrentSermonIndex(index);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const speeds = [1, 1.25, 1.5];
  const toggleSpeed = () => {
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <section id="sermons" className="py-20 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>The Ministry of the Word</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Recent Sunday Sermons
            </h2>
            <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full"></div>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md">
            Listen to biblical exposition and spiritual nourishment from the pulpit of ACK St. Mary's Ngariama wherever you are.
          </p>
        </div>

        {/* Featured Sermon Active Audio Player Card */}
        <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700 shadow-xl mb-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-700/80">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Now Playing: {currentSermon.category}</span>
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {currentSermon.date} · {currentSermon.duration}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Title & Preacher */}
            <div className="md:col-span-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {currentSermon.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <strong>{currentSermon.preacher}</strong> ({currentSermon.role})
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Passage: <strong>{currentSermon.passage}</strong></span>
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                {currentSermon.summary}
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col items-center md:items-end justify-center gap-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleSpeed}
                  className="px-2.5 py-1 text-xs rounded bg-stone-700 hover:bg-stone-600 text-stone-300 font-mono"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  type="button"
                  onClick={() => handleTogglePlay()}
                  className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-purple-950 flex items-center justify-center shadow-lg transition transform hover:scale-105"
                  aria-label={isPlaying ? 'Pause sermon' : 'Play sermon'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNotesSermon(currentSermon)}
                  className="px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-xs text-stone-200 flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Notes</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xs">
                <div 
                  className="h-1.5 bg-stone-700 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    setProgress(newProgress);
                  }}
                >
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                  <span>{isPlaying ? '09:24' : '00:00'}</span>
                  <span>{currentSermon.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sermon Catalog List */}
        <div className="grid md:grid-cols-3 gap-4">
          {sermonsList.map((s, idx) => {
            const isCurrent = currentSermonIndex === idx;
            return (
              <div
                key={s.id}
                className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-purple-950/70 border-amber-500/80 ring-1 ring-amber-500/50'
                    : 'bg-stone-800/50 border-stone-700 hover:bg-stone-800 text-stone-300'
                }`}
                onClick={() => handleTogglePlay(idx)}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wide">
                      {s.category}
                    </span>
                    <span className="font-mono text-[11px]">{s.date}</span>
                  </div>

                  <h4 className="font-serif font-bold text-white text-base mb-1.5 line-clamp-1">
                    {s.title}
                  </h4>

                  <p className="text-xs text-stone-400 mb-3">
                    Preacher: <span className="text-stone-300">{s.preacher}</span>
                  </p>

                  <div className="inline-flex items-center gap-1 text-[11px] text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded border border-purple-800/40">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>{s.passage}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-700 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">{s.duration}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-medium">
                    <span>{isCurrent && isPlaying ? 'Playing' : 'Listen'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sermon Notes Modal */}
        {activeNotesSermon && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-stone-900 text-stone-100 rounded-2xl max-w-xl w-full p-6 border border-stone-700 shadow-2xl relative animate-in fade-in duration-150">
              <button
                onClick={() => setActiveNotesSermon(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
                aria-label="Close notes"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Sermon Outline & Study Points
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeNotesSermon.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {activeNotesSermon.preacher} · {activeNotesSermon.date} · Scripture: {activeNotesSermon.passage}
                </p>
              </div>

              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 mb-4 text-xs leading-relaxed text-stone-300">
                <p className="font-semibold text-white mb-1">Message Summary:</p>
                <p>{activeNotesSermon.summary}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Key Takeaways for Daily Life:
                </p>
                <ul className="space-y-2 text-xs text-stone-300">
                  {activeNotesSermon.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                      <span className="text-amber-400 font-bold font-mono">0{i+1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setActiveNotesSermon(null)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-semibold text-xs rounded-lg transition"
              >
                Close Sermon Notes
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
