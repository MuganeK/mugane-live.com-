import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BellRing, MapPin } from 'lucide-react';

export const NextServiceCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateNextSunday = () => {
      const now = new Date();
      // Target: Next Sunday at 9:00 AM (East Africa Time is UTC+3)
      const nextSunday = new Date(now);
      const currentDay = now.getDay(); // 0 is Sunday
      let daysUntilSunday = (7 - currentDay) % 7;

      // If today is Sunday and it's already past 12:00 PM, target next week Sunday
      if (currentDay === 0 && now.getHours() >= 12) {
        daysUntilSunday = 7;
      }

      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateNextSunday();
    const interval = setInterval(calculateNextSunday, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-purple-800/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BellRing className="w-4 h-4 animate-bounce" />
            <span>Join Us This Coming Lord's Day</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
            Sunday Main Liturgy & Worship
          </h3>
          <p className="text-purple-200 text-sm max-w-xl">
            Holy Communion & Service of the Word. Come worship with the family of faith in Ngariama.
          </p>
          <div className="flex items-center gap-4 text-xs text-purple-300 mt-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>9:00 AM – 12:00 PM</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Main Sanctuary, Ngariama</span>
            </span>
          </div>
        </div>

        {/* Tabular Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex flex-col items-center bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 min-w-[62px]">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-amber-400">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-200 mt-0.5">Days</span>
          </div>
          <span className="text-xl font-bold text-purple-400">:</span>
          <div className="flex flex-col items-center bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 min-w-[62px]">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-200 mt-0.5">Hours</span>
          </div>
          <span className="text-xl font-bold text-purple-400">:</span>
          <div className="flex flex-col items-center bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 min-w-[62px]">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-200 mt-0.5">Mins</span>
          </div>
          <span className="text-xl font-bold text-purple-400">:</span>
          <div className="flex flex-col items-center bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 min-w-[62px]">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-amber-300">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-200 mt-0.5">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
