import React, { useState } from 'react';
import { CHURCH_INFO } from '../data/churchData';
import { Heart, Send, CheckCircle2, Shield, Phone, MessageSquare, Calendar } from 'lucide-react';

export const PrayerRequestSection: React.FC = () => {
  const [requestType, setRequestType] = useState('prayer');
  const [isConfidential, setIsConfidential] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !message) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setLocation('');
    setMessage('');
  };

  return (
    <section id="prayer" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Pastoral Care & Intercession
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            How Can We Pray for You Today?
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            "The prayer of a righteous person is powerful and effective." — James 5:16. Our clergy and prayer intercessors lift every burden before God.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
          {isSubmitted ? (
            <div className="text-center py-8 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Your Prayer Request Has Been Received
              </h3>
              <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed mb-6">
                Thank you, <strong>{fullName}</strong>. Your request has been shared with <strong>{CHURCH_INFO.vicar}</strong> and the parish pastoral intercession team. You are covered in our daily prayers.
              </p>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs italic text-stone-700 max-w-md mx-auto mb-6">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." — Philippians 4:6-7
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  Submit Another Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(`Praise God Vicar, I have submitted a prayer request for ${fullName}.`);
                    window.open(`https://wa.me/254${CHURCH_INFO.phone.substring(1)}?text=${text}`, '_blank');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify Vicar via WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  1. Nature of Request
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'prayer', label: 'Prayer Need' },
                    { id: 'thanksgiving', label: 'Thanksgiving' },
                    { id: 'visit', label: 'Pastoral Visit' },
                    { id: 'counseling', label: 'Counseling' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setRequestType(t.id)}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition text-center ${
                        requestType === t.id
                          ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Mwangi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0721650977"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white text-stone-900"
                  />
                </div>
              </div>

              {/* Village / Estate */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Location / Village (e.g. Ngariama, Kianyaga, Nairobi, or Overseas)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ngariama, Gichugu"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white text-stone-900"
                />
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Prayer Request / Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details of your situation, family need, illness, exam, or thanksgiving..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white text-stone-900"
                />
              </div>

              {/* Confidentiality Toggle */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/60">
                <input
                  type="checkbox"
                  id="confidentialCheck"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="w-4 h-4 text-purple-900 rounded focus:ring-purple-700"
                />
                <label htmlFor="confidentialCheck" className="text-xs text-stone-700 cursor-pointer select-none">
                  <span className="font-semibold text-purple-950 block">Keep strictly confidential</span>
                  <span>Only the Vicar (Rev. Canon E. K. Murimi) and assisting clergy will view this request.</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-semibold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Prayer Request to the Pastoral Team</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
