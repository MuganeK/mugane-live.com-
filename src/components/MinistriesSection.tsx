import React, { useState } from 'react';
import { MINISTRIES, CHURCH_INFO } from '../data/churchData';
import { Ministry } from '../types/church';
import { Shield, HeartHandshake, Flame, Sparkles, Music, Compass, Clock, User, ArrowRight, Check, X } from 'lucide-react';

export const MinistriesSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');

  const getMinistryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-6 h-6 text-purple-900" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-emerald-800" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-700" />;
      case 'Music': return <Music className="w-6 h-6 text-indigo-700" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-700" />;
      default: return <Shield className="w-6 h-6 text-purple-900" />;
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName || !memberPhone) return;
    setInterestSubmitted(true);
    setTimeout(() => {
      setInterestSubmitted(false);
      setSelectedMinistry(null);
      setMemberName('');
      setMemberPhone('');
    }, 2500);
  };

  return (
    <section id="ministries" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Discipleship & Fellowship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Parish Ministries & Departments
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every age group and calling has a place to grow in Christ, serve one another, and impact Ngariama through our six dedicated departments.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-purple-50 transition">
                    {getMinistryIcon(m.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md">
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-purple-950 transition">
                  {m.name} ({m.shortName})
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {m.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs text-stone-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Leader: <strong className="text-stone-700">{m.leader}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{m.meetingTime}</span>
                  </div>
                </div>

                {/* Key Activities */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Core Activities:
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {m.activities.slice(0, 3).map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">·</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setSelectedMinistry(m)}
                className="w-full mt-2 py-2 px-3 rounded-lg border border-purple-200 text-purple-900 hover:bg-purple-900 hover:text-white transition font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <span>Inquire / Join {m.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Ministry Inquire Dialog */}
        {selectedMinistry && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in duration-150">
              <button
                onClick={() => setSelectedMinistry(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-semibold uppercase text-purple-900 tracking-wider">
                  Parish Ministry Inquiry
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Connect with {selectedMinistry.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Leader: {selectedMinistry.leader} · Meets: {selectedMinistry.meetingTime}
                </p>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 mb-4 text-xs italic text-stone-700">
                "{selectedMinistry.scripture}"
              </div>

              {interestSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Thank You for Your Interest!</h4>
                  <p className="text-xs mt-1">
                    Your details have been recorded. The {selectedMinistry.shortName} leadership team will reach out to you this week.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mary Muthoni"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                      Phone Number (M-Pesa / WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0721XXXXXX"
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                    />
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs transition"
                    >
                      Submit Fellowship Interest
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const msg = encodeURIComponent(
                          `Praise God, I am interested in joining ${selectedMinistry.name} (${selectedMinistry.shortName}) at ACK St. Mary's Ngariama.`
                        );
                        window.open(`https://wa.me/254${CHURCH_INFO.phone.substring(1)}?text=${msg}`, '_blank');
                      }}
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition"
                    >
                      Chat on WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
