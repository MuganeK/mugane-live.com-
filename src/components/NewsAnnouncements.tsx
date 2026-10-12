import React, { useState, useEffect } from 'react';
import { getAnnouncements, getHarambeeFundData, HarambeeFundData } from '../services/churchDataService';
import { ANNOUNCEMENTS as DEFAULT_ANNOUNCEMENTS, CHURCH_INFO } from '../data/churchData';
import { Announcement } from '../types/church';
import { Calendar, Clock, MapPin, ArrowRight, HeartHandshake, Sparkles, X, Check } from 'lucide-react';

interface NewsAnnouncementsProps {
  onOpenGiving: (category?: string) => void;
}

export const NewsAnnouncements: React.FC<NewsAnnouncementsProps> = ({ onOpenGiving }) => {
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>(DEFAULT_ANNOUNCEMENTS);
  const [roofingProject, setRoofingProject] = useState<HarambeeFundData>({
    title: CHURCH_INFO.buildingProject.title,
    targetKES: CHURCH_INFO.buildingProject.targetKES,
    raisedKES: CHURCH_INFO.buildingProject.raisedKES,
    donorsCount: CHURCH_INFO.buildingProject.donorsCount,
    lastUpdated: 'October 2026',
  });
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeNotice, setActiveNotice] = useState<Announcement | null>(null);

  const refreshData = async () => {
    const [fetchedAnnouncements, fetchedHarambee] = await Promise.all([
      getAnnouncements(),
      getHarambeeFundData()
    ]);
    setAnnouncementsList(fetchedAnnouncements);
    setRoofingProject(fetchedHarambee);
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('church-data-updated', refreshData);
    return () => window.removeEventListener('church-data-updated', refreshData);
  }, []);

  const filters = ['All', 'Harambee', 'Youth', 'Mothers Union', 'Service'];

  const filteredAnnouncements = selectedFilter === 'All'
    ? announcementsList
    : announcementsList.filter(a => a.category === selectedFilter);

  const percentage = roofingProject.targetKES > 0 
    ? Math.min(100, Math.round((roofingProject.raisedKES / roofingProject.targetKES) * 100))
    : 0;

  return (
    <section id="news" className="py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Parish Life & Updates
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            News, Events & Announcements
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Stay informed on upcoming harambees, youth rallies, diocesan conferences, and weekly gatherings.
          </p>
        </div>

        {/* Live Harambee Roofing Project Progress Spotlight Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-800 mb-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Parish Development Project</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {roofingProject.title}
              </h3>
              <p className="text-purple-200 text-xs sm:text-sm leading-relaxed mb-4">
                We are currently raising funds for modern heavy-gauge roofing sheets, timber trusses, acoustic ceiling, and rain gutters for the expanded church building.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-black/40 rounded-full h-3 mb-2 overflow-hidden border border-white/10">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Progress Stats */}
              <div className="flex items-center justify-between text-xs text-stone-300 font-mono">
                <span>Raised: <strong className="text-amber-400">KES {roofingProject.raisedKES.toLocaleString()}</strong></span>
                <span className="text-white font-bold">{percentage}% Funded</span>
                <span>Target: <strong>KES {roofingProject.targetKES.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenGiving('roofing')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-purple-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-purple-950" />
                <span>Give to Roofing Fund (M-Pesa)</span>
              </button>
              <div className="text-center text-[11px] text-purple-300">
                Paybill: <strong className="text-white font-mono">247247</strong> · Acct: <strong className="text-white font-mono">ROOF-YourName</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                selectedFilter === f
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {f === 'All' ? 'All Notices' : f}
            </button>
          ))}
        </div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white rounded-xl p-6 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                ann.highlight ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded">
                    {ann.category}
                  </span>
                  <span className="text-stone-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{ann.date}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {ann.summary}
                </p>

                {ann.venue && (
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{ann.venue} {ann.time && `· ${ann.time}`}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveNotice(ann)}
                  className="text-xs font-semibold text-purple-900 hover:text-purple-700 inline-flex items-center gap-1"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {ann.category === 'Harambee' && (
                  <button
                    type="button"
                    onClick={() => onOpenGiving('roofing')}
                    className="text-xs font-semibold text-amber-700 hover:underline"
                  >
                    Give Now →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notice Detail Dialog */}
        {activeNotice && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in duration-150">
              <button
                onClick={() => setActiveNotice(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded">
                  {activeNotice.category}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {activeNotice.date}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                {activeNotice.title}
              </h3>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
                {activeNotice.details}
              </div>

              {activeNotice.venue && (
                <div className="text-xs text-stone-600 mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span><strong>Venue:</strong> {activeNotice.venue} {activeNotice.time && `· ${activeNotice.time}`}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const title = encodeURIComponent(activeNotice.title);
                    const details = encodeURIComponent(activeNotice.details);
                    const location = encodeURIComponent(activeNotice.venue || 'ACK St. Marys Ngariama');
                    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNotice(null)}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs hover:bg-stone-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
