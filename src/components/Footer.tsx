import React from 'react';
import { ChurchCrest } from './ChurchCrest';
import { CHURCH_INFO } from '../data/churchData';
import { HeartHandshake, Phone, Mail, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenGiving: (category?: string) => void;
  onOpenPrayer: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGiving, onOpenPrayer, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Parish Identity & Official Diocesan Crest */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <ChurchCrest size="lg" className="ring-2 ring-amber-400/30 shadow-md" />
              <div>
                <h3 className="font-serif font-bold text-white text-base leading-tight">
                  ACK ST. MARY'S NGARIAMA
                </h3>
                <p className="text-xs text-amber-400 font-medium tracking-wide">
                  Diocese of Kirinyaga
                </p>
                <p className="text-[11px] text-stone-400 font-normal">
                  Anglican Church of Kenya
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Anglican Church of Kenya parish dedicated to worship, holistic discipleship, family nurturing, and community service in Gichugu Division, Kirinyaga County.
            </p>

            <div className="text-xs text-stone-400 pt-2 border-t border-stone-800">
              <p className="text-stone-300 font-semibold mb-1">Theme of the Year:</p>
              <p className="italic text-purple-200">"{CHURCH_INFO.themeYear}"</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Explore Our Parish
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'About Our Heritage', href: '#about' },
                { label: 'Sunday Service Times', href: '#services' },
                { label: 'Ministries & Departments', href: '#ministries' },
                { label: 'Sunday Sermons Audio', href: '#sermons' },
                { label: 'Parish Leadership', href: '#leadership' },
                { label: 'Roofing Project Harambee', href: '#news' },
                { label: 'Photo Gallery', href: '#gallery' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-500" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Schedule */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Weekly Liturgy
            </h4>
            <ul className="space-y-3 text-xs">
              <div>
                <strong className="text-white block">Sunday Main Service</strong>
                <span className="text-amber-400 font-mono">9:00 AM – 12:00 PM</span>
                <span className="text-stone-400 block text-[11px]">Holy Communion & The Word</span>
              </div>
              <div>
                <strong className="text-white block">Sunday School</strong>
                <span className="text-amber-400 font-mono">8:30 AM – 10:30 AM</span>
                <span className="text-stone-400 block text-[11px]">Children & Brigade</span>
              </div>
              <div>
                <strong className="text-white block">Midweek Fellowship</strong>
                <span className="text-amber-400 font-mono">Wednesdays 5:00 PM</span>
                <span className="text-stone-400 block text-[11px]">Bible Study & Intercession</span>
              </div>
            </ul>
          </div>

          {/* Col 4: Give & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Tithes & Inquiries
            </h4>

            {/* M-Pesa Quick Info Box */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 text-xs">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                Lipa Na M-Pesa
              </span>
              <div className="flex justify-between py-0.5">
                <span className="text-stone-400">Paybill:</span>
                <span className="font-mono font-bold text-white">{CHURCH_INFO.paybillNumber}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-stone-400">Account:</span>
                <span className="font-mono text-amber-300">TITHE-YourName</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenGiving()}
                className="w-full mt-2 py-1.5 rounded bg-purple-900 hover:bg-purple-800 text-white font-medium text-[11px] text-center transition"
              >
                Open Giving Portal
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${CHURCH_INFO.phone}`} className="hover:text-white font-mono">
                  {CHURCH_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${CHURCH_INFO.email}`} className="hover:text-white">
                  {CHURCH_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>P.O. Box 142 - 10302, Kianyaga</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} ACK St. Mary's Ngariama Church. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Diocese of Kirinyaga</span>
            <span>·</span>
            <button
              onClick={onOpenPrayer}
              className="hover:text-amber-400 transition"
            >
              Prayer Request
            </button>
            <span>·</span>
            {onOpenAdmin && (
              <>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 transition"
                  title="Parish staff and administrator login"
                >
                  Parish Administration
                </button>
                <span>·</span>
              </>
            )}
            <a href="#home" className="hover:text-white transition">
              Back to Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
