import React, { useState } from 'react';
import { ChurchCrest } from './ChurchCrest';
import { CHURCH_INFO } from '../data/churchData';
import { Menu, X, HeartHandshake, Phone, Calendar, Clock, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenGiving: (category?: string) => void;
  onOpenPrayer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGiving, onOpenPrayer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'News & Events', href: '#news' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Operational Utility Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Diocese of Kirinyaga, Gichugu</span>
            </span>
            <span className="text-stone-400 hidden md:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Next Service: Sunday 9:00 AM</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-stone-300">
            <a 
              href={`tel:${CHURCH_INFO.phone}`} 
              className="inline-flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{CHURCH_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenPrayer}
              className="text-stone-300 hover:text-amber-300 transition text-xs underline underline-offset-2"
            >
              Request Prayer
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - 3 Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element Brand wordmark with Official Diocese Crest */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group shrink-0" 
            aria-label="ACK St. Mary's Ngariama - Diocese of Kirinyaga Home"
          >
            <ChurchCrest size="md" className="ring-2 ring-purple-900/10 group-hover:ring-amber-500/40" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-purple-950 tracking-tight group-hover:text-purple-800 transition">
                ACK St. Mary's Ngariama
              </span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium -mt-0.5 flex items-center gap-1.5">
                <span>Diocese of Kirinyaga</span>
                <span className="inline-block w-1 h-1 rounded-full bg-amber-500"></span>
                <span className="hidden sm:inline text-purple-900 font-semibold">Gichugu</span>
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.slice(1, 7).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-purple-950 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenGiving()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-900 rounded-lg hover:bg-purple-800 transition-colors shadow-xs whitespace-nowrap"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              <span>Give / Tithe (M-Pesa)</span>
            </button>

            <a
              href="#services"
              className="hidden md:inline-flex items-center px-3.5 py-2 text-xs font-semibold text-purple-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Plan a Visit
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-purple-950"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}
            
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGiving();
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg bg-purple-900 text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Give / Tithe via M-Pesa</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrayer();
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg bg-stone-100 text-purple-950 font-medium text-sm"
              >
                Submit Prayer Request
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
