import React, { useState } from 'react';
import { Calendar, HeartHandshake, MapPin, Clock, ArrowRight, Shield } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface HeroProps {
  onOpenGiving: () => void;
  onOpenVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGiving, onOpenVisit }) => {
  const [imgError, setImgError] = useState(false);

  // Real church photo from user's draft
  const churchPhotoUrl = "https://z-cdn-media.chatglm.cn/files/ee47dfa2-d4b7-4007-9995-73ee949e1387.jpg?auth_key=1883882766-f3d96f7536104261849591129155b629-0-708dd0377892df4e0dcd3da84478a015";

  return (
    <section id="home" className="relative bg-purple-950 text-white overflow-hidden">
      {/* Background imagery with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <img
            src={churchPhotoUrl}
            alt="ACK St. Mary's Ngariama Church Building"
            className="w-full h-full object-cover object-center filter brightness-50"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-950 via-stone-900 to-indigo-950 opacity-90" />
        )}
        
        {/* Measured gradient scrim according to Section 1.F */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/80 to-purple-950/60" />
        
        {/* Subtle architectural Anglican cross watermark */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
          <svg width="480" height="480" viewBox="0 0 24 24" fill="white">
            <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        {/* Curatorial Sub-Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 border border-amber-400/30 text-amber-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Anglican Church of Kenya · Diocese of Kirinyaga · Gichugu</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-balance leading-tight">
          Karibu ACK St. Mary's Ngariama Church
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-purple-100/90 font-normal leading-relaxed mb-10 text-balance">
          A welcoming, Christ-centered Anglican community in Ngariama, Gichugu Division. Committed to prayer, transformative scriptural teaching, and touching lives with Christian love.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <a
            href="#services"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-purple-950 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Plan Your Sunday Visit</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenGiving}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center justify-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-amber-300" />
            <span>Give / Tithe (M-Pesa)</span>
          </button>
        </div>
      </div>

      {/* Scripture Theme of the Year Banner */}
      <div className="relative z-10 bg-purple-900/90 border-y border-amber-500/40 backdrop-blur-xs py-4 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif italic text-base sm:text-lg text-purple-100">
            "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit."
          </p>
          <p className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mt-1">
            — John 15:5 · Parish Theme of the Year
          </p>
        </div>
      </div>

      {/* Operational Utility Strip */}
      <div className="relative z-10 bg-stone-900/95 border-b border-stone-800 text-stone-300 text-xs py-3 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-stone-400 font-medium">Sunday Main Service</span>
            <span className="font-semibold text-white">9:00 AM – 12:00 PM</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-stone-400 font-medium">Sunday School</span>
            <span className="font-semibold text-white">8:30 AM (Parish Hall)</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-stone-400 font-medium">Midweek Fellowship</span>
            <span className="font-semibold text-white">Wednesdays 5:00 PM</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-stone-400 font-medium">Parish Location</span>
            <span className="font-semibold text-white">Ngariama, Gichugu</span>
          </div>
        </div>
      </div>
    </section>
  );
};
