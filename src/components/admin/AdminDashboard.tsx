/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Church Administrator Dashboard - ACK St. Mary's Ngariama
 * Full administrative control for Weekly Announcements, Recent Sermons, and Harambee Fund Progress.
 * Designed with Google Sheets CSV synchronisation hooks and strict UK English conventions.
 */

import React, { useState, useEffect } from 'react';
import { ChurchCrest } from '../ChurchCrest';
import { 
  getAnnouncements, 
  saveAnnouncements, 
  getSermons, 
  saveSermons, 
  getHarambeeFundData, 
  saveHarambeeFundData, 
  resetToParishDefaults,
  fetchFromGoogleSheetCsv,
  HarambeeFundData
} from '../../services/churchDataService';
import { Announcement, Sermon } from '../../types/church';
import { 
  Bell, 
  BookOpen, 
  Coins, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  LogOut, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  Sparkles, 
  X, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  Search,
  RefreshCw,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewWebsite }) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'announcements' | 'sermons' | 'harambee' | 'sheets'>('announcements');

  // Core Data States
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [harambeeData, setHarambeeData] = useState<HarambeeFundData | null>(null);

  // Status and feedback
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals and Forms
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState<Announcement | null>(null);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [isEditingSermon, setIsEditingSermon] = useState<Sermon | null>(null);
  const [isAddingSermon, setIsAddingSermon] = useState(false);

  // Google Sheets CSV sync state
  const [sheetUrl, setSheetUrl] = useState('');
  const [sheetCategory, setSheetCategory] = useState<'announcements' | 'sermons' | 'harambee'>('announcements');
  const [isSyncing, setIsSyncing] = useState(false);

  // Initialise data from service
  const loadAllData = async () => {
    const [loadedAnnouncements, loadedSermons, loadedHarambee] = await Promise.all([
      getAnnouncements(),
      getSermons(),
      getHarambeeFundData()
    ]);
    setAnnouncements(loadedAnnouncements);
    setSermons(loadedSermons);
    setHarambeeData(loadedHarambee);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const triggerFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // --------------------------------------------------------------------------
  // ANNOUNCEMENTS ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const announcementObj: Announcement = {
      id: isEditingAnnouncement ? isEditingAnnouncement.id : `ann-${Date.now()}`,
      title: formData.get('title') as string,
      category: formData.get('category') as Announcement['category'],
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      venue: formData.get('venue') as string,
      summary: formData.get('summary') as string,
      details: formData.get('details') as string,
      highlight: formData.get('highlight') === 'on',
    };

    let updated: Announcement[];
    if (isEditingAnnouncement) {
      updated = announcements.map(a => a.id === isEditingAnnouncement.id ? announcementObj : a);
    } else {
      updated = [announcementObj, ...announcements];
    }

    setAnnouncements(updated);
    await saveAnnouncements(updated);
    setIsEditingAnnouncement(null);
    setIsAddingAnnouncement(false);
    triggerFeedback('Parish announcement saved successfully.');
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Are you sure you wish to delete this announcement? This action cannot be reversed.')) return;
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    await saveAnnouncements(updated);
    triggerFeedback('Announcement removed from public listing.');
  };

  // --------------------------------------------------------------------------
  // SERMONS ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveSermon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const keyPointsRaw = (formData.get('keyPoints') as string) || '';
    const parsedKeyPoints = keyPointsRaw.split('\n').map(p => p.trim()).filter(Boolean);

    const sermonObj: Sermon = {
      id: isEditingSermon ? isEditingSermon.id : `sermon-${Date.now()}`,
      title: formData.get('title') as string,
      preacher: formData.get('preacher') as string,
      role: formData.get('role') as string,
      date: formData.get('date') as string,
      duration: formData.get('duration') as string,
      passage: formData.get('passage') as string,
      audioUrl: (formData.get('audioUrl') as string) || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      category: formData.get('category') as Sermon['category'],
      summary: formData.get('summary') as string,
      keyPoints: parsedKeyPoints.length ? parsedKeyPoints : ['Remain faithful in prayer and fellowship.'],
    };

    let updated: Sermon[];
    if (isEditingSermon) {
      updated = sermons.map(s => s.id === isEditingSermon.id ? sermonObj : s);
    } else {
      updated = [sermonObj, ...sermons];
    }

    setSermons(updated);
    await saveSermons(updated);
    setIsEditingSermon(null);
    setIsAddingSermon(false);
    triggerFeedback('Sermon recording and study notes updated successfully.');
  };

  const handleDeleteSermon = async (id: string) => {
    if (!window.confirm('Are you sure you wish to remove this sermon from the public archive?')) return;
    const updated = sermons.filter(s => s.id !== id);
    setSermons(updated);
    await saveSermons(updated);
    triggerFeedback('Sermon entry successfully deleted.');
  };

  // --------------------------------------------------------------------------
  // HARAMBEE FUND ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveHarambee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!harambeeData) return;

    const formData = new FormData(e.currentTarget);
    const updatedHarambee: HarambeeFundData = {
      ...harambeeData,
      title: formData.get('title') as string,
      targetKES: Number(formData.get('targetKES')) || 3500000,
      raisedKES: Number(formData.get('raisedKES')) || 0,
      donorsCount: Number(formData.get('donorsCount')) || 0,
      lastUpdated: formData.get('lastUpdated') as string,
      paybillRef: formData.get('paybillRef') as string,
      bankAccountRef: formData.get('bankAccountRef') as string,
    };

    setHarambeeData(updatedHarambee);
    await saveHarambeeFundData(updatedHarambee);
    triggerFeedback('Harambee roofing fund metrics updated on public site.');
  };

  const handleAddContribution = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!harambeeData) return;

    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('amountKES')) || 0;
    const newContribution = {
      id: `cont-${Date.now()}`,
      contributorName: (formData.get('contributorName') as string) || 'Anonymous Contributor',
      amountKES: amount,
      date: (formData.get('date') as string) || new Date().toLocaleDateString('en-GB'),
      purpose: (formData.get('purpose') as string) || 'Building & Roofing Donation',
    };

    const updatedHarambee: HarambeeFundData = {
      ...harambeeData,
      raisedKES: harambeeData.raisedKES + amount,
      donorsCount: harambeeData.donorsCount + 1,
      recentContributions: [newContribution, ...(harambeeData.recentContributions || [])],
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setHarambeeData(updatedHarambee);
    await saveHarambeeFundData(updatedHarambee);
    (e.target as HTMLFormElement).reset();
    triggerFeedback(`Recorded donation of KES ${amount.toLocaleString()}. Total raised updated.`);
  };

  // --------------------------------------------------------------------------
  // GOOGLE SHEETS CSV SYNC
  // --------------------------------------------------------------------------
  const handleGoogleSheetSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrl) {
      triggerFeedback('Please supply a published Google Sheets CSV link.', 'error');
      return;
    }

    setIsSyncing(true);
    const result = await fetchFromGoogleSheetCsv(sheetUrl, sheetCategory);
    setIsSyncing(false);

    if (result.success) {
      await loadAllData();
      triggerFeedback(`Successfully synchronised ${result.count} records from Google Sheets.`);
    } else {
      triggerFeedback(result.error || 'Failed to synchronise with Google Sheets.', 'error');
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all announcements, sermons, and Harambee progress back to default church data? Custom edits will be cleared.')) {
      await resetToParishDefaults();
      await loadAllData();
      triggerFeedback('Parish records reset to canonical defaults.');
    }
  };

  // Calculations
  const harambeePercentage = harambeeData && harambeeData.targetKES > 0 
    ? Math.min(100, Math.round((harambeeData.raisedKES / harambeeData.targetKES) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col">
      {/* Top Administrative Bar */}
      <header className="bg-purple-950 text-white border-b-2 border-amber-500 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <ChurchCrest size="md" className="ring-2 ring-amber-400/40" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-lg text-white">
                  Parish Administration Centre
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-purple-950">
                  Staff Portal
                </span>
              </div>
              <p className="text-xs text-purple-200">
                ACK St. Mary's Ngariama · Diocese of Kirinyaga
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewWebsite}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5 transition"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Website</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-xs font-semibold text-rose-100 flex items-center gap-1.5 transition"
              title="Sign out of administrative session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Alert */}
        {feedbackMessage && (
          <div className={`py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2 transition ${
            feedbackMessage.type === 'success' ? 'bg-emerald-700 text-white' : 'bg-rose-800 text-white'
          }`}>
            {feedbackMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedbackMessage.text}</span>
          </div>
        )}
      </header>

      {/* Main Administrative Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        
        {/* Metric Overview Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Notices & Events</span>
              <Bell className="w-4 h-4 text-purple-900" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums">
              {announcements.length}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Active weekly notices published</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Sermon Archive</span>
              <BookOpen className="w-4 h-4 text-emerald-800" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums">
              {sermons.length}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Sermon audio files ready to stream</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Harambee Roofing</span>
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums">
              {harambeePercentage}%
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              KES {harambeeData ? (harambeeData.raisedKES / 1000000).toFixed(2) : 0}M of {harambeeData ? (harambeeData.targetKES / 1000000).toFixed(1) : 0}M goal
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Storage Adapter</span>
              <FileSpreadsheet className="w-4 h-4 text-indigo-700" />
            </div>
            <div className="text-sm font-bold text-stone-800">
              Local State + Sheets
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Instant updates with CSV hook ready</p>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="bg-white rounded-xl p-1.5 border border-stone-200 flex flex-wrap gap-1 shadow-xs">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'announcements'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Weekly Announcements ({announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sermons')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'sermons'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Recent Sermons ({sermons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('harambee')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'harambee'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Harambee Fund Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ml-auto ${
              activeTab === 'sheets'
                ? 'bg-purple-950 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Google Sheets CSV Sync</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: WEEKLY ANNOUNCEMENTS MANAGEMENT */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search announcements by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEditingAnnouncement(null);
                    setIsAddingAnnouncement(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>New Announcement</span>
                </button>
              </div>
            </div>

            {/* List of Announcements */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements
                .filter(a => 
                  a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  a.summary.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((ann) => (
                  <div
                    key={ann.id}
                    className={`bg-white rounded-xl p-5 border flex flex-col justify-between shadow-xs transition ${
                      ann.highlight ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded">
                          {ann.category}
                        </span>
                        <span className="font-mono text-stone-400 text-[11px]">{ann.date}</span>
                      </div>

                      <h3 className="font-serif font-bold text-stone-900 text-base mb-1.5">
                        {ann.title}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3 line-clamp-3">
                        {ann.summary}
                      </p>

                      {ann.venue && (
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{ann.venue} {ann.time && `· ${ann.time}`}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        ann.highlight ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {ann.highlight ? 'Featured Notice' : 'Standard'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsEditingAnnouncement(ann);
                            setIsAddingAnnouncement(true);
                          }}
                          className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-purple-900 transition"
                          title="Edit announcement"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          className="p-1.5 rounded hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                          title="Delete announcement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Announcement Form Modal */}
            {isAddingAnnouncement && (
              <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => {
                      setIsAddingAnnouncement(false);
                      setIsEditingAnnouncement(null);
                    }}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                    {isEditingAnnouncement ? 'Edit Parish Announcement' : 'Create Weekly Announcement'}
                  </h3>
                  <p className="text-xs text-stone-500 mb-6">
                    Updates will publish immediately to the live church website notices section.
                  </p>

                  <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Notice Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        defaultValue={isEditingAnnouncement?.title || ''}
                        placeholder="e.g. Annual Harvest Thanksgiving & Diocesan Rally"
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Category *
                        </label>
                        <select
                          name="category"
                          defaultValue={isEditingAnnouncement?.category || 'Service'}
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800 bg-white"
                        >
                          <option value="Service">Service</option>
                          <option value="Harambee">Harambee</option>
                          <option value="Youth">Youth</option>
                          <option value="Mothers Union">Mothers Union</option>
                          <option value="Diocese">Diocese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Date or Sunday *
                        </label>
                        <input
                          type="text"
                          name="date"
                          required
                          defaultValue={isEditingAnnouncement?.date || 'Sunday, 18 October 2026'}
                          className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Time (Optional)
                        </label>
                        <input
                          type="text"
                          name="time"
                          defaultValue={isEditingAnnouncement?.time || '9:00 AM'}
                          placeholder="e.g. 9:00 AM"
                          className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Venue (Optional)
                        </label>
                        <input
                          type="text"
                          name="venue"
                          defaultValue={isEditingAnnouncement?.venue || 'Main Sanctuary, Ngariama'}
                          placeholder="e.g. Parish Grounds"
                          className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Brief Summary (Displayed on Card) *
                      </label>
                      <textarea
                        name="summary"
                        required
                        rows={2}
                        defaultValue={isEditingAnnouncement?.summary || ''}
                        placeholder="Provide a concise 1-2 sentence overview for the cards..."
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Full Details (Displayed in Modal) *
                      </label>
                      <textarea
                        name="details"
                        required
                        rows={3}
                        defaultValue={isEditingAnnouncement?.details || ''}
                        placeholder="Full programme, instructions, or contribution details..."
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="highlight"
                        name="highlight"
                        defaultChecked={isEditingAnnouncement?.highlight || false}
                        className="w-4 h-4 text-purple-900 rounded focus:ring-purple-800"
                      />
                      <label htmlFor="highlight" className="text-xs text-stone-700 font-medium">
                        Highlight as Priority Announcement on Public Portal
                      </label>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs tracking-wide uppercase transition shadow-xs"
                      >
                        {isEditingAnnouncement ? 'Update Announcement' : 'Publish Announcement'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAnnouncement(false);
                          setIsEditingAnnouncement(null);
                        }}
                        className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: SERMONS MANAGEMENT */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'sermons' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Sunday Sermons & Audio Expositions
                </h3>
                <p className="text-xs text-stone-500">
                  Manage playable MP3 sermons and spiritual takeaways available to parishioners worldwide.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsEditingSermon(null);
                  setIsAddingSermon(true);
                }}
                className="px-4 py-2 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add New Sermon</span>
              </button>
            </div>

            {/* Sermon Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                      <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {sermon.category}
                      </span>
                      <span className="font-mono text-[11px]">{sermon.date}</span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
                      {sermon.title}
                    </h4>

                    <p className="text-xs text-stone-600 mb-2">
                      Preacher: <strong>{sermon.preacher}</strong> ({sermon.role})
                    </p>

                    <div className="inline-flex items-center gap-1 text-[11px] text-purple-900 bg-purple-50 px-2 py-0.5 rounded mb-3">
                      <BookOpen className="w-3 h-3 text-amber-600" />
                      <span>{sermon.passage}</span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                      {sermon.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-stone-400">{sermon.duration}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsEditingSermon(sermon);
                          setIsAddingSermon(true);
                        }}
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-purple-900 transition"
                        title="Edit sermon"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSermon(sermon.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                        title="Delete sermon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sermon Form Modal */}
            {isAddingSermon && (
              <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => {
                      setIsAddingSermon(false);
                      setIsEditingSermon(null);
                    }}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                    {isEditingSermon ? 'Edit Sermon Details' : 'Publish New Sermon Audio'}
                  </h3>
                  <p className="text-xs text-stone-500 mb-6">
                    Enter sermon recording link, preacher credentials, scripture references, and outline.
                  </p>

                  <form onSubmit={handleSaveSermon} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Sermon Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        defaultValue={isEditingSermon?.title || ''}
                        placeholder="e.g. Abiding in the Vine for Maximum Fruitfulness"
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Preacher *
                        </label>
                        <input
                          type="text"
                          name="preacher"
                          required
                          defaultValue={isEditingSermon?.preacher || 'Rev. Canon E. K. Murimi'}
                          className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          name="role"
                          defaultValue={isEditingSermon?.role || 'Parish Vicar & Shepherd'}
                          className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Service Type
                        </label>
                        <select
                          name="category"
                          defaultValue={isEditingSermon?.category || 'Sunday Service'}
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800 bg-white"
                        >
                          <option value="Sunday Service">Sunday Service</option>
                          <option value="Holy Communion">Holy Communion</option>
                          <option value="Midweek">Midweek</option>
                          <option value="Youth">Youth</option>
                          <option value="Special">Special</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Scripture *
                        </label>
                        <input
                          type="text"
                          name="passage"
                          required
                          defaultValue={isEditingSermon?.passage || 'John 15:1-8'}
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          defaultValue={isEditingSermon?.duration || '35 mins'}
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Date Delivered
                      </label>
                      <input
                        type="text"
                        name="date"
                        defaultValue={isEditingSermon?.date || 'Sunday, 27 September 2026'}
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Audio Streaming URL (MP3 / Hosted Link)
                      </label>
                      <input
                        type="url"
                        name="audioUrl"
                        defaultValue={isEditingSermon?.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
                        className="w-full px-3.5 py-2 text-sm font-mono border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Exposition Summary *
                      </label>
                      <textarea
                        name="summary"
                        required
                        rows={2}
                        defaultValue={isEditingSermon?.summary || ''}
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Key Takeaways (One per line)
                      </label>
                      <textarea
                        name="keyPoints"
                        rows={3}
                        defaultValue={isEditingSermon?.keyPoints?.join('\n') || ''}
                        placeholder="Point 1&#10;Point 2&#10;Point 3"
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800 font-sans"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs tracking-wide uppercase transition shadow-xs"
                      >
                        {isEditingSermon ? 'Save Sermon Changes' : 'Publish Sermon'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSermon(false);
                          setIsEditingSermon(null);
                        }}
                        className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: HARAMBEE FUND MANAGEMENT */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'harambee' && harambeeData && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Harambee Metrics Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">
                      Parish Development & Roofing Fund
                    </h3>
                    <p className="text-xs text-stone-500">
                      Update the live fundraising progress bar displayed across the public portal.
                    </p>
                  </div>
                  <span className="text-xs font-bold font-mono text-purple-950 bg-purple-50 px-3 py-1.5 rounded-lg">
                    {harambeePercentage}% Achieved
                  </span>
                </div>

                <form onSubmit={handleSaveHarambee} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={harambeeData.title}
                      className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Financial Target (KES) *
                      </label>
                      <input
                        type="number"
                        name="targetKES"
                        required
                        defaultValue={harambeeData.targetKES}
                        className="w-full px-3.5 py-2 text-sm font-mono font-bold border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Total Amount Raised (KES) *
                      </label>
                      <input
                        type="number"
                        name="raisedKES"
                        required
                        defaultValue={harambeeData.raisedKES}
                        className="w-full px-3.5 py-2 text-sm font-mono font-bold text-emerald-800 border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Confirmed Donors / Pledges
                      </label>
                      <input
                        type="number"
                        name="donorsCount"
                        defaultValue={harambeeData.donorsCount}
                        className="w-full px-3.5 py-2 text-sm font-mono border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Last Audit / Update Date
                      </label>
                      <input
                        type="text"
                        name="lastUpdated"
                        defaultValue={harambeeData.lastUpdated}
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        M-Pesa Reference Notice
                      </label>
                      <input
                        type="text"
                        name="paybillRef"
                        defaultValue={harambeeData.paybillRef}
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                        Bank Branch Account Reference
                      </label>
                      <input
                        type="text"
                        name="bankAccountRef"
                        defaultValue={harambeeData.bankAccountRef}
                        className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                      />
                    </div>
                  </div>

                  {/* Public Live Preview Bar */}
                  <div className="pt-2">
                    <span className="block text-xs font-semibold uppercase text-stone-500 mb-1.5">
                      Live Visitor Preview Bar:
                    </span>
                    <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden border border-stone-300">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all"
                        style={{ width: `${harambeePercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-stone-500 font-mono mt-1">
                      <span>KES {harambeeData.raisedKES.toLocaleString()} Raised</span>
                      <span className="font-bold text-purple-950">{harambeePercentage}%</span>
                      <span>Target KES {harambeeData.targetKES.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs tracking-wide uppercase transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save & Publish Harambee Metrics</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Record New Contribution Form & Recent Log */}
            <div className="space-y-6">
              {/* Add Contribution Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <h4 className="font-serif font-bold text-base text-stone-900 mb-1 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-700" />
                  <span>Log New Contribution</span>
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  Directly increments the public Harambee total and donor count.
                </p>

                <form onSubmit={handleAddContribution} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Donor / Fellowship Group *
                    </label>
                    <input
                      type="text"
                      name="contributorName"
                      required
                      placeholder="e.g. Mothers' Union Ngariama Branch"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Amount (KES) *
                    </label>
                    <input
                      type="number"
                      name="amountKES"
                      required
                      min={100}
                      placeholder="e.g. 50000"
                      className="w-full px-3 py-2 text-xs font-mono font-bold border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Purpose / Allocation
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      defaultValue="Sanctuary Roofing Fund"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Date of Receipt
                    </label>
                    <input
                      type="text"
                      name="date"
                      defaultValue={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition"
                  >
                    Record & Update Total
                  </button>
                </form>
              </div>

              {/* Recent Contributions List */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <h4 className="font-serif font-bold text-base text-stone-900 mb-3">
                  Recent Recorded Donations
                </h4>
                <div className="space-y-3">
                  {harambeeData.recentContributions?.map((c) => (
                    <div key={c.id} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                      <div className="flex justify-between items-start mb-1">
                        <strong className="text-stone-800 font-semibold">{c.contributorName}</strong>
                        <span className="font-mono font-bold text-emerald-800">
                          +KES {c.amountKES.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 flex justify-between">
                        <span>{c.purpose}</span>
                        <span>{c.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: GOOGLE SHEETS CSV EXTENSIBILITY */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'sheets' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Google Sheets CSV Synchronisation Centre
                </h3>
                <p className="text-xs text-stone-500">
                  Connect your live parish spreadsheet to automatically populate the website with weekly updates.
                </p>
              </div>
            </div>

            {/* Step-by-Step UK English Instructions */}
            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3 text-xs leading-relaxed text-stone-700">
              <h4 className="font-bold text-stone-900 text-sm">
                How to Connect a Google Sheet in 3 Simple Steps:
              </h4>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Open your parish Google Spreadsheet and select <strong>File</strong> &gt; <strong>Share</strong> &gt; <strong>Publish to web</strong>.
                </li>
                <li>
                  In the dialogue, choose your sheet tab and select <strong>Comma-separated values (.csv)</strong> format, then click <strong>Publish</strong>.
                </li>
                <li>
                  Paste the generated <code>https://docs.google.com/spreadsheets/.../pub?output=csv</code> URL into the input below and click <strong>Synchronise Data</strong>.
                </li>
              </ol>
            </div>

            {/* Sync Form */}
            <form onSubmit={handleGoogleSheetSync} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                    Select Data Category
                  </label>
                  <select
                    value={sheetCategory}
                    onChange={(e) => setSheetCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800 bg-white"
                  >
                    <option value="announcements">Weekly Announcements</option>
                    <option value="sermons">Recent Sermons Archive</option>
                    <option value="harambee">Harambee Fund Metrics</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                    Published Google Sheets CSV Web Address *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-800"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-6 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide uppercase transition flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronising with Sheet...' : 'Synchronise from Google Sheets'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-medium hover:bg-stone-50 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Canonical Church Defaults</span>
                </button>
              </div>
            </form>

            {/* Expected CSV Columns Reference */}
            <div className="pt-4 border-t border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                Expected Column Headers in your Google Sheet:
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-stone-200 rounded-lg overflow-hidden">
                  <thead className="bg-stone-100 text-stone-700">
                    <tr>
                      <th className="p-2.5 border-b">Category</th>
                      <th className="p-2.5 border-b">Required Columns Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-600">
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-purple-950">Announcements</td>
                      <td className="p-2.5">Title, Category, Date, Time, Venue, Summary, Details, Highlight</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-purple-950">Sermons</td>
                      <td className="p-2.5">Title, Preacher, Role, Date, Duration, Passage, AudioUrl, Category, Summary, KeyPoints</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-purple-950">Harambee</td>
                      <td className="p-2.5">Title, TargetKES, RaisedKES, DonorsCount, LastUpdated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Administration Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-4 px-6 border-t border-stone-800 text-center">
        <p>
          ACK St. Mary's Ngariama Church Administration Portal · Diocese of Kirinyaga · Authorised Personnel Only.
        </p>
      </footer>
    </div>
  );
};
